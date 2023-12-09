using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OfficeOpenXml;
using OfficeOpenXml.Drawing.Slicer.Style;

namespace Waybill_Formation_08._12._2023
{
    public static class ExcelWorker
    {
        public static ExcelPackage newBook = new ExcelPackage("Inventar.xlsx");
        public static ExcelWorksheet currentSheet = newBook.Workbook.Worksheets["Inventary1"];
        public static void NewTable(List<DeliveyNote> newList)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            ExcelWorksheet worksheetToDelete = newBook.Workbook.Worksheets["Inventary1"];
            if (worksheetToDelete != null)
            {
                newBook.Workbook.Worksheets.Delete(worksheetToDelete);
                currentSheet = newBook.Workbook.Worksheets.Add("Inventary1");
                newBook.Save();
            }
            else
            {
                currentSheet = newBook.Workbook.Worksheets.Add("Inventary1");
            }

            currentSheet.Columns.Width = 20;

            int row = 1;
            foreach (DeliveyNote item in newList)
            {
                currentSheet.Cells[row, 1].Value = item.Name;
                currentSheet.Cells[row, 2].Value = item.Quantity;
                currentSheet.Cells[row, 3].Value = item.Price;
                currentSheet.Cells[row, 4].Value = item.Name_provider;
                currentSheet.Cells[row, 5].Value = item.Name_buyer;
                currentSheet.Cells[row, 6].Value = item.Date;
                row++;
            }
            newBook.Save();
        }


        public static void GetData(string excelFilePath)
        {
            //ExcelWorksheet existingWorksheet = newBook.Workbook.Worksheets["Inventary"];

            List<DeliveyNote> goods = new List<DeliveyNote>();
            //for (int i = 1; i <= 19; i++)
            //{
            //    DeliveyNote deliveyNote = new DeliveyNote();
            //    int rows = currentSheet.Dimension.Rows;
            //    int col = currentSheet.Dimension.Columns;
            //    goods.Add(currentSheet.Cells[i, 1, rows, col]);
            //}

            FileInfo fi = new FileInfo(excelFilePath);
            using (ExcelPackage excelPackage = new ExcelPackage(fi))
            {
                ExcelWorksheet firstWorksheet = excelPackage.Workbook.Worksheets[0];
                ExcelWorksheet namedWorksheet = excelPackage.Workbook.Worksheets["Inventary1"];

                ExcelWorksheet anotherWorksheet = excelPackage.Workbook.Worksheets.FirstOrDefault(x => x.Name == "Inventary1");

                int rows = currentSheet.Dimension.Rows;
                int col = currentSheet.Dimension.Columns;

                string valA1 = firstWorksheet.Cells["A1"].Value.ToString();
                string valB1 = firstWorksheet.Cells[1, 2].Value.ToString();

                for (int i = 1; i <= rows; i++)
                {
                    for (int j = 1; j <= col; j++)
                    {
                        string valB1s = firstWorksheet.Cells[i, j].Value.ToString();
                    }
                }

                excelPackage.Save();
            }
        }

    }

}
