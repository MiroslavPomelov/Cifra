using CsvHelper.Configuration;
using CsvHelper;
using System.Globalization;
using System;

namespace _2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //IOrderedEnumerable<> sorted = .OrderBy(IThreadPoolWorkItem => item).ThenBy()

            using StreamReader reader = new StreamReader("Movies.csv");

            CsvConfiguration csvConfiguration = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = "," 
            };
            CsvReader csvReader = new CsvReader(reader, csvConfiguration);

            List<Movies> movies = csvReader.GetRecords<Movies>().ToList();  

            reader.Close();

            //IOrderedEnumerable<Movies> sorted = movies.OrderBy(item => item).ThenBy(item => item.Name).
            IEnumerable<Movies> extensionMethodResult = movies.Where(mov => mov.Name.StartsWith("The")).OrderBy(item => item.Genre);

            foreach (var item in extensionMethodResult)  
            {
                Console.WriteLine($"Номер: {item.Id} Название: {item.Name} Режиссер: {item.Director} Жанр: {item.Genre} Оценка {item.Graduate}");
            }
        }
    }
}