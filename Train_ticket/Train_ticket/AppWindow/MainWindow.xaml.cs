using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
using Train_ticket.AppWindow;
using Train_ticket.Services;

namespace Train_ticket
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }


        // Обработчик кнопки регистрации:
        private void Button_Reg_Click(object sender, RoutedEventArgs e)
        {
            string name = TextBoxName.Text.Trim();
            string surName = TextBoxSurname.Text.Trim();
            string age = TextBoxAge.Text.Trim();
            string login = TextBoxLogin.Text.Trim();
            string password = PassBox.Password.Trim();
            string passwordAgain = PassBoxAgain.Password.Trim();
            string email = TextBoxEmail.Text.Trim().ToLower();

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
            else if (password != passwordAgain)
            {
                PassBoxAgain.ToolTip = "Введенные парли не совпадают!";
                PassBoxAgain.Background = Brushes.DarkRed;
            }
            else if (email.Length < 4 || !email.Contains("@") || !email.Contains("."))
            {
                TextBoxEmail.ToolTip = "Неверный email!";
                TextBoxEmail.Background = Brushes.DarkRed;
            }
            else if (TextBoxName.Text is null)
            {
                TextBoxName.ToolTip = " Поле Имя не может быть пустым!";
                TextBoxName.Background = Brushes.DarkRed;
            }
            else if (TextBoxSurname.Text is null)
            {
                TextBoxSurname.ToolTip = "Поле Фамилия не может быть пустым!";
                TextBoxSurname.Background = Brushes.DarkRed;
            }
            else if (TextBoxAge.Text is null || int.Parse(TextBoxAge.Text) < 18)
            {
                TextBoxAge.ToolTip = "Поле Возраст не может быть пустым или меньше 18!";
                TextBoxAge.Background = Brushes.DarkRed;
            }
            else
            {
                TextBoxLogin.ToolTip = "";
                TextBoxLogin.Background = Brushes.Transparent;
                PassBox.ToolTip = "";
                PassBox.Background = Brushes.Transparent;
                PassBoxAgain.ToolTip = "";
                PassBoxAgain.Background = Brushes.Transparent;
                TextBoxEmail.ToolTip = "";
                TextBoxEmail.Background = Brushes.Transparent;

                TextBoxName.ToolTip = "";
                TextBoxName.Background = Brushes.Transparent;
                TextBoxSurname.ToolTip = "";
                TextBoxSurname.Background = Brushes.Transparent;
                TextBoxAge.ToolTip = "";
                TextBoxAge.Background = Brushes.Transparent;

                User user = new User(name, surName, age, email, password, login);

                // Отправка данных на сервер

                _ = HttpClientData.SendDataAsync(name);
                

                //AuthorizationWindow authorizationWindow = new AuthorizationWindow();
                //authorizationWindow.Show();
                //Close();

                //MessageBox.Show("Готово!");

            }
        }

        private void Button_Window_Enter_Click(object sender, RoutedEventArgs e)
        {
            AuthorizationWindow authorizationWindow = new AuthorizationWindow();
            authorizationWindow.Show();
            Close();
        }

    }
}
