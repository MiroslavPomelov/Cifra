using Microsoft.EntityFrameworkCore;

namespace Theme_35_Lesson_3_LINQEntites
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //using (DatabaseContext db = new DatabaseContext())
            //{
            //    Console.WriteLine(db.Database.CanConnect());
            //}



            //List<User> userList = new List<User>()
            //{
            //    new User("Валерий", 25, new TelephoneNumber("00000000000")),
            //    new User("Дмитрий", 30, new TelephoneNumber("11111111111")),
            //    new User("Анна", 28, new TelephoneNumber("22222222222")),
            //    new User("Алексей", 22, new TelephoneNumber("33333333333")),
            //    new User("Богдан", 35, new TelephoneNumber("44444444444")),
            //    new User("Светлана", 29, new TelephoneNumber("55555555555")),
            //};


            //List<User> users;
            using (DatabaseContext db = new DatabaseContext())
            {
                //db.Users.AddRange(userList);
                //db.SaveChanges();




                //users = (from user in db.Users.Include(p => p.Number) // Связанная таблица
                //         where user.Id %2 == 0
                //         select user).ToList();





                //var users = db.Users.Join(db.TelephoneNumber,
                //    u => u.Number.Id,
                //    n => n.Id,
                //    (u, n) => new
                //    {
                //        Name = u.Name,
                //        Number = n.Number,
                //        Age = u.Age
                //    });

                //foreach (var user in users)
                //{
                //    Console.WriteLine($"{user.Name} {user.Number} {user.Age}");
                //}



                // ДЛЯ SQLITE БАЗЫ ДАННЫХ
                //var grouppedByAge = db.Users
                //    .GroupBy(u => u.Age)
                //    .OrderBy(g => g.Key);

                // ДЛЯ MYSQL БАЗЫ ДАННЫХ
                var grouppedByAge = db.Users
                    .AsEnumerable()
                    .GroupBy(u => u.Age)
                    .OrderBy(g => g.Key);

                foreach (var group in grouppedByAge)
                {
                    Console.WriteLine($"Группа пользователей с возрастом {group.Key}");

                    foreach (var user in group)
                    {
                        Console.WriteLine(user.Name);
                    }
                    Console.WriteLine();
                }
            }



            //foreach (User user in users)
            //{
            //    Console.WriteLine($"{user.Id} {user.Name} {user.Age} {user.Number.Number}");
            //}




        }
    }
}