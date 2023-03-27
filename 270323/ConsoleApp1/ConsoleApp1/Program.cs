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

            _directory = Directory.GetCurrentDirectory();
            _directory = new DirectoryInfo(_directory).Parent.Parent.Parent.FullName;
            _fullPath=Path.Combine(_directory, _fileName);
            _data=File.ReadAllText(_fullPath);

            while (true)
            {
                string line = Console.ReadLine();
                if (line=="exit")
                {
                    break;
                }
                _data+=line;
            }
            File.WriteAllText(_fullPath, _data);

            Console.WriteLine("DATA: \n" + _data);
            Console.ReadLine();
        }
    }
}