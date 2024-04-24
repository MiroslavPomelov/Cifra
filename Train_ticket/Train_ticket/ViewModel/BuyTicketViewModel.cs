using System;
using System.Text.Json;
using System.Windows;
using System.Windows.Input;
using Train_ticket.AppWindow;
using Train_ticket.Core;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.Model.Data.DataBaseEntities;
using Train_ticket.Services;
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

        private DateTime _dateDep;
        public DateTime DateDep
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

        private DateTime _arrDep;
        public DateTime ArrDep
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
            LookupSeats lookupSeats = new LookupSeats(DepCity, ArrCity, DateDep, ArrDep);

            string userJsonData = JsonSerializer.Serialize(lookupSeats);

            //string userJsonData = $"{UserName} {UserSurname} {UserAge} {UserEmail} {UserPassword} {UserLogin}";
            MessageBox.Show(lookupSeats.ToString());

            _ = HttpClientData.SendDataUserRootTicketAsync(userJsonData);

            RouteView routeView = new RouteView();
            routeView.Show();
        }
    }
}
