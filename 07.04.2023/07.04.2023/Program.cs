using System.Reflection.Metadata;
using System.Security.Cryptography.X509Certificates;

namespace _07._04._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            User[] users = new User[10];

            for (int i = 0; i < users.Length; i++)
            {
                users[i] = new User();
                users[i].Create();
            }

            users[2].Name = "";
            users[4].Age = 12;

            PrintUsers();
            Console.WriteLine("========================");
            TrimUsers();
            users[0].PrintAgeDifference(users);

            Console.ReadKey();




            void PrintUsers()
            {
                for (int i = 0; i < users.Length; i++)
                {
                    Console.Write(users[i].Name + " " + users[i].Surname + " Возраст: " + users[i].Age);
                    if (users[i].Validate() == false)
                    {
                        Console.Write(" --  Не корректный");
                    }
                    Console.WriteLine();
                }
            }

            void TrimUsers()
            {
                for (int i = 0; i < users.Length; i++)
                {
                    users[i].Trim();
                }
            }
        }
    }
}