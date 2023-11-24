using CsvHelper;
using System.Globalization;
using CsvHelper.Configuration;

namespace CSV_Operator_POB2213
{
    internal class Program
    {
        static void Main(string[] args)
        {

            // Создание и запис в CSV


            //using StreamWriter writer = new StreamWriter("Example.csv"); // Создание потока с файлом
            // CsvWriter csvWriter = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture));  // Запись в поток cозданого объекта

            // List<Person> people = new List<Person>()
            // {
            //     new Person(){Name = "Albert", Age = 24},
            //     new Person(){Name = "Dmitry", Age = 36},
            //     new Person(){Name = "Alexey", Age = 18}
            // };


            // csvWriter.WriteRecords(people); // Запись в поток csv список
            // writer.Close(); // Закрыть поток





            //using (StreamWriter writer = new StreamWriter("Example.csv")) // Создание без закрытие потока (автосборка мусора)
            //{
            //    CsvWriter csvWriter = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture));  // Запись в поток cозданого объекта

            //    List<Person> people = new List<Person>()
            //    {
            //    new Person(){Name = "Albert", Age = 24},
            //    new Person(){Name = "Dmitry", Age = 36},
            //    new Person(){Name = "Alexey", Age = 18}
            //    };


            //    csvWriter.WriteRecords(people); // Запись в поток csv список


            // Чтение из CSV

            StreamReader reader = new StreamReader("Example.csv");

            CsvConfiguration csvConfiguration = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = "," // Разделитель
            };

            CsvReader csvReader = new CsvReader(reader, csvConfiguration);

            List<Person> people = csvReader.GetRecords<Person>().ToList();  // Список csv данных конвертируемый в лист

            reader.Close();

            foreach (var item in people)  // Перебор списка и вывод
            {
                Console.WriteLine($"Имя: {item.Name}, Возраст: {item.Age}");
            }
        }
    }
}
