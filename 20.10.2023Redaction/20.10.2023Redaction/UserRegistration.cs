using Microsoft.VisualBasic.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace _20._10._2023Redaction
{
    static class UserRegistration
    {
        private static List<User> _users;
        public static void RegisterUser(User newUser)
        {
            string filePath = Directory.GetCurrentDirectory() + "\\UserData.json";
            string jsonData = File.ReadAllText(filePath);
            _users = JsonSerializer.Deserialize<List<User>>(jsonData) ?? new List<User>();

            foreach (var user in _users)
            {
                if (user.UserName == newUser.UserName)
                {
                    MessageBox.Show("Пользователь с таким именем уже существует!");
                    return;
                }
                else if (user.Email == newUser.Email)
                {
                    MessageBox.Show("Пользователь с такой почтой уже существует!");
                    return;
                }
            }

            newUser.Id = _users.Count + 1;
            newUser.RegisterDate = DateTime.Now;
            _users.Add(newUser);
            SerializeUsersToJson(_users, filePath);
        }

        public static void SerializeUsersToJson(List<User> users, string fileName)
        {
            StreamWriter writer = new StreamWriter(fileName);

            JsonSerializerOptions options = new JsonSerializerOptions()
            {
                WriteIndented = true,
                Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
            };

            string renewJsonData = JsonSerializer.Serialize(users, typeof(List<User>), options);
            writer.WriteLine(renewJsonData);
            writer.Close();
        }
    }
}
