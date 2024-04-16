using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.ViewModel.BaseViewModel;

namespace Train_ticket.ViewModel
{
    internal class UserPersonalViewModel : ViewModelBase
    {
        public ICommand CloseAppCommand { get; }
        public ICommand ExitUserPersonalCommand { get; }

        public UserPersonalViewModel()
        {
            CloseAppCommand = new LambdaCommand(CloseApp);
            ExitUserPersonalCommand = new LambdaCommand(ExitUserPersonal);
        }
        public void CloseApp(object o)
        {
            Application.Current.Shutdown();
        }

        public void ExitUserPersonal(object o)
        {
            AuthorizationWindow authorizationWindow = new AuthorizationWindow();
            authorizationWindow.Show();
        }
    }
}
