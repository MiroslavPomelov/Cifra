using Microsoft.Office.Interop.Word;
using OfficeOpenXml;
using Word = Microsoft.Office.Interop.Word;

namespace Waybill_Formation_08._12._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Word.Application wordApp = new Word.Application();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            string excelFilePath = Directory.GetCurrentDirectory() + "\\Inventar.xlsx";
            ExcelWorker.NewTable(CSVWorker.CSVReader());
            ExcelWorker.GetData(excelFilePath);
        }
    }
}