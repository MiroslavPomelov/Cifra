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
using System.Collections.Generic;

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

        public BuyTicketViewModel(User previous)
        {
            CurrentUser = previous;
            SendUserDataTicketCommand = new LambdaCommand(SendUserDataTicket);
        }

        public void SendUserDataTicket(object o)
        {
            DepCity = "Калининград";
            ArrCity = "Москва";

            DateDep = new DateTime(2024, 05, 04);
            ArrDep = new DateTime(2024, 05, 05);

            LookupSeats lookupSeats = new LookupSeats(DepCity, ArrCity, DateDep, ArrDep);

            JsonSerializerOptions options = new JsonSerializerOptions()
            {
                Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
            };

            string userJsonData = JsonSerializer.Serialize(lookupSeats, options);

            HttpClientData request = new();
            
            List<AvaliableSeat> avaliableSeats = request.GETDataAsync<List<AvaliableSeat>>(userJsonData, "route").Result;
            List<Seat> seatList = request.GETDataAsync<List<Seat>>(userJsonData, "route").Result;
            _ = new RouteViewModel(avaliableSeats, seatList);
        }
    }
}
