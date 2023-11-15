using OfficeOpenXml;
using System.Drawing;
using OfficeOpenXml.Style;
namespace Excel15._11._23
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            //ExcelPackage newBook = new ExcelPackage("newTable.xlsx"); //Создание книги
            //ExcelWorksheet currentSheet = newBook.Workbook.Worksheets["Стилизованный Лист"];  // Добавление листа

            //currentSheet.Columns.Width = 50; // Ширина колонки
            //currentSheet.Columns[1].Width = 50; // По индексу ширина

            //currentSheet.Rows[1].Height = 50; // Cтроки
            //currentSheet.Rows.Height = 50;

            //currentSheet.Cells["A1:C10"].AutoFitColumns(); // От вепхнего левого, крайний правый диапазон с автовыравниванием.

            //currentSheet.Cells["A1:C1"].Merge = true; // Объеденить ячейки в диапазоне.

            //currentSheet.Cells["A1"].Style.WrapText = true; // Перенос текста.



            //// Настройки текста в ячейках

            //currentSheet.Cells["A1"].Value = "Text"; // Запись текста в ячеку

            //currentSheet.Cells["A1:C10"].Style.Font.Size = 20; // Высота шрифта
            //currentSheet.Cells["A1:C10"].Style.Font.Bold = true; // Жирный шрифт
            //currentSheet.Cells["A1:C10"].Style.Font.Italic = true; // Курсив
            //currentSheet.Cells["A1:C10"].Style.Font.Color.SetColor(Color.Red); // Цвет шрифта



            //// Настройки заливки ячеек

            //currentSheet.Cells["A1:C10"].Style.Fill.PatternType = ExcelFillStyle.DarkGrid; // Заливка
            //currentSheet.Cells["A1:C10"].Style.Fill.BackgroundColor.SetColor(Color.Green);


            //// Настройки границ ячеек

            //currentSheet.Cells["A1:C10"].Style.Border.Top.Style = ExcelBorderStyle.Double;
            //currentSheet.Cells["A1:C10"].Style.Border.Top.Color.SetColor(Color.Red);


            // Prakt

            ExcelPackage newBook = new ExcelPackage("Calendar2023.xlsx"); //Создание книги
            ExcelWorksheet currentSheet = newBook.Workbook.Worksheets.Add("Календарь");  // Добавление листа


            string[] arr = { "Ячейка 1", "Ячейка 2", "Ячейка 3", "Ячейка 4" };
            int counter = 1;

            for (int i = 1; i <= 12; i++)
            {
                for (int j = 1; j <= 31; j++)
                {
                    currentSheet.Cells[j, i].Value = j; // Строка, столбец
                }                
            }

            //ExcelPackage newBook = new ExcelPackage("newTable.xlsx"); //Создание книги
            //ExcelWorksheet newWorksheet = newBook.Workbook.Worksheets["Мой лист"];  // Добавление листа

            //string findingValue = "Ячейка B5";

            //// Второй способ

            //for (int i = 1; i < newWorksheet.Rows.EndRow; i++)
            //{
            //    for (int j = 1; j < newWorksheet.Columns.EndColumn; j++)
            //    {
            //        if (newWorksheet.Cells[i, j].Text == findingValue)
            //        {
            //            Console.WriteLine($"Значение найдено на координатах {i}:{j}");
            //        }
            //    }
            //}

            ////Первый способ - Найти ячейку

            //int row = 0;
            //int column = 0;

            //foreach (ExcelRangeBase cell in newWorksheet.Cells)
            //{
            //    if (cell.Text == findingValue)
            //    {
            //        Console.WriteLine("Совпадение найдено!");

            //        row = cell.Start.Row;
            //        column = cell.Start.Column;
            //    }
            //}
            //Console.WriteLine($"Значение {findingValue} найдено в ячейке с координатами: {row}:{column}");






            //string[] arr = { "Ячейка 1", "Ячейка 2", "Ячейка 3", "Ячейка 4" };

            //for (int i = 0; i < arr.Length; i++) // Добавление
            //{
            //    newWorksheet.Cells[i + 1, 1].Value = arr[i]; // Строка, столбец
            //}






            //newWorksheet.Cells["B5"].Value = "Ячейка B5"; // Добавление
            //newWorksheet.Cells["A4"].Value = "Ячейка A4";
            //newWorksheet.Cells["C10"].Value = "Ячейка C10";
            //newWorksheet.Cells["F1"].Value = "Ячейка F1";

            //newWorksheet.Cells["B5"].Value = null; // Удаление ячейки

            newBook.Save();


            //ExcelWorksheet existingWorksheet = newBook.Workbook.Worksheets["Мой лист"]; // Обращение к существующему листу по имени.

            //if (existingWorksheet != null)
            //{
            //    newBook.Workbook.Worksheets.Delete(existingWorksheet); // Удаление листа с проверкой.
            //}

            //newBook.Workbook.Worksheets.Delete(newBook.Workbook.Worksheets["Мой лист"]); // Удаление листа если он не создан по его имени


        }
    }
}