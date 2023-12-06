using Word = Microsoft.Office.Interop.Word;

namespace Prakt
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Random random = new Random();
            Word.Application wordApp = new Word.Application();

            try
            {
                AddNewDocTable(3, 3, "Fisrt Table");
                OpenNewDoc("MyNewTable.docx");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            finally
            {
                wordApp.Quit();
            }












            void OpenNewDoc(string fileName)
            {
                Word.Document wordDoc = wordApp.Documents.Open(Directory.GetCurrentDirectory() + $"\\{fileName}");
                try
                {
                    Word.Table table = wordDoc.Tables[1];

                    foreach (Word.Row row in table.Rows)
                    {
                        foreach (Word.Cell cell in row.Cells)
                        {
                            cell.Range.Text = $"New data: {random.Next(-10, 10)}";
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
            }


            void AddNewDocTable(int rows, int columns, string tableName)
            {
                Word.Document wordDoc = wordApp.Documents.Add();

                Word.Range mainRange = wordDoc.Content;

                Word.Table newTable = wordDoc.Tables.Add(mainRange, NumRows: rows, NumColumns: columns);

                newTable.Borders.OutsideLineStyle = Word.WdLineStyle.wdLineStyleSingle;
                newTable.Borders.InsideLineStyle = Word.WdLineStyle.wdLineStyleSingle;

                newTable.Borders.OutsideColor = Word.WdColor.wdColorAqua;
                newTable.Borders.InsideColor = Word.WdColor.wdColorBlue;

                foreach (Word.Row row in newTable.Rows)
                {
                    foreach (Word.Cell cell in row.Cells)
                    {
                        cell.Range.Text = $"{random.Next(-25, 25)}";
                    }
                }

                wordDoc.SaveAs(Directory.GetCurrentDirectory() + "\\MyNewTable.docx");
            }
        }
    }
}