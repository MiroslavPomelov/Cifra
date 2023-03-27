using System.Globalization;
using System.IO.Enumeration;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {

            //try
            //{
            //    string line = Console.ReadLine();
            //    int value = int.Parse(line);
            //}
            //catch (Exception exc)
            //{
            //    Console.WriteLine("Ошибка: " +exc.Message);
            //}

            //Console.ReadLine();
            //string s = "Test variable";
            //string s2 = "test2";
            //Extention.PrintVar(s);
            //Extention.PrintVar(s2);

            //try
            //{
            //    int sum = Extention.Sum(5, 10);
            //}
            //catch (Exception exc)
            //{
            //    Console.WriteLine("Ошибка: " + exc.Message);
            //}

            //Console.ReadLine();

            string _directory = "";
            string _fileName = "Data.txt";
            string _fullPath = "";
            string _data = "";

            _data = ReadFile();

            while (true)
            {
                PrintData();
                string line = Console.ReadLine();
                if (line == "exit")
                {
                    break;
                }
                AppendData(line);
                Console.Clear();
            }

            WriteDataToFile();
            Console.ReadLine();

            void AppendData(string data)
            {
                _data += "\n" + data;
            }

            string ReadFile()
            {
                _directory = Directory.GetCurrentDirectory();
                _directory = new DirectoryInfo(_directory).Parent.Parent.Parent.FullName;
                _fullPath = Path.Combine(_directory, _fileName);
                return File.ReadAllText(_fullPath);
            }

            void PrintData()
            {
                Console.WriteLine("DATA: \n" + _data);
                Console.WriteLine("===================");
            }

            void WriteDataToFile()
            {
                File.WriteAllText(_fullPath, _data);
                Console.WriteLine("Файл сохранен");
            }
        }
    }
}