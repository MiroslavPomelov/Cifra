using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Train_ticket
{
    public class User
    {
        public int Id { get; set; }
        public string name, surName, age, email, password;

        public string Name
        {
            get { return Name; }
            set { Name = value; }
        }

        public string SurName
        {
            get { return SurName; }
            set { SurName = value; }
        }

        public string Age
        {
            get { return Age; }
            set { Age = value; }
        }

        public string Email
        {
            get { return Email; }
            set { Email = value; }
        }

        public User() { }

        public User(string name, string surName, string age, string email, string password)
        {
            this.name = name;
            this.surName = surName;
            this.age = age;
            this.email = email;
            this.password = password;
        }

        //public override string ToString()
        //{
        //    return "Пользователь" + Name + " " + SurName;
        //}
    }
}
