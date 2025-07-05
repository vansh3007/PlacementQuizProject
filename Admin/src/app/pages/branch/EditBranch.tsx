"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBranchStore } from "@/store/useBranchStore";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";

const schema = z.object({
  key: z.string().min(1, { message: "Key is required" }),
  branchName: z.string().min(1, { message: "Branch name is required" }),
});

type FormValues = z.infer<typeof schema>;

interface Branch {
  id: string;
  key: string;
  branch: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  branch: Branch | null;
}

const EditBranch = ({ isOpen, onClose, branch }: Props) => {
    const { updateBranch } = useBranchStore((state) => state);
    const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      key: branch?.key || "",
      branchName: branch?.branch || "",
    },
  });

  useEffect(() => {
    if (branch) {
      form.reset({
        key: branch.key,
        branchName: branch.branch,
      });
    }
  }, [branch, form]);

  const onSubmit = async (values: FormValues) => {
      if (!branch) return;
      setLoading(true);
      const success = await updateBranch(branch.id, values);
      setLoading(false);
    if (success) {
    
      onClose();
    } 
  };

  if (!branch) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Branch</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter branch key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branchName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter branch name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
                          <Button type="submit">
                {loading ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBranch;
