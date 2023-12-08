using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OfficeOpenXml;

namespace Waybill_Formation_08._12._2023
{
    public static class ExcelWorker
    {
        public static ExcelPackage newBook = new ExcelPackage("Inventar.xlsx");
        public static ExcelWorksheet currentSheet = newBook.Workbook.Worksheets.Add("Inventary");

        public static void NewTable(List<DeliveyNote> newList)
        {

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
            ExcelWorksheet existingWorksheet = newBook.Workbook.Worksheets["Inventary"];

            List<DeliveyNote> goods = new List<DeliveyNote>();
            for (int i = 1; i <= 19; i++)
            {
                DeliveyNote deliveyNote = new DeliveyNote();
                goods.Add(currentSheet.Cells[deliveyNote.Name]);
            }
        }
    }

}
