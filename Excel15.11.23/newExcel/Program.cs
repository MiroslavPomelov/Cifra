using OfficeOpenXml;
namespace newExcel
{
    internal class Program
    {
        static void Main(string[] args)
        {

            ExcelPackage mathBook = new ExcelPackage("Mathematics.xlsx"); //Создание книги
            ExcelWorksheet currentSheet = mathBook.Workbook.Worksheets.Add("Таблица умножения");  // Добавление листа


            int[,] table = new int[10, 10];
            int value = 0;

            for (int row = 1; row < 10; row++)
            {
                for (int column = 1; column < 10; column++)
                {
                    currentSheet.Cells[row, column].Value = value * column;
                }
                //value = row;
            }
        }
    }
}