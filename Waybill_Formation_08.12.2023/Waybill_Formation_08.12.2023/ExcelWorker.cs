using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Office.Interop.Word;
using OfficeOpenXml;
using OfficeOpenXml.Drawing.Slicer.Style;
using Word = Microsoft.Office.Interop.Word;

namespace Waybill_Formation_08._12._2023
{

    public static class ExcelWorker
    {
        public static ExcelPackage newBook = new ExcelPackage("Inventar.xlsx");
        public static ExcelWorksheet currentSheet = newBook.Workbook.Worksheets["Inventary1"];
        public static void NewTable(List<DeliveyNote> newList)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            ExcelWorksheet worksheetToDelete = newBook.Workbook.Worksheets["Inventary1"];
            if (worksheetToDelete != null)
            {
                newBook.Workbook.Worksheets.Delete(worksheetToDelete);
                currentSheet = newBook.Workbook.Worksheets.Add("Inventary1");
                newBook.Save();
            }
            else
            {
                currentSheet = newBook.Workbook.Worksheets.Add("Inventary1");
            }

            currentSheet.Columns.Width = 20;

            int row = 1;
            foreach (DeliveyNote item in newList)
            {
                currentSheet.Cells[row, 1].Value = item.Name;
                currentSheet.Cells[row, 2].Value = item.Quantity;
                currentSheet.Cells[row, 3].Value = item.Price;
                currentSheet.Cells[row, 4].Value = item.Name_provider;
                currentSheet.Cells[row, 5].Value = item.Name_buyer;
                currentSheet.Cells[row, 6].Value = item.Date.ToString();
                row++;
            }
            newBook.Save();
        }


        public static void GetData(string excelFilePath)
        {

            List<DeliveyNote> goods = new List<DeliveyNote>();

            FileInfo fi = new FileInfo(excelFilePath);
            using (ExcelPackage excelPackage = new ExcelPackage(fi))
            {
                ExcelWorksheet firstWorksheet = excelPackage.Workbook.Worksheets[0];
                ExcelWorksheet namedWorksheet = excelPackage.Workbook.Worksheets["Inventary1"];

                ExcelWorksheet anotherWorksheet = excelPackage.Workbook.Worksheets.FirstOrDefault(x => x.Name == "Inventary1")!;

                int rows = currentSheet.Dimension.Rows;
                int col = currentSheet.Dimension.Columns;

                for (int i = 1; i <= rows; i++)
                {
                    goods.Add(new DeliveyNote()
                    {
                        Name = currentSheet.Cells[$"A{i}"].Value?.ToString(),
                        Quantity = Convert.ToInt32(currentSheet.Cells[$"B{i}"].Value),
                        Price = Convert.ToInt32(currentSheet.Cells[$"C{i}"].Value),
                        Name_provider = currentSheet.Cells[$"D{i}"].Value?.ToString(),
                        Name_buyer = currentSheet.Cells[$"E{i}"].Value?.ToString(),
                        Date = DateTime.Parse(currentSheet.Cells[$"F{i}"].Value?.ToString()!)
                    });
                }
                excelPackage.Save();

                FormWaybill(goods);
            }
        }

        public static void FormWaybill(List<DeliveyNote> data)
        {

            Dictionary<string, List<DeliveyNote>> compliances = new Dictionary<string, List<DeliveyNote>>();

            List<DateTime> dates = new List<DateTime>();

            int CurrentIndex = 0;
            foreach (var item in data)
            {

                dates.Add(item.Date);

                AddValue<string, List<DeliveyNote>>(compliances!, item.Name_buyer!, item);
                CurrentIndex++;

                void AddValue<K, List>(Dictionary<K, List<DeliveyNote>> dict, K key, DeliveyNote val)
                {
                    List<DeliveyNote> list;
                    if (!dict.TryGetValue(key, out list!))
                        dict[key] = list = new List<DeliveyNote>();
                    list.Add(val);
                }
            }

            dates = dates.GroupBy(x => x).Select(x => x.First()).ToList();

            List<DeliveyNote> temp = new List<DeliveyNote>();

            foreach (var item in compliances)
            {
                CurrentIndex = 0;
                temp.Clear();
                for (int i = 0; i < item.Value.Count; i++)
                {
                    if (item.Value[i].Date.ToString() == dates[CurrentIndex].ToString())
                    {
                        temp.Add(item.Value[i]);
                    }
                    else
                    {
                        CurrentIndex++;
                        WriteWaybill(temp);
                        temp.Clear();
                        i--;
                    }
                    if (i == item.Value.Count - 1)
                    {
                        WriteWaybill(temp);
                        temp.Clear();
                    }
                }
            }
        }

        public static void WriteWaybill(List<DeliveyNote> temp)
        {
            Word.Application wordApp = new Word.Application();

            string fileName = $"Накладная от {temp[0].Date.Day}.{temp[0].Date.Month}.{temp[0].Date.Year}. Поставщик - {temp[0].Name_buyer}.docx";
            var wordDoc = wordApp.Documents.Add(Directory.GetCurrentDirectory() + "\\Товарная накладная.docx");


            void ReplaceStub(string stubToReplace, string text, Word.Document worldDocument)
            {
                var range = worldDocument.Content;
                range.Find.ClearFormatting();
                object wdReplaceAll = Word.WdReplace.wdReplaceAll;
                range.Find.Execute(FindText: stubToReplace, ReplaceWith: text, Replace: wdReplaceAll);
            }

            int currentIndex = 1;
            decimal sum = 0;
            try
            {
                foreach (var item in temp)
                {
                    decimal totalSum = 0;
                    foreach (var i in temp) totalSum += i.Price;


                    //Добавляем параграф в конец документа
                    var Paragraph = wordApp.ActiveDocument.Paragraphs.Add();
                    //Получаем диапазон
                    //var tableRange = Paragraph.Range;
                    ////Добавляем таблицу в указаный диапазон
                    //wordApp.ActiveDocument.Tables.Add(tableRange, temp.Count, 5);

                    var table = wordApp.ActiveDocument.Tables[wordApp.ActiveDocument.Tables.Count];
                    table.set_Style("Сетка таблицы");
                    table.ApplyStyleHeadingRows = true;
                    table.ApplyStyleLastRow = false;
                    table.ApplyStyleFirstColumn = true;
                    table.ApplyStyleLastColumn = false;
                    table.ApplyStyleRowBands = true;
                    table.ApplyStyleColumnBands = false;

                    table = wordDoc.Tables[1];
                    int count = temp.Count + 1;

                    for (int i = 0; i < temp.Count; i++)
                    {
                        sum = temp[i].Price * temp[i].Quantity;
                        table.Rows.Add();
                        table.Cell(i + 2, 1).Range.Text = i + 1.ToString();
                        table.Cell(i + 2, 2).Range.Text = temp[i].Name?.ToString();
                        table.Cell(i + 2, 3).Range.Text = temp[i].Quantity.ToString();
                        table.Cell(i + 2, 4).Range.Text = temp[i].Price.ToString();
                        table.Cell(i + 2, 5).Range.Text = sum.ToString();
                        totalSum += sum;
                    }

                    ReplaceStub("номер", currentIndex.ToString(), wordDoc);
                    ReplaceStub("дата", item.Date.ToString(), wordDoc);
                    ReplaceStub("ФИО поставщика", item.Name_provider!.ToString(), wordDoc);
                    ReplaceStub("ФИО покупателя", item.Name_buyer!.ToString(), wordDoc);
                    ReplaceStub("Сумма итого", totalSum.ToString(), wordDoc);
                    ReplaceStub("кол-во", temp.Count.ToString(), wordDoc);
                    ReplaceStub("сумма итого", totalSum.ToString(), wordDoc);
                    ReplaceStub("сумма итого", totalSum.ToString(), wordDoc);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }
            finally
            {
                wordDoc.SaveAs($"{Directory.GetCurrentDirectory()}\\{fileName}");
                wordApp.Quit();
                currentIndex++;
            }
        }
    }

}
