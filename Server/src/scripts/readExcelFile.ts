import { Workbook } from "exceljs";

/**
 * Reads an Excel file from a buffer and returns a 2D array of its content.
 * @param buffer The Excel (.xlsx) file buffer.
 * @returns A 2D array containing cell values, or null if the worksheet isn't found.
 */
export const readExcelFile = async (
  buffer: Buffer
): Promise<string[][] | null> => {
  const workbook = new Workbook();
  await workbook.xlsx.load(buffer);

  const worksheet = workbook.getWorksheet(1); // First sheet

  if (!worksheet) {
    return null;
  }

  const data: string[][] = [];

  worksheet.eachRow({ includeEmpty: false }, (row, _rowNumber) => {
    const rowData: string[] = [];
    row.eachCell({ includeEmpty: true }, (cell, _colNumber) => {
      const cellValue = cell.value;
      rowData.push(cellValue?.toString() ?? "");
    });
    data.push(rowData);
  });

  return data;
};
