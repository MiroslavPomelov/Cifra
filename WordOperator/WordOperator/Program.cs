using Word = Microsoft.Office.Interop.Word;

namespace WordOperator
{
    public class Program
    {
        static void Main(string[] args)
        {
            // Создание потока приложения Word
            Word.Application wordApp = new Word.Application();
            try
            {

                // Создание документа в потоке приложения
                Word.Document wordDoc = wordApp.Documents.Add();


                //// Добавить новый параграф в документ
                //Word.Paragraph firstPar = wordDoc.Paragraphs.Add();

                //firstPar.Range.Text = "Hello, world!\n";


                //Word.Paragraph secondPar = wordDoc.Paragraphs.Add();

                //secondPar.Range.Text = "Second Paragraph";
                



                // Открываем существующий документ в потоке приложения
                //Word.Document existingWordDocument = wordApp.Documents.Open("C:\\Users\\C4PC2\\Documents\\Попытка1.docx");
                Word.Document WordDocument = wordApp.Documents.Add();

                // Выравнивание
                Word.Range alldoc = wordDoc.Content;
                alldoc.ParagraphFormat.Alignment = Word.WdParagraphAlignment.wdAlignParagraphJustify;

                // Заголовок
                Word.Paragraph Header = wordDoc.Paragraphs.Add();
                Header.Range.Font.Name = "Arial";
                Header.Range.Font.Size = 20;
                Header.Range.Font.Bold = 1;
                Header.Range.Font.Color = Word.WdColor.wdColorOrange;

                Header.Range.Text = "Первый заголовок\n";

                // Параграф
                Word.Paragraph first = wordDoc.Paragraphs.Add();
                first.Range.Font.Name = "Arial";
                first.Range.Font.Size = 14;
                first.Range.Font.Bold = 0;
                first.Range.Font.Color = Word.WdColor.wdColorDarkGreen;

                first.Range.Text = "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.\r\n\r\nПо своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.";


                // Настройки текста
                //Word.Range mainRange = existingWordDocument.Content;

                //mainRange.Font.Name = "Arial";
                //mainRange.Font.Size = 14;
                //mainRange.Font.Bold = 1;
                //mainRange.Font.Color = Word.WdColor.wdColorDarkGreen;





                //// Обращаемся к диапазону документа
                //Word.Range range = existingWordDocument.Content;

                //range.Find.Execute("Second Paragraph", ReplaceWith: "Aboba");

                //wordDoc.SaveAs("Попытка1.docx");

                WordDocument.SaveAs($"{Directory.GetCurrentDirectory()}\\myColoredDoc.docx");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Возникла ошибка:"+ ex.Message);
            }
            finally
            {
                wordApp.Quit();
                
            }
        }
    }
}