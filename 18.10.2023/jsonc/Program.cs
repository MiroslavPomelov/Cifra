using System.Text.Encodings.Web;
using System.Text.Json;

namespace jsonc
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Surelalize
            //Person person = new Person()
            //{
            //    Name = "Miroslav",
            //    SurName = "Pomelov",
            //    Age = 24,
            //    Birthday = new DateTime(1999, 02, 16),
            //    NominalOfMoney = new int[] { 10, 15, 25 },
            //    Colors = new List<string>() { "red","green","blue"}
            //};

            //JsonSerializerOptions options = new JsonSerializerOptions() //Привести к норм виду по строкам
            //{
            //    WriteIndented = true,
            //    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            //    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
            //};


            //string personJson = JsonSerializer.Serialize(person, typeof(Person), options);
            //Console.WriteLine(personJson);
            //StreamWriter file = File.CreateText("person.json");
            //file.WriteLine(personJson);
            //file.Close();

            //Desurealize
            //string jsonData = File.ReadAllText("person.json");
            //Person person = JsonSerializer.Deserialize<Person>(jsonData);


            string jsonBanana = File.ReadAllText("product.json");
            Product product = JsonSerializer.Deserialize<Product>(jsonBanana);
            Console.WriteLine("{0}, {1}, {2}", product.Name, product.Price, product.Description);

        }

        class Person
        {
            public string Name { get; set; }
            public string SurName { get; set; }
            public int Age { get; set; }
            public DateTime Birthday { get; set; }
            public int[] NominalOfMoney { get; set; } = new int[3];
            public List<string> Colors { get; set; } = new List<string>();
        }


        class Product
        {
            public string Name { get; set; }
            public int Price { get; set; }
            public string Description { get; set; }

            public List<string> Fruits { get; set; } = new List<string>();
        }
    }
}