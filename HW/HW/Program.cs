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
                    Console.Write("Какую строку удаляем? (номер от нуля): \n");
                    int lineNumber = int.Parse(Console.ReadLine());
                    _data.RemoveAt(lineNumber);
                    continue;
                }

                AppendData(line);
                Console.Clear();

                if (line == "help" || line == "?")
                {
                    Console.WriteLine("Выберите команду:\n\"remove\"-удаление строки\n\"exit\"-выйти из программы");
                   line = Console.ReadLine();
                    switch (line)
                    {
                        case "remove":
                            Console.WriteLine("Какую строку удаляем? (номер от нуля): \n");
                            PrintData();
                            int lineNumber = int.Parse(Console.ReadLine());
                            _data.RemoveAt(lineNumber);
                            continue;
                        case "exit":
                            break;
                    }
                }
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
                Console.WriteLine("DATA: ");
                Console.WriteLine(string.Join(Environment.NewLine, _data));
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