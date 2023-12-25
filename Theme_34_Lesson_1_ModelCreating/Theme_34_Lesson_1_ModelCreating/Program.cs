using System;

namespace Theme_34_Lesson_1_ModelCreating
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<User> people = new List<User>()
            {
               new User("Miroslav", 24),
               new User("Nikolay", 32),
               new User("Alexander", 40),
               new User("Vasya", 18),
               new User("Ivan", 20),
            };

            using (UserDbContext dBContext = new UserDbContext())
            {

                foreach (User person in people)
                {
                    dBContext.Users.Add(person);
                }

                dBContext.SaveChanges();
            }

        }
    }
}