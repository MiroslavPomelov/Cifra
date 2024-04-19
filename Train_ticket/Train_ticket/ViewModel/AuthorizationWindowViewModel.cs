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
        public void SendUserDataAuth(object o)
        {
            User_Personal user_Personal = new User_Personal();
            user_Personal.Show();
        }

        public void RegistrateUser(object o)
        {
            Application.Current.Windows.OfType<AuthorizationWindow>().FirstOrDefault().Close();

            StartWindow startWindow = new StartWindow();
            startWindow.Show();
        }

        public void CloseApp(object o)
        {
            Application.Current.Shutdown();
        }

    }
}
