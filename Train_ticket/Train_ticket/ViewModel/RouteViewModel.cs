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
    internal class RouteViewModel : ViewModelBase
    {
        public ICommand CloseAppCommand { get; }

        public RouteViewModel()
        {
            CloseAppCommand = new LambdaCommand(CloseApp);
        }

        public void CloseApp(object o)
        {
            Application.Current.Shutdown();
        }
    }
}
