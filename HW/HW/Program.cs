using System.Runtime.CompilerServices;

namespace HW
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string _directory = "";
            string _fileName = "Data.txt";
            string _fullPath = "";
            List<string> _data = new List<string>();

            _data = ReadFile();

            while (true)
            {
                PrintData();
                string line = Console.ReadLine();

                if (line == "exit")
                {
                    break;
                }

                if (line == "remove")
                {
                    Console.Write("\nКакую строку удаляем? (номер от нуля): \n");
                    int lineNumber = int.Parse(Console.ReadLine());
                    try
                    {
                        _data.RemoveAt(lineNumber);
                    }
                    catch
                    {
                        Console.WriteLine("Ошибка!\nПопробуйте еще раз:\n");
                    }
                    continue;
                }

                Console.Clear();

                if (line == "help" || line == "?")
                {
                    PrintData();
                    Console.WriteLine("Выберите команду:\n\"remove\" - удаление строки\n\"exit\" - выйти из программы");
                    line = Console.ReadLine();
                    if (line == "remove")
                    {
                        Console.WriteLine("\nКакую строку удаляем? (номер от нуля): \n");
                        PrintData();
                        int lineNumber = int.Parse(Console.ReadLine());
                        try
                        {
                            _data.RemoveAt(lineNumber);
                        }
                        catch
                        {
                            Console.WriteLine("Ошибка!\nПопробуйте еще раз:\n");
                        }
                        continue;
                    }
                    if (line == "exit")
                    {
                        break;
                    }
                    else
                    {
                        Console.WriteLine("Вы ввели неправильную команду");
                    }
                }
                if (line == "exit")
                {
                    break;
                }
                AppendData(line);
                WriteDataToFile();
            }

            Console.ReadLine();

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