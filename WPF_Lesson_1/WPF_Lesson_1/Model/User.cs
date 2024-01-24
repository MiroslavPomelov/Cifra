using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPF_Lesson_1.Model
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Age { get; set; }
        public string? Surname { get; set; }
        public string? Password { get; set; }
        public DateTime Date { get; set; }

        public User() { }

        public User(string name, int age, string surname, string? password, DateTime date)
        {
            Name = name;
            Age = age;
            Surname = surname;
            Password = password;
            Date = date;
        }
    }
}
