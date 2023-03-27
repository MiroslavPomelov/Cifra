using System.Linq;

namespace ConsoleApp2
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

                if (line== "remove")
                {
                    Console.WriteLine("Какую строку удалить? (номер от нуля)");
                    int lineNumber = int.Parse(Console.ReadLine());
                    _data.RemoveAt(lineNumber);
                    continue;
                }
                AppendData(line);
                Console.Clear();
            }

            WriteDataToFile();
            Console.ReadLine();

            void AppendData(string data)
            {
                _data.Add(data);
            }

            List<string> ReadFile()
            {
                _directory = Directory.GetCurrentDirectory();
                _directory = new DirectoryInfo(_directory).Parent.Parent.Parent.FullName;
                _fullPath = Path.Combine(_directory, _fileName);
                return File.ReadAllLines(_fullPath).ToList();
            }

            void PrintData()
            {
                Console.WriteLine("DATA: \n");
                    Console.WriteLine(string.Join(Environment.NewLine, _data)); 
                Console.WriteLine("===================");
            }

            void WriteDataToFile()
            {
                File.WriteAllLines(_fullPath, _data);
                Console.WriteLine("Файл сохранен");
            }
        }
    }
}