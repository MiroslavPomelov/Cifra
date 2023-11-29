using System.Xml.Serialization;

namespace XML29._11._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //List<Person> people = new List<Person>()
            //{
            //    new Person()  {Name = "Валерий", Age = 56 },
            //      new Person()  {Name = "Николай", Age = 16 },
            //        new Person()  {Name = "Владислав", Age = 20 },
            //};


            // Запись в XML
            //XmlSerializer serializer = new XmlSerializer(typeof(List<Person>));

            //FileStream stream = new FileStream("persons.xml", FileMode.Create);
            //serializer.Serialize(stream, people);
            //stream.Close();

            // Чтение из XML
            XmlSerializer serializer = new XmlSerializer(typeof(List<Person>));
            List<Person> list;
            using (FileStream stream = new FileStream("persons.xml", FileMode.Open))
            {
                list = (List<Person>)serializer.Deserialize(stream)!;

                foreach (var person in list)
                {
                    Console.WriteLine($"{person.Name} {person.Age}");
                }
            }
        }
    }
}