using CsvHelper;
using System.Globalization;
using CsvHelper.Configuration;
using System;
using System.Linq;

namespace CSVPrakt
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Goods goods = new Goods();
            StreamReader reader = new StreamReader("inventoryControl.csv");

            CsvConfiguration csvConfiguration = new CsvConfiguration(CultureInfo.InvariantCulture);

            CsvReader csvReader = new CsvReader(reader, csvConfiguration);
            List<Goods> people = csvReader.GetRecords<Goods>().ToList();

            reader.Close();

            foreach (var item in people)
            {
                Console.WriteLine($"{item.Name}, {item.Quantity}, {item.Price}, {item.Description}");
            }

            Console.WriteLine("\nМаксимальное значение :" + people.Max(item => item.Price));
            Console.WriteLine("Минимальное значение :" + people.Min(item => item.Price));
            Console.WriteLine("Среднее значение :" + people.Average(item => item.Price));
        }
    }
}