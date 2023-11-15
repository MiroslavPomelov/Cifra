using OfficeOpenXml;
namespace Excel15._11._23
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ExcelPackage newBook = new ExcelPackage("newTable.xlsx"); //Создание книги
            ExcelWorksheet newWorksheet = newBook.Workbook.Worksheets.Add("Мой лист"); // Добавление листа

            string[] arr = { "Ячейка 1", "Ячейка 2", "Ячейка 3", "Ячейка 4" };

            for (int i = 0; i < arr.Length; i++) // Добавление
            {
                newWorksheet.Cells[i + 1, 1].Value = arr[i]; // Строка, столбец
            }

            newWorksheet.Cells["B5"].Value = "Ячейка B5"; // Добавление
            newWorksheet.Cells["A4"].Value = "Ячейка A4";
            newWorksheet.Cells["C10"].Value = "Ячейка C10";
            newWorksheet.Cells["F1"].Value = "Ячейка F1";

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