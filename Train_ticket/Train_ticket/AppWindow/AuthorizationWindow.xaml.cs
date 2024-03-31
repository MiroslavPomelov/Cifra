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
using System.Windows.Shapes;
using Train_ticket.AppWindow;

namespace Train_ticket
{
    /// <summary>
    /// Логика взаимодействия для AuthorizationWindow.xaml
    /// </summary>
    public partial class AuthorizationWindow : Window
    {
        public AuthorizationWindow()
        {
            InitializeComponent();
        }

        private void Button_Authorization_Click(object sender, RoutedEventArgs e)
        {
            string login = TextBoxLogin.Text.Trim();
            string password = PassBox.Password.Trim();

            // Проверка на ввод данных пользователя:
            if (login.Length < 4)
            {
                TextBoxLogin.ToolTip = "Вы ввели некорректные данные!";
                TextBoxLogin.Background = Brushes.DarkRed;
            }
            else if (password.Length < 6)
            {
                PassBox.ToolTip = "Пароль должен содержать минимум 6 символов!";
                PassBox.Background = Brushes.DarkRed;
            }
            else
            {
                TextBoxLogin.ToolTip = "";
                TextBoxLogin.Background = Brushes.Transparent;
                PassBox.ToolTip = "";
                PassBox.Background = Brushes.Transparent;

                // Взаимодействие с БД:
                User authorizationUser = null;


                if (authorizationUser is null)
                {
                    MessageBox.Show("Неправильный логин или пароль!");
                }
                else
                {
                    MessageBox.Show($"Здравствуйте, {authorizationUser.Name}");
                    User_Personal user_Personal = new User_Personal();
                    user_Personal.Show();
                    Close();  
                }
            }
        }

        private void Button_Window_Auth_Click(object sender, RoutedEventArgs e)
        {
            MainWindow mainWindow = new MainWindow();
            mainWindow.Show();
            Close();
        }
    }
}
