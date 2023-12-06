using Word = Microsoft.Office.Interop.Word;

namespace _06._10._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Random random = new Random();
            Word.Application wordApp = new Word.Application();
            Word.Document wordDoc = wordApp.Documents.Open(Directory.GetCurrentDirectory() + "\\MyPersonalWordDocumentWithTable.docx");
            try
            {
                Word.Table table = wordDoc.Tables[1];

                foreach (Word.Row row in table.Rows)
                {
                    foreach (Word.Cell cell in row.Cells)
                    {
                        cell.Range.Text = $"Знач: {random.Next(-10, 10)}";
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                wordDoc.Save();
                wordApp.Quit();
            }







            //    //Запсиь
            //    Word.Application wordApp = new Word.Application();
            //    Word.Document wordDoc = wordApp.Documents.Open(Directory.GetCurrentDirectory() + "\\MyPersonalWordDocumentWithTable.docx");
            //    try
            //    {
            //        AddNewTable(3, 4, "Вторая таблица");
            //        AddNewTable(6, 2, "Третья таблица");
            //    }
            //    catch (Exception ex)
            //    {
            //        Console.WriteLine(ex.Message);
            //    }
            //    finally
            //    {
            //        wordDoc.Save();
            //        wordApp.Quit();
            //    }





            //    //Word.Range range = wordDoc.Content;

            //    //Word.Table wordFirstTable = wordDoc.Tables.Add(range, NumRows: 3, NumColumns: 4);


            //    //wordFirstTable.Borders.OutsideLineStyle = Word.WdLineStyle.wdLineStyleDouble;
            //    //wordFirstTable.Borders.InsideLineStyle = Word.WdLineStyle.wdLineStyleSingle;

            //    //wordFirstTable.Borders.OutsideColor = Word.WdColor.wdColorBlack;
            //    //wordFirstTable.Borders.InsideColor = Word.WdColor.wdColorBlack;

            //    //wordFirstTable.Cell(1, 1).Range.Text = "Я ячейка А1";
            //    //wordFirstTable.Cell(2, 2).Range.Text = "Я ячейка B2";

            //    //wordDoc.SaveAs(Directory.GetCurrentDirectory() + "\\MyPersonalWordDocumentWithTable.docx");
            //    //wordDoc.Close();

            //    //wordApp.Quit();

            //    void AddNewTable(int rows, int columns, string tableName)
            //    {
            //        Word.Paragraph paragraph = wordDoc.Paragraphs.Add();
            //        paragraph.Range.Text = $"\n{tableName}\n";

            //        Word.Table newTable = wordDoc.Tables.Add(paragraph.Range, NumRows: rows, NumColumns: columns);

            //        // Настройки новой таблицы
            //        newTable.Borders.OutsideLineStyle = Word.WdLineStyle.wdLineStyleSingle;
            //        newTable.Borders.InsideLineStyle = Word.WdLineStyle.wdLineStyleSingle;

            //        newTable.Borders.OutsideColor = Word.WdColor.wdColorAqua;
            //        newTable.Borders.InsideColor = Word.WdColor.wdColorBlue;

            //        for (int i = 1; i <= rows; i++)
            //        {
            //            for (int j = 1; j <= columns; j++)
            //            {
            //                newTable.Cell(i, j).Range.Text = $"Яч: {i}:{j}";
            //            }
            //        }
            //    }
            //}

        }
    }
}