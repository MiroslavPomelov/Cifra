using Microsoft.EntityFrameworkCore;

namespace Theme_32_Lesson_4_DataBase_OperatingMethods
{
    internal class Program
    {
        static /*async Task*/  void Main(string[] args)
        {
            //List<Person> people = new List<Person>();
            List<Person> people = new List<Person>()
            {
               new Person(){Name = "Miroslav", Age = 24},
               new Person(){Name = "Nikolay", Age = 28},
               new Person(){Name = "Vasya", Age = 40},
               new Person(){Name = "Klim", Age = 18},
               new Person(){Name = "Alexander", Age = 33}
            };


            using (PersonDBContext dBContext = new PersonDBContext())
            {
                //CREATE
                //foreach (Person person in people)
                //{
                //    dBContext.People.Add(person);
                //}

                //2 способ
                //dBContext.People.AddRange(people/*[1], people[2], people[3]*/); // Тот же foreach, 
                //dBContext.SaveChanges();


                //READ
                people = dBContext.People.ToList();
                foreach (var person in people)
                {
                    Console.WriteLine($"{person.Id}, {person.Name}, {person.Age}");
                }


                //UPDATE
                //Person? person = dBContext.People.FirstOrDefault();

                //Person? persons = await dBContext.People.FirstOrDefaultAsync();
                //Task.Run(async () => { List<Person> persons = await dBContext.People.ToListAsync(); });
                //*Person? foundPerson = await dBContext.People.FindAsync(1); ---------- Искать по ID


                //int counter = dBContext.People.Count(p => p.Name == "Vasya"); -------- Подсчет сущностей по имени.

                //Person? person = new Person();
                //person.Id = 2; // Изменить определенный объект по ID

                //person.Name = "Slava";
                //person.Age = 25;

                //dBContext.People.Update(person);
                //dBContext.SaveChanges();


                //DELETE
                //Person? person = dBContext.People.FirstOrDefault();

                //if (person != null)
                //{
                //    dBContext.People.Remove(person);
                //    dBContext.People.RemoveRange(person);
                //}
                //dBContext.SaveChanges();
            }
        }
    }
}