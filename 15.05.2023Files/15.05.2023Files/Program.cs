using System.IO;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace _15._05._2023Files
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Чтение файла синхронное: 

            // 1 
            //void ReadFile()
            //{

            //    using (FileStream fs = new FileStream("File.txt", FileMode.Open))
            //    {
            //        byte[] buffer = new byte[1024];
            //        UTF8Encoding text = new UTF8Encoding(true);
            //        while (fs.Read(buffer, 0, buffer.Length) > 0)
            //        {
            //            Console.WriteLine(text.GetString(buffer));
            //        }
            //    }
            //}

            // 2

            //FileStream stream = null;

            //try
            //{
            //    stream = new FileStream("File.txt", FileMode.Open);
            //    byte[] buffer = new byte[1024];
            //    UTF8Encoding text = new UTF8Encoding(true);
            //    while (stream.Read(buffer, 0, buffer.Length) > 0)
            //    {
            //        Console.WriteLine(text.GetString(buffer));
            //    }
            //}
            //catch (IOException e)
            //{

            //    Console.WriteLine(e.Message);
            //}
            //finally
            //{
            //    stream.Close();
            //}

            // Запись в файл синхронно: 

            //Console.Write("Введите текст: ");
            //string text = Console.ReadLine();
            //using (FileStream fstream = new FileStream("File.txt", FileMode.Append,FileAccess.Write))
            //{
            //    byte[] buffer = Encoding.Default.GetBytes(text);
            //    fstream.Write(buffer, 0, buffer.Length);
            //}

            //// Асинхронно

            //async static void MyMethod()
            //{

            //    Console.Write("Введите текст: ");
            //    string text = Console.ReadLine();
            //    using (FileStream fstream = new FileStream("File.txt", FileMode.OpenOrCreate))
            //    {
            //        byte[] buffer = Encoding.Default.GetBytes(text);
            //        await fstream.WriteAsync(buffer, 0, buffer.Length);
            //    }
            //}


            //// Чтение

            //async static void MyMethod2()
            //{
            //    using (FileStream fstream = new FileStream("File.txt", FileMode.Open))
            //    {
            //        byte[] buffer = new byte[fstream.Length]; // - размер файла
            //        await fstream.ReadAsync(buffer, 0, buffer.Length);
            //        string readText = Encoding.Default.GetString(buffer);
            //        Console.WriteLine(readText);
            //    }
            //}

            //MyMethod();
            //MyMethod2();


            //// 15.2 Написать 5 строчек введных пользователем

            //async static void MyMethod()
            //{

            //    Console.Write("Введите текст: ");
            //    string text = Console.ReadLine();

            //    using (FileStream f = new FileStream("File.txt", FileMode.OpenOrCreate))
            //    {
            //        for (int i = 0; i < 5; i++)
            //        {
            //            byte[] buffer = Encoding.Default.GetBytes(text +'\n');
            //        await f.WriteAsync(buffer, 0, buffer.Length);
            //        }
            //    }
            //}

            //async static void MyMethod2()
            //{
            //    using (FileStream fstream = new FileStream("File.txt", FileMode.Open))
            //    {
            //        byte[] buffer = new byte[fstream.Length]; // - размер файла
            //        await fstream.ReadAsync(buffer, 0, buffer.Length);
            //        string readText = Encoding.Default.GetString(buffer);
            //        Console.WriteLine(readText);
            //    }
            //}

            //MyMethod();
            //MyMethod2();


            //// 15.4


            //async static void MyMethod()
            //{
            //    string[] mas = new string[] { "A", "B", "C", "D", "E" };
            //    using (FileStream f = new FileStream("File.txt", FileMode.OpenOrCreate))
            //    {
            //        for (int i = 0; i < mas.Length; i++)
            //        {
            //            byte[] buffer = Encoding.Default.GetBytes(mas[i] + '\n');
            //            await f.WriteAsync(buffer, 0, buffer.Length);
            //        }
            //    }
            //}

            //async static void MyMethod2()
            //{
            //    using (FileStream fstream = new FileStream("File.txt", FileMode.Open))
            //    {
            //        byte[] buffer = new byte[fstream.Length]; // - размер файла
            //        await fstream.ReadAsync(buffer, 0, buffer.Length);
            //        string readText = Encoding.Default.GetString(buffer);
            //        Console.WriteLine(readText);
            //    }
            //}

            //MyMethod();
            //MyMethod2();

            // 15.5

            //async static void NewMethod()
            //{
            //    using (FileStream f = new FileStream("File.txt", FileMode.Append))
            //    {
            //        byte[] buffer = Encoding.Default.GetBytes("До свидания, люди!");
            //        await f.WriteAsync(buffer, 0, buffer.Length);
            //    }
            //}

            //NewMethod();


            // 15.8

            async static void NewMethod()
            {
                using (FileStream f = new FileStream("File.txt", FileMode.Open, FileAccess.Read))
                {
                    byte[] buffer = new byte[f.Length];
                    await f.ReadAsync(buffer, 0, buffer.Length);
                    string text = Encoding.Default.GetString(buffer);
                    Console.WriteLine(text);
                    int count = 0;
                    for (int i = 0; i < text.Length; i++)
                    {
                        if (text[i] == '\n')
                        {
                            count++;
                        }
                    }
                    Console.WriteLine(count+1);
                }
            }
            NewMethod();
        }
    }
}