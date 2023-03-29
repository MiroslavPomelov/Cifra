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

            bool _needExit = false;
            string _directory = "";
            string _fileName = "Data.txt";
            string _fullPath = "";
            List<string> _data = new List<string>();
            string[] _commandList = new string[]
            {
               "exit","remove","help","?","uppercase"
            };

            _data = ReadFile();

            while (_needExit == false)
            {
                PrintData();
                string line = Console.ReadLine();

                if (CheckCommands(line))
                {
                    ExecuteCommand(line);
                }
                else
                {
                    AppendData(line);
                    WriteDataToFile();
                }
            }

            Console.ReadLine();
            //EXIT PROGRAM

            void ExecuteCommand(string command)
            {
                //if (command == "exit")
                //{
                //    _needExit = true;
                //}

                //if (command == "remove")
                //{
                //    RemoveLine();
                //}
                //if (command == "help" || command == "?")
                //{
                //   ShowHelp();
                //}
                switch (command)
                {
                    case "exit":
                        _needExit = true;
                        break;
                    case "help":
                        ShowHelp();
                        break;
                    case "remove":
                        RemoveLine();
                        break;
                    case "uppercase":
                        UppercaseLine();
                        break;
                }
            }

            void UppercaseLine()
            {
                Console.Write("\nКакую строку uppercase? (номер от нуля): \n");
                int lineNumber = int.Parse(Console.ReadLine());
                try
                {
                    _data[lineNumber]=_data[lineNumber].ToUpper();
                }
                catch
                {
                    Console.WriteLine("Ошибка! Не удалось удалить строку");
                }
            }

            void ShowHelp()
            {
                Console.Clear();
                Console.WriteLine("Список команд:\n\"remove\" - удаление строки\n\"exit\" - выйти из программы");
            }

            void RemoveLine()
            {
                Console.Write("\nКакую строку удаляем? (номер от нуля): \n");
                int lineNumber = int.Parse(Console.ReadLine());
                try
                {
                    _data.RemoveAt(lineNumber);
                }
                catch
                {
                    Console.WriteLine("Ошибка! Не удалось удалить строку");
                }
            }

            bool CheckCommands(string line)
            {
                line = line.Trim().ToLower();
                return _commandList.Contains(line);
            }

            void AppendData(string data)
            {
                _data.Add(data);
            }

            List<string> ReadFile()
            {
                _directory = Directory.GetCurrentDirectory(); //Путь до exe-файла
                _directory = new DirectoryInfo(_directory).Parent.Parent.Parent.FullName; //Перейти по каталогу на 3 уровня вверх и получить полный путь
                _fullPath = Path.Combine(_directory, _fileName); //Комбинировать путь +папка или +файл
                return File.ReadAllLines(_fullPath).ToList(); //Чтение файла и запись в string переменную
            }

            void PrintData()
            {
                int i = 0;

                Console.WriteLine("DATA: ");
                foreach (string note in _data)
                {
                    Console.WriteLine($"{i++}. " + note);
                }
                Console.WriteLine("--------------------");
            }

            void WriteDataToFile()
            {
                File.WriteAllLines(_fullPath, _data); //Запись string-данных в файл по пути _fullPath
                Console.WriteLine("Файл сохранен");
            }
        }
    }
}