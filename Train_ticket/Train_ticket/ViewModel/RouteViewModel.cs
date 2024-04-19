using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using Train_ticket.AppWindow;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.View;
using Train_ticket.ViewModel.BaseViewModel;

namespace Train_ticket.ViewModel
{
    internal class RouteViewModel : ViewModelBase
    {
        public ICommand CloseAppCommand { get; }
        public ICommand BackToUserViewCommand { get; }

        public RouteViewModel()
        {
            CloseAppCommand = new LambdaCommand(CloseApp);
            BackToUserViewCommand = new LambdaCommand(BackToUserView);
        }

        public void CloseApp(object o)
        {
            Application.Current.Shutdown();
        }

        public void BackToUserView(object o)
        {
            User_Personal user_Personal = new User_Personal();
            user_Personal.Show();
            Application.Current.Windows.OfType<RouteView>().FirstOrDefault().Close();
        }
    }
}
