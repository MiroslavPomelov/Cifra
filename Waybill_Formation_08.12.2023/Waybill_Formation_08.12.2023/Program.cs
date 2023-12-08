using OfficeOpenXml;

namespace Waybill_Formation_08._12._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ExcelWorker.NewTable(CSVWorker.CSVReader());
        }
    }
}