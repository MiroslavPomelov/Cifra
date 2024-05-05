using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using System.Windows;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.ViewModel.BaseViewModel;
using Train_ticket.AppWindow;
using System.Text.Json;
using Train_ticket.Services;
using Train_ticket.Model.Data.DataBaseEntities;
using Train_ticket.Services.WEBServices;

namespace Train_ticket.ViewModel
{
    internal class AuthorizationWindowViewModel : ViewModelBase
    {
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


        public ICommand SendUserDataAuthCommand { get; }
        public ICommand RegistrateUserCommand { get; }
        public ICommand CloseAppCommand { get; }


        public AuthorizationWindowViewModel()
        {
            SendUserDataAuthCommand = new LambdaCommand(SendUserDataAuth);
            RegistrateUserCommand = new LambdaCommand(RegistrateUser);
            CloseAppCommand = new LambdaCommand(CloseApp);
        }
        public async void SendUserDataAuth(object o)
        {
            string userAuthData = $"{UserLogin} {UserPassword}";
            string userAuthDataEncrypt = EncryptionHelper.Encrypt(userAuthData, EncryptionHelper.primaryKey);
            string userJsonData = JsonSerializer.Serialize(userAuthDataEncrypt);
            

            User current = await HttpClientData.SendDataAuthAsync(userJsonData);
            CurrentUser = current;
            //User current = authData.GETDataAsync<User>(userJsonData, "auth").Result;
            UserPersonalViewModel next = new(current);
        }

        public void RegistrateUser(object o)
        {
            StartWindow startWindow = new StartWindow();
            startWindow.Show();
            var windows = Application.Current.Windows.OfType<AuthorizationWindow>();
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
