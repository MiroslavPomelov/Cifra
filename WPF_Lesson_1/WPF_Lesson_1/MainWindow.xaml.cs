using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using WPF_Lesson_1.Model;

namespace WPF_Lesson_1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void RegBTN_Click(object sender, RoutedEventArgs e)
        {
            RegUser();
        }

        public void RegUser()
        {
            DateTime now = DateTime.Now;

            if (GeneratePassCB.IsChecked == true)
            {
                string pass = "";
                Random random = new Random();
                for (int i = 0; i < 8; i++)
                {
                    pass += random.Next(1, 1000).ToString();
                }
                PasswordTB.Text = pass;
            }

            User user = new User(NameTB.Text, int.Parse(AgeTB.Text), SurnameTB.Text, PasswordTB.Text, now);

            using (DataBaseContext dBContext = new DataBaseContext())
            {
                dBContext.Users.AddRange(user);
                dBContext.SaveChanges();
            }
        }
    }
}
