using _20._10._2023Redaction.RoleOfUsers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace _20._10._2023Redaction
{
    public class UserAuthentication
    {
        public void Autentificate(string userLogin, string userPassword)
        {
            StreamReader reader = new StreamReader("UserData.json");
            string jsonData = reader.ReadToEnd();
            User[] users = JsonSerializer.Deserialize<User[]>(jsonData) ?? throw new Exception("нет данных");

            reader.Close();

            User? currentUser = null;

            foreach (User user in users)
            {
                if (user.UserName == userLogin && user.Password == userPassword)
                {
                    currentUser = user;
                }
            }

            if (currentUser == null)
            {
                MessageBox.Show("Пользователь не найден или пароль неверен");
                return;
            }

            IsUserAuthenticated(currentUser);
        }

        private void IsUserAuthenticated(User currentUser)
        {

            switch (currentUser.Role)
            {
                case Role.Admin:
                    AdminPanel adminPanel = new AdminPanel();
                    adminPanel.Show();
                    break;
                case Role.Author:
                    AuthorPanel authorpanel = new AuthorPanel(currentUser);
                    authorpanel.Show();
                    break;
                case Role.Reader:
                    ReaderPanel readerPanel = new ReaderPanel();
                    readerPanel.Show();
                    break;
            }
        }
    }
}
