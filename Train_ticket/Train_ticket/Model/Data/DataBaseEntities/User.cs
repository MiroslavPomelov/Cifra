using System;

namespace Train_ticket.Model.Data.DataBaseEntities
{
    public class User
    {
        public string Name { get; set; }
        public string SurName { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Login { get; set; }

        public User() { }

        public User(string name, string surName, int age, string email, string password, string login)
        {
            Name = name;
            SurName = surName;
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
