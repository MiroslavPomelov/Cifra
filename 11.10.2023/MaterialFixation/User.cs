using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaterialFixation
{
    public delegate string IsDataExists(string data);



    public class User : IUser
    {
        private string _userDataPath = Directory.GetCurrentDirectory() + "\\users.txt";
        public int Id { private get; set; }
        public string Name { private get; set; }
        public string Login { private get; set; }
        public string Password { private get; set; }



        public User(string name, string login, string password)
        {
            string[] usersData = File.ReadAllLines(_userDataPath);

            for (int i = 0; i < usersData.Length; i++)
            {
                if (usersData[i].Split(" ")[2] == login)
                {
                    Console.WriteLine("Пользователь с таким логином уже существует!");
                    return;
                }
                else
                {
                    File.WriteAllText(_userDataPath, usersData);
                }
            }

            Id = usersData.Length;
            Name = new IsDataExists((data) =>
            {
                if (data == null || data == "")
                {
                    throw new Exception("Нет данных");
                };
                return data;
            })
                (name);

            Login = new IsDataExists((data) =>
            {
                if (data == null || data == "")
                {
                    throw new Exception("Нет данных");
                };
                return data;
            })
                (login);

            Password = new IsDataExists((data) =>
            {
                if (data == null || data == "")
                {
                    throw new Exception("Нет данных");
                };
                return data;
            })
                (password);

        }
    }
    public interface IUser
    {
        public int Id { set; }
        public string Name { set; }
        public string Login { set; }
        public string Password { set; }
    }

}
