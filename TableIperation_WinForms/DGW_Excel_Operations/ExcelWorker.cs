using OfficeOpenXml;

namespace DGW_Excel_Operations
{
    public static class ExcelWorker
    {

        public static void OpenExcel()
        {
            ExcelPackage newBook = new ExcelPackage("SdudentData.xlsx");
            ExcelWorksheet currentSheet = newBook.Workbook.Worksheets["Студенты"];
            List<Student> students = new List<Student>();
            int row = 1;
            int columns = 7;
            for (int i = 0; i <= row; i++)
            {
                for (int j = 0; j < columns; j++)
                {
                    students = (List<Student>)currentSheet.Cells[row, columns].Value;
                }
                row++;
            }
        }
        public static void SaveExcel()
        {

        }
        public static void ChangeExcel()
        {

        }
    }
}
