using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Windows;
using System.Windows.Input;
using Train_ticket.AppWindow;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.Model.Data.DataBaseEntities;
using Train_ticket.Services;
using Train_ticket.Services.WEBServices;
using Train_ticket.View;
using Train_ticket.ViewModel.BaseViewModel;

namespace Train_ticket.ViewModel
{
    internal class StartWindowViewModel : ViewModelBase
    {
        #region свойства для привязки к тексбоксам
        private string _userName;
        public string UserName
        {
            get => _userName;
            set
            {
                if (_userName != value)
                {
                    _userName = value;
                    OnPropertyChanged(nameof(UserName));
                }
            }
        }

        private string _userSurname;
        public string UserSurname
        {
            get => _userSurname;
            set
            {
                if (_userSurname != value)
                {
                    _userSurname = value;
                    OnPropertyChanged(nameof(UserSurname));
                }
            }
        }

        private int _userAge;
        public int UserAge
        {
            get => _userAge;
            set
            {
                if (_userAge != value)
                {
                    _userAge = value;
                    OnPropertyChanged(nameof(UserAge));
                }
            }
        }

        private string _userLogin;
        public string UserLogin
        {
            get => _userLogin;
            set
            {
                if (_userLogin != value)
                {
                    _userLogin = value;
                    OnPropertyChanged(nameof(UserLogin));
                }
            }
        }

        private string _userPassword;
        public string UserPassword
        {
            get => _userPassword;
            set
            {
                if (_userPassword != value)
                {
                    _userPassword = value;
                    OnPropertyChanged(nameof(UserPassword));
                }
            }
        }

        private string _userPasswordAgain;
        public string UserPasswordAgain
        {
            get => _userPasswordAgain;
            set
            {
                if (_userPasswordAgain != value)
                {
                    _userPasswordAgain = value;
                    OnPropertyChanged(nameof(UserPasswordAgain));
                }
            }
        }

        private string _userEmail;
        public string UserEmail
        {
            get => _userEmail;
            set
            {
                if (_userEmail != value)
                {
                    _userEmail = value;
                    OnPropertyChanged(nameof(UserEmail));
                }
            }
        }
        #endregion 

        public ICommand SendUserDataCommand { get; }
        public ICommand EnterUserRegistrateCommand { get; }
        public ICommand CloseAppCommand { get; }

        public StartWindowViewModel()
        {
            SendUserDataCommand = new LambdaCommand(SendUserData);
            EnterUserRegistrateCommand = new LambdaCommand(EnterUserRegistrate);
            CloseAppCommand = new LambdaCommand(CloseApp);
        }

        public void SendUserData(object o)
        {
            if (UserName.Length < 3 || UserName is null)
            {
                MessageBox.Show("Корроткое имя!");
            }
            if (UserSurname.Length < 3 || UserSurname is null)
            {
                MessageBox.Show("Корроткая фамилия!");
            }
            if (UserAge < 18 || UserAge.Equals(null))
            {
                MessageBox.Show("Регистрация доступно только совершеннолетним пользователям!");
            }
            if (UserPassword.Length < 6)
            {
                MessageBox.Show("Пароль должен содержать минимум 6 символов!");
            }
            if (UserPassword != UserPasswordAgain)
            {
                MessageBox.Show("Пароли не совпадают!");
            }

            User currentUser = new User(UserName, UserSurname, UserAge, UserLogin, UserEmail, UserPassword);

            User encryptUser = new User(EncryptionHelper.Encrypt(currentUser.Name),
            EncryptionHelper.Encrypt(currentUser.Surname),
            currentUser.Age,
            EncryptionHelper.Encrypt(currentUser.Login),
            EncryptionHelper.Encrypt(currentUser.Email),
            EncryptionHelper.Encrypt(currentUser.Password));

            //Сереализовать сущность в дсон строку
            string userJsonData = JsonSerializer.Serialize(encryptUser);

            HttpClientData request = new();
            string message = request.GETDataAsync<string>(userJsonData, "reg").Result;

            if (message == "welldone")
            {
                MessageBox.Show("Вы зарегестрированы!");

                var windows = Application.Current.Windows.OfType<StartWindow>();
                foreach (var window in windows)
                {
                    window.Hide();
                }
                AuthorizationWindow authorizationWindow = new AuthorizationWindow();
                authorizationWindow.Show();
            }
            else if (message == "loginisexist")
            {
                MessageBox.Show("Данный логин уже используется");
            }
        }

        public void EnterUserRegistrate(object o)
        {
            AuthorizationWindow authorizationWindow = new AuthorizationWindow();
            authorizationWindow.Show();

            var windows = Application.Current.Windows.OfType<StartWindow>();
            foreach (var window in windows)
            {
                window.Close();
            }
        }

        public void CloseApp(object o)
        {
            Application.Current.Shutdown();
        }
    }
}
