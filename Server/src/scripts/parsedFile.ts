type ExcelQuestionRow = {
  category: string;
  topic: string;
  question: string;
  options: Record<string, string>;
  correctAnswer: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
};

export const parseExcelData = (
  rawData: (string | undefined)[][]
): ExcelQuestionRow[] => {
  const parsedData: ExcelQuestionRow[] = [];

  // Destructure the header and rows, even if header isn't used
  const [, ...rows] = rawData;

  for (const row of rows) {
    const [
      category,
      topic,
      question,
      optionsStr,
      correctAnswer,
      difficulty,
      solution,
    ] = row;

    // Check if any required field is missing
    if (
      !category ||
      !topic ||
      !question ||
      !optionsStr ||
      !correctAnswer ||
      !difficulty ||
      !solution
    ) {
      console.warn("Skipping row due to missing fields:", row);
      continue;
    }

    let options: Record<string, string>;
    try {
      options = JSON.parse(optionsStr);
      if (typeof options !== "object" || Array.isArray(options)) {
        throw new Error("Options is not a valid object");
      }
    } catch (error) {
      console.warn("Skipping row due to invalid JSON in options:", optionsStr);
      continue;
    }

    parsedData.push({
      category: category.trim(),
      topic: topic.trim(),
      question: question.trim(),
      options,
      correctAnswer: correctAnswer.trim(),
      difficulty: difficulty.trim().toUpperCase() as "EASY" | "MEDIUM" | "HARD",
      
    });
  }

  return parsedData;
};
