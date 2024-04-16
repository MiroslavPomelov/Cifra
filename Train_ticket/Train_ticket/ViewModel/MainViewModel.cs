//using System;
//using System.Windows.Controls.Primitives;
//using System.Windows.Input;
//using System.Windows.Media;
//using Train_ticket;
//using Train_ticket.Core;
//using Train_ticket.Infrastructure.Commands;
//using Train_ticket.Services;
//using Train_ticket.ViewModel.BaseViewModel;

//namespace ViewModel
//{
//    public class MainViewModel : ViewModelBase
//    {

//        //public RelayCommand UserViewCommand { get; set; }
//        //public RelayCommand BuyTicketViewCommand { get; set; }
//        //public RelayCommand YourTicketsViewCommand { get; set; }

//        //public UserViewModel UserVm { get; set; }
//        //public BuyTicketViewModel BuyTicketVM { get; set; }
//        //public YourTicketsViewModel YourTicketsVM { get; set; }

//        //private object _currentView;

//        //public object CurrentView
//        //{
//        //    get { return _currentView; }
//        //    set
//        //    {
//        //        _currentView = value;
//        //        OnPropertyChanged();
//        //    }
//        //}



//        //public MainWindow _textBoxProperty;
//        //public MainWindow TextBoxProperty
//        //{
//        //    get => _textBoxProperty;
//        //    set
//        //    {
//        //        _textBoxProperty = value;
//        //        OnPropertyChanged(nameof(TextBoxProperty));

//        //    }

//        //}

//        //public ICommand RegUser { get; }
//        //public MainViewModel()
//        //{
//        //    RegUser = new LambdaCommand(OnRegUserCommandExecuted,
//        //    CanRegUserCommandExecute);
//        //}
//        //private bool CanRegUserCommandExecute(object p) => true;
//        //private void OnRegUserCommandExecuted(object p)
//        //{
//        //    string name = TextBoxProperty.TextBoxName.Text.Trim();
//        //    string surName = TextBoxProperty.TextBoxSurname.Text.Trim();
//        //    string age = TextBoxProperty.TextBoxAge.Text.Trim();
//        //    string login = TextBoxProperty.TextBoxLogin.Text.Trim();
//        //    string password = TextBoxProperty.PassBox.Password.Trim();
//        //    string passwordAgain = TextBoxProperty.PassBoxAgain.Password.Trim();
//        //    string email = TextBoxProperty.TextBoxEmail.Text.Trim().ToLower();


//        //    // Проверка на ввод данных пользователя:
//        //    if (login.Length < 4)
//        //    {
//        //        TextBoxProperty.TextBoxLogin.ToolTip = "Вы ввели некорректные данные!";
//        //        TextBoxProperty.TextBoxLogin.Background = Brushes.DarkRed;
//        //    }
//        //    else if (password.Length < 6)
//        //    {
//        //        TextBoxProperty.PassBox.ToolTip = "Пароль должен содержать минимум 6 символов!";
//        //        TextBoxProperty.PassBox.Background = Brushes.DarkRed;
//        //    }
//        //    else if (password != passwordAgain)
//        //    {
//        //        TextBoxProperty.PassBoxAgain.ToolTip = "Введенные парли не совпадают!";
//        //        TextBoxProperty.PassBoxAgain.Background = Brushes.DarkRed;
//        //    }
//        //    else if (email.Length < 4 || !email.Contains("@") || !email.Contains("."))
//        //    {
//        //        TextBoxProperty.TextBoxEmail.ToolTip = "Неверный email!";
//        //        TextBoxProperty.TextBoxEmail.Background = Brushes.DarkRed;
//        //    }
//        //    else if (TextBoxProperty.TextBoxName.Text is null)
//        //    {
//        //        TextBoxProperty.TextBoxName.ToolTip = " Поле Имя не может быть пустым!";
//        //        TextBoxProperty.TextBoxName.Background = Brushes.DarkRed;
//        //    }
//        //    else if (TextBoxProperty.TextBoxSurname.Text is null)
//        //    {
//        //        TextBoxProperty.TextBoxSurname.ToolTip = "Поле Фамилия не может быть пустым!";
//        //        TextBoxProperty.TextBoxSurname.Background = Brushes.DarkRed;
//        //    }
//        //    else if (TextBoxProperty.TextBoxAge.Text is null || int.Parse(TextBoxProperty.TextBoxAge.Text) < 18)
//        //    {
//        //        TextBoxProperty.TextBoxAge.ToolTip = "Поле Возраст не может быть пустым или меньше 18!";
//        //        TextBoxProperty.TextBoxAge.Background = Brushes.DarkRed;
//        //    }
//        //    else
//        //    {
//        //        TextBoxProperty.TextBoxLogin.ToolTip = "";
//        //        TextBoxProperty.TextBoxLogin.Background = Brushes.Transparent;
//        //        TextBoxProperty.PassBox.Background = Brushes.Transparent;
//        //        TextBoxProperty.PassBox.ToolTip = "";
//        //        TextBoxProperty.PassBoxAgain.ToolTip = "";
//        //        TextBoxProperty.PassBoxAgain.Background = Brushes.Transparent;
//        //        TextBoxProperty.TextBoxEmail.ToolTip = "";
//        //        TextBoxProperty.TextBoxEmail.Background = Brushes.Transparent;

//        //        TextBoxProperty.TextBoxName.ToolTip = "";
//        //        TextBoxProperty.TextBoxName.Background = Brushes.Transparent;
//        //        TextBoxProperty.TextBoxSurname.ToolTip = "";
//        //        TextBoxProperty.TextBoxSurname.Background = Brushes.Transparent;
//        //        TextBoxProperty.TextBoxAge.ToolTip = "";
//        //        TextBoxProperty.TextBoxAge.Background = Brushes.Transparent;

//        //        User user = new User(name, surName, age, email, password, login);

//        //        // Отправка данных на сервер

//        //        _ = HttpClientData.SendDataAsync(name);


//                //AuthorizationWindow authorizationWindow = new AuthorizationWindow();
//                //authorizationWindow.Show();
//                //Close();

//                //MessageBox.Show("Готово!");
//            }


//            //public MainViewModel()
//            //{
//            //UserVm = new UserViewModel();
//            //BuyTicketVM = new BuyTicketViewModel();
//            //YourTicketsVM = new YourTicketsViewModel();

//            //CurrentView = UserVm;

//            //UserViewCommand = new RelayCommand(o =>
//            //{
//            //    CurrentView = UserVm;
//            //});


//            //BuyTicketViewCommand = new RelayCommand(o =>
//            //{
//            //    CurrentView = BuyTicketVM;
//            //});

//            //YourTicketsViewCommand = new RelayCommand(o =>
//            //{
//            //    CurrentView = YourTicketsVM;
//            //});

//            //}
//        }
//    }
//}
