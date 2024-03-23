using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPF_09._02._2024_Lesson_93_PropertiesBinding.Models;

namespace WPF_09._02._2024_Lesson_93_PropertiesBinding.Services
{
    public class UserListCreator
    {
        public static User GetUser(int id)
        {
            var users = new List<User>()
            {
                new User(1, "Валерий", 30),
                new User(2, "Юрий", 35),
                new User(3, "Анатолий", 40),
                new User(4, "Олег", 20),
                new User(5, "Леонид", 33),
                new User(6, "Стас", 31),
                new User(7, "Дмитрий", 99),
                new User(8, "Жак", 80),
                new User(9, "Боря", 70),
                new User(10, "Анна", 18),
                new User(11, "Елена", 38),
                new User(12, "Иван", 19),
            };

            return users.Find(u => u.Id == id) ?? users[0];
        }
    }
}
