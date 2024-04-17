using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using Train_ticket.Core;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.View;
using Train_ticket.ViewModel.BaseViewModel;

namespace Train_ticket.ViewModel
{
    internal class UserPersonalViewModel : ViewModelBase
    {
        public RelayCommand UserViewCommand { get; set; }
        public RelayCommand BuyTicketViewCommand { get; set; }
        public RelayCommand YourTicketsViewCommand { get; set; }

        public UserViewModel UserVm { get; set; }
        public BuyTicketViewModel BuyTicketVM { get; set; }
        public YourTicketsViewModel YourTicketsVM { get; set; }

        private object _currentView;
        public object CurrentView
        {
            get => _currentView;
            set
            {
                _currentView = value;
                OnPropertyChanged();
            }
        }

        public ICommand CloseAppCommand { get; }
        public ICommand ExitUserPersonalCommand { get; }
        public ICommand ViewUserWindowCommand { get; }
        public ICommand ViewBuyTicketWindowCommand { get; }
        public ICommand ViewYourTicketsWindowCommand { get; }

        public UserPersonalViewModel()
        {
            CurrentView = new UserViewModel();
            CloseAppCommand = new LambdaCommand(CloseApp);
            ExitUserPersonalCommand = new LambdaCommand(ExitUserPersonal);
            ViewUserWindowCommand = new LambdaCommand(ViewUserWindow);
            ViewBuyTicketWindowCommand = new LambdaCommand(ViewBuyTicketWindow);
            ViewYourTicketsWindowCommand = new LambdaCommand(ViewYourTicketsWindow);
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

        public void ViewUserWindow(object o)
        {
            UserVm = new UserViewModel();

            CurrentView = UserVm;

            UserViewCommand = new RelayCommand(o =>
            {
                CurrentView = UserVm;
            });
        }

        public void ViewBuyTicketWindow(object o)
        {
            BuyTicketVM = new BuyTicketViewModel();

            CurrentView = BuyTicketVM;

            BuyTicketViewCommand = new RelayCommand(o =>
            {
                CurrentView = BuyTicketVM;
            });
        }

        public void ViewYourTicketsWindow(object o)
        {
            YourTicketsVM = new YourTicketsViewModel();

            CurrentView = YourTicketsVM;

            YourTicketsViewCommand = new RelayCommand(o =>
            {
                CurrentView = YourTicketsVM;
            });
        }
    }
}
