using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Windows;
using System.Windows.Input;
using Train_ticket.AppWindow;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.Model.Data.DataBaseEntities;
using Train_ticket.Services;
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
            User currentUser = new User(UserName, UserSurname, UserAge, UserEmail, UserPassword, UserLogin);

            //Сереализовать сущность в дсон строку
            string userJsonData = JsonSerializer.Serialize(currentUser);

            //string userJsonData = $"{UserName} {UserSurname} {UserAge} {UserEmail} {UserPassword} {UserLogin}";
            MessageBox.Show(currentUser.ToString());

            _ = HttpClientData.SendDataAsync(userJsonData);

            //if (UserName.Length < 1)
            //{
            //    MessageBox.Show("Корроткое имя!");

            //}

            var windows = Application.Current.Windows.OfType<StartWindow>();
            foreach (var window in windows)
            {
                window.Hide();
            }

            AuthorizationWindow authorizationWindow = new AuthorizationWindow();
            authorizationWindow.Show();
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
