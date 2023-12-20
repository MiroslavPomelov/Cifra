namespace Theme_32_Lesson_4_DataBase_OperatingMethods
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Person> people = new List<Person>();
            //List<Person> people = new List<Person>()
            //{
            //   new Person(){Name = "Miroslav", Age = 24},
            //   new Person(){Name = "Nikolay", Age = 28},
            //   new Person(){Name = "Vasya", Age = 40},
            //   new Person(){Name = "Klim", Age = 18},
            //   new Person(){Name = "Alexander", Age = 33}
            //};

            using (PersonDBContext dBContext = new PersonDBContext())
            {
                //CREATE
                //foreach (Person person in people)
                //{
                //    dBContext.People.Add(person);
                //}

                //dBContext.People.AddRange(people/*[1], people[2], people[3]*/); // Тот же foreach, 
                //dBContext.SaveChanges();


                //READ
                people = dBContext.People.ToList();
                foreach (var person in people)
                {
                    Console.WriteLine($"{person.Id}, {person.Name}, {person.Age}");
                }
            }
        }
    }
}