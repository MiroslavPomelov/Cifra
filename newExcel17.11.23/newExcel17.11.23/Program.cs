using OfficeOpenXml;
namespace newExcel17._11._23
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ExcelPackage newBook = new ExcelPackage("Formulas.xlsx");
            ExcelWorksheet currentSheet = newBook.Workbook.Worksheets.Add(Console.ReadLine());

            ////Заполнение данных
            //currentSheet.Cells["A1"].Value = 30;
            //currentSheet.Cells["A2"].Value = 45;
            //currentSheet.Cells["A3"].Value = 70;

            ////Заполнение данных
            //currentSheet.Cells["B1"].Value = 10;
            //currentSheet.Cells["B2"].Value = 25;
            //currentSheet.Cells["B3"].Value = 30;

            ////Формула подсчета cуммы по ячейкaм
            //currentSheet.Cells["C1"].Formula = "SUM(A1:B1)";
            //currentSheet.Cells["C2"].Formula = "SUM(A2:B2)";
            //currentSheet.Cells["C3"].Formula = "SUM(A3:B3)";

            ////Формула подсчета среднего арифметичского по ячейкaм
            //currentSheet.Cells["A5"].Formula = "AVERAGE(A1:C3)";

            ////Формула подсчета cчетчика цифра по ячейкaм
            //currentSheet.Cells["B5"].Formula = "COUNT(A1:C3)";

            ////Формула подсчета максимального/минимального значения по ячейкaм
            //currentSheet.Cells["A4"].Formula = "MAX(A1:A3)";
            //currentSheet.Cells["B4"].Formula = "MAX(B1:B3)";

            //Поиск значения в таблице
            Random random = new Random();
            currentSheet.Columns.Width = 50;

            for (int i = 0; i < 10; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    currentSheet.Cells[i + 1, j + 1].Value = $"Значение {random.Next(50)}";
                }
            }

            currentSheet.Cells["F1"].Formula = "VLOOKUP(F2, A1:E5, 2, FALSE)"; // куда записываем, какой диапазон поиск, по какому столбцу ищем соответствие.

            newBook.Save();
        }
    }
}