using System;
using System.Windows;
using System.Windows.Input;
using Train_ticket.AppWindow;
using Train_ticket.Core;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.View;
using Train_ticket.ViewModel.BaseViewModel;

namespace Train_ticket.ViewModel
{
    internal class BuyTicketViewModel : ViewModelBase
    {
        private string _depCity;
        public string DepCity
        {
            get => _depCity;
            set
            {
                if (_depCity != value)
                {
                    _depCity = value;
                    OnPropertyChanged(nameof(DepCity));
                }
            }
        }

        private string _arrCity;
        public string ArrCity
        {
            get => _arrCity;
            set
            {
                if (_arrCity != value)
                {
                    _arrCity = value;
                    OnPropertyChanged(nameof(ArrCity));
                }
            }
        }

        private string _dateDep;
        public string DateDep
        {
            get => _dateDep;
            set
            {
                if (_dateDep != value)
                {
                    _dateDep = value;
                    OnPropertyChanged(nameof(DateDep));
                }
            }
        }

        private string _arrDep;
        public string ArrDep
        {
            get => _arrDep;
            set
            {
                if (_arrDep != value)
                {
                    _arrDep = value;
                    OnPropertyChanged(nameof(ArrDep));
                }
            }
        }

        public ICommand SendUserDataTicketCommand { get; }

        public BuyTicketViewModel()
        {
            SendUserDataTicketCommand = new LambdaCommand(SendUserDataTicket);
        }

        public void SendUserDataTicket(object o)
        {
            string ticket_data = $"{DepCity} {ArrCity} {DateDep} {ArrDep}";

            RouteView routeView = new RouteView();
            routeView.Show();
        }
    }
}
