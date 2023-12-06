//using Json.Net;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel;
//using System.Data;
//using System.Drawing;
//using System.IO;
//using System.Linq;
//using System.Text;
//using System.Text.Json.Nodes;
//using System.Text.Json.Serialization;
//using System.Threading.Tasks;
//using System.Windows.Forms;
//using System.Xml.Linq;
//using Newtonsoft.Json;
//using Newtonsoft.Json.Linq;
//using static System.Resources.ResXFileRef;
//using static System.Windows.Forms.Design.AxImporter;
//using System.Text.Json;
////using JsonSerializer = Json.Net.JsonSerializer;
//using Microsoft.VisualBasic.ApplicationServices;
//using Microsoft.VisualBasic.Logging;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Text.Encodings.Web;
//using JsonSerializer = System.Text.Json.JsonSerializer;
using Microsoft.VisualBasic.ApplicationServices;
using Microsoft.VisualBasic.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using static System.Windows.Forms.Design.AxImporter;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace _20._10._2023Redaction.RoleOfUsers
{
    public partial class AdminPanel : Form
    {
        public User CurrentUser { get; set; }
        public AdminPanel(User user)
        {
            InitializeComponent();

            InfoUserTB.ScrollBars = ScrollBars.Both;
            CurrentUser = user;

            using StreamReader reader = File.OpenText("UserData.json");
            var jToken = Newtonsoft.Json.Linq.JToken.ReadFrom(new Newtonsoft.Json.JsonTextReader(reader));

            var values = jToken.Select(j => j["UserName"].ToObject<string>()).ToArray();

            for (int i = 0; i < values.Length; i++)
            {
                CurrentUser.ArticleList.Add(Path.GetFileName(values[i]));
                UsersListLB.Items.Add(values[i]);
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            Form1 authenticationForm = new Form1();
            authenticationForm.Show();
            Close();
        }

        private async void InfoUserBTN_Click(object sender, EventArgs e)
        {
            //StreamReader streamReader = new StreamReader("UserData.json", true);
            //string text = await streamReader.ReadToEndAsync();
            //InfoUserTB.Text = text;
            //streamReader.Close();


            //StreamReader streamReader = new StreamReader("UserData.json", true);
            //string text = streamReader.ReadToEnd();
            //string[] usersData = text.Split("},");

            //InfoUserTB.Text = usersData[UsersListLB.SelectedIndex];
            //streamReader.Close();



            using (StreamReader r = new StreamReader("UserData.json", Encoding.Default))
            {
                string json = r.ReadToEnd();
                List<User> items = JsonConvert.DeserializeObject<List<User>>(json)!;

                //var options = new JsonSerializerOptions
                //{
                //    WriteIndented = true
                //};
                //string json1 = System.Text.Json.JsonSerializer.Serialize<User>(CurrentUser, options);

                foreach (var item in items)
                {
                    if (UsersListLB.Text == item.UserName)
                    {
                        InfoUserTB.Text = $"UserName: {item.UserName} {Environment.NewLine} FirstName: {item.FirstName} {Environment.NewLine} SecondName: {item.SecondName} {Environment.NewLine} Email: {item.Email} {Environment.NewLine} Password: {item.Password} {Environment.NewLine} RegisterDate: {item.RegisterDate} {Environment.NewLine} BirthDay: {item.BirthDay} {Environment.NewLine} Role: {item.Role}";
                        //InfoUserTB.Text = json1;
                    }
                }
            }






            //string jsonString = JsonSerializer.Serialize(text);

            //string[] example = new string[UsersListLB.Items.Count];
            //for (int i = 0; i < example.Length; i++)
            //{
            //    example[i] = jsonString;
            //}
            //int m = 2;


        }

        private void AddUserBTN_Click(object sender, EventArgs e)
        {
            Hide();
            RegistrationForm registrationForm = new RegistrationForm();
            registrationForm.Show();
        }

        private async void DeleteUserBTN_Click(object sender, EventArgs e)
        {
            List<User> users = new List<User>();
            using (StreamReader r = new StreamReader("UserData.json", Encoding.Default))
            {
                string json = r.ReadToEnd();
                List<User> items = JsonConvert.DeserializeObject<List<User>>(json)!;

                foreach (var item in items)
                {
                    if (UsersListLB.Text == item.UserName)
                    {
                        items.Remove(item);
                        users.AddRange(items);
                        MessageBox.Show($"Пользоваетль {item.UserName} успешно удален!");
                        break;
                    }
                }
            }

            StreamWriter writer = new StreamWriter("UserData.json");

            JsonSerializerOptions options = new JsonSerializerOptions()
            {
                WriteIndented = true,
                Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
            };

            string renewJsonData = System.Text.Json.JsonSerializer.Serialize(users, typeof(List<User>), options);
            writer.WriteLine(renewJsonData);
            writer.Close();
            UsersListLB.Items.Clear();
            Neww();
            //Neww();
            //UserRegistration.SerializeUsersToJson(items1, "UserData.json");

        }

        public void Neww()
        {
            using StreamReader reader = File.OpenText("UserData.json");
            var jToken = Newtonsoft.Json.Linq.JToken.ReadFrom(new Newtonsoft.Json.JsonTextReader(reader));

            var values = jToken.Select(j => j["UserName"].ToObject<string>()).ToArray();

            for (int i = 0; i < values.Length; i++)
            {
                CurrentUser.ArticleList.Add(Path.GetFileName(values[i]));
                UsersListLB.Items.Add(values[i]);
            }
        }

        private void ArticleListOfUserBTN_Click(object sender, EventArgs e)
        {
            List<User> users = new List<User>();
            using (StreamReader r = new StreamReader("UserData.json", Encoding.Default))
            {
                string json = r.ReadToEnd();
                List<User> items = JsonConvert.DeserializeObject<List<User>>(json)!;

                foreach (var item in items)
                {
                    if (UsersListLB.Text == item.UserName)
                    {
                        for (int i = 0; i < item.ArticleList.Count; i++)
                        {
                            InfoUserTB.Text = item.ArticleList[i];
                        }
                    }
                }
            }
        }

        private void ChangeUserInfoBTN_Click(object sender, EventArgs e)
        {

        }
    }
}



