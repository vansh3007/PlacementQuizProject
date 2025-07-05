import { useEffect, useState, useRef } from "react";
import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM, $generateHtmlFromNodes } from "@lexical/html";
import {
  $getRoot,
  $insertNodes,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  $createParagraphNode,
  $createRangeSelection,
  $setSelection,
  ElementNode,
  type LexicalNode,
} from "lexical";

import { HeadingNode, QuoteNode, $createHeadingNode } from "@lexical/rich-text";
import {
  ListNode,
  ListItemNode,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [currentHeading, setCurrentHeading] = useState<
    "normal" | "h1" | "h2" | "h3"
  >("normal");
  const [listType, setListType] = useState<string | null>(null);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsUnderline(selection.hasFormat("underline"));

          const anchorNode = selection.anchor.getNode();
          const parent = anchorNode.getTopLevelElementOrThrow();

          if (parent instanceof HeadingNode) {
            const tag = parent.getTag();
            if (tag === "h1" || tag === "h2" || tag === "h3") {
              setCurrentHeading(tag);
            } else {
              setCurrentHeading("normal");
            }
          } else {
            setCurrentHeading("normal");
          }

          if (parent instanceof ListNode) {
            const type = parent.getListType();
            setListType(["bullet", "number"].includes(type) ? type : null);
          } else {
            setListType(null);
          }
        }
      });
    });
  }, [editor]);

  const applyHeading = (level: "normal" | "h1" | "h2" | "h3") => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const nodes = selection.getNodes();
      const seen = new Set();
      const newNodes: LexicalNode[] = [];

      for (const node of nodes) {
        const parent = node.getTopLevelElementOrThrow();
        const key = parent.getKey();
        if (seen.has(key)) continue;
        seen.add(key);

        const newNode =
          level === "normal"
            ? $createParagraphNode()
            : $createHeadingNode(level);

        if (parent instanceof ElementNode) {
          parent.getChildren().forEach((child) => newNode.append(child));
        }

        const replaced = parent.replace(newNode);
        newNodes.push(replaced);
      }

      if (newNodes.length > 0) {
        const first = newNodes[0];
        const last = newNodes[newNodes.length - 1];
        const sel = $createRangeSelection();
        sel.anchor.set(first.getKey(), 0, "element");
        sel.focus.set(
          last.getKey(),
          last instanceof ElementNode ? last.getChildrenSize() : 0,
          "element"
        );
        $setSelection(sel);
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-2 border rounded-lg p-2 bg-background shadow-sm mb-4">
      <Button
        type="button"
        variant={isBold ? "default" : "outline"}
        size="icon"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant={isItalic ? "default" : "outline"}
        size="icon"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant={isUnderline ? "default" : "outline"}
        size="icon"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        <Underline className="w-4 h-4" />
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <Select
        value={currentHeading}
        onValueChange={(value) =>
          applyHeading(value as "normal" | "h1" | "h2" | "h3")
        }
      >
        <SelectTrigger className="w-[120px] h-8">
          <SelectValue placeholder="Heading" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="h1">Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="h3">Heading 3</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-6" />

      <Button
        type="button"
        variant={listType === "bullet" ? "default" : "outline"}
        size="icon"
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant={listType === "number" ? "default" : "outline"}
        size="icon"
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const hasInitialized = useRef(false);

  const initialConfig: InitialConfigType = {
    namespace: "MyEditor",
    theme: {
      paragraph: "text-sm my-2",
      heading: {
        h1: "text-xl font-bold my-4",
        h2: "text-lg font-bold my-3",
        h3: "text-base font-bold my-2",
      },
      list: {
        listitem: "list-disc ml-6",
      },
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
    },
    onError(error: Error) {
      console.error("Lexical error:", error);
    },
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContent
        value={value}
        onChange={onChange}
        hasInitialized={hasInitialized}
      />
    </LexicalComposer>
  );
}

function EditorContent({
  value,
  onChange,
  hasInitialized,
}: {
  value: string;
  onChange: (value: string) => void;
  hasInitialized: React.MutableRefObject<boolean>;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!value || hasInitialized.current) return;
    const parser = new DOMParser();
    const dom = parser.parseFromString(value, "text/html");

    editor.update(() => {
      const nodes = $generateNodesFromDOM(editor, dom);
      $getRoot().clear();
      $insertNodes(nodes);
    });

    hasInitialized.current = true;
  }, [value, editor, hasInitialized]);

  return (
    <div className="space-y-4">
      <Toolbar />
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="h-[200px] p-4 border rounded-lg focus:outline-none bg-background shadow-sm text-sm break-words overflow-x-hidden overflow-y-auto hide-scrollbar" />
        }
        placeholder={
          <div className="text-gray-400 px-4 py-2 text-sm">Enter text...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ListPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <OnChangePlugin
        onChange={(editorState, editor) => {
          if (!hasInitialized.current) {
            hasInitialized.current = true;
            return;
          }
          editorState.read(() => {
            const html = $generateHtmlFromNodes(editor, null);
            onChange(html);
          });
        }}
      />
    </div>
  );
}
