using System;

namespace Train_ticket.Model.Data.DataBaseEntities
{
    public class User
    {
        public uint Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public short Age { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User() { }

        public User(string name, string surname, short age, string login, string email, string password)
        {
            Name = name;
            Surname = surname;
            Age = age;
            Email = email;
            Password = password;
            Login = login;
        }



        //public int Id { get; set; }
        //public string name, surName, age, email, password, login;

        //public string Name
        //{
        //    get { return Name; }
        //    set { Name = value; }
        //}

        //public string SurName
        //{
        //    get { return SurName; }
        //    set { SurName = value; }
        //}

        //public string Age
        //{
        //    get { return Age; }
        //    set { Age = value; }
        //}

        //public string Email
        //{
        //    get { return Email; }
        //    set { Email = value; }
        //}

        //public string Login
        //{
        //    get { return Login; }
        //    set { Login = value; }
        //}

        //public User() { }

        //public User(string name, string surName, string age, string email, string password,string login)
        //{
        //    this.name = name;
        //    this.surName = surName;
        //    this.age = age;
        //    this.email = email;
        //    this.password = password;
        //    this.login = login;
        //}

        ////public override string ToString()
        ////{
        ////    return "Пользователь" + Name + " " + SurName;
        ////}
    }
}
