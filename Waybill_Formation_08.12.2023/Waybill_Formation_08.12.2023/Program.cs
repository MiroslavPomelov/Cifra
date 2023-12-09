using OfficeOpenXml;

namespace Waybill_Formation_08._12._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string excelFilePath = Directory.GetCurrentDirectory() + "\\Inventar.xlsx";
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            //ExcelWorker.Delete();
            ExcelWorker.NewTable(CSVWorker.CSVReader());
            ExcelWorker.GetData(excelFilePath);
        }
    }
}