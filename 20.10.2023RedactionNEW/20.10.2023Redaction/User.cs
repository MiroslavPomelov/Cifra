using Microsoft.VisualBasic.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

enum Role
{
    Admin,
    Author,
    Reader
}


namespace _20._10._2023Redaction
{
    class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime RegisterDate { get; set; }
        public DateTime BirthDay { get; set; }
        public bool Author { get; set; }
        public bool Reader { get; set; }
        public bool Isredactor { get; set; } = false;
        public Role Role { get; set; }

        public User(string userName, string firstName, string secondName, string email, string password, DateTime birthDay, Role role)
        {

            UserName = userName;
            FirstName = firstName;
            SecondName = secondName;
            Email = email;
            Password = password;
            BirthDay = birthDay;
            Isredactor = false;
            Role = role;
        }
    }
}
