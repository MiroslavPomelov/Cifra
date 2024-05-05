using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Windows;
using System.Windows.Input;
using Train_ticket.Core;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.Model.Data.DataBaseEntities;
using Train_ticket.Services;
using Train_ticket.Services.WEBServices;
using Train_ticket.View;
using Train_ticket.ViewModel.BaseViewModel;

namespace Train_ticket.ViewModel
{
    internal class YourTicketsViewModel : ViewModelBase
    {
        private List<AvaliableSeat> _avaliableSeats1;
        public List<AvaliableSeat> AvaliableSeats1
        {
            get => _avaliableSeats1;
            set
            {
                if (_avaliableSeats1 != value)
                {
                    _avaliableSeats1 = value;
                    OnPropertyChanged(nameof(AvaliableSeats1));
                }
            }
        }

        private List<AvaliableSeat> _seats;
        public List<AvaliableSeat> Seats
        {
            get => _seats;
            set
            {
                if (_seats != value)
                {
                    _seats = value;
                    OnPropertyChanged(nameof(Seats));
                }
            }
        }

        public ICommand GetUserTicketsCommand { get; }
        public YourTicketsViewModel(User current)
        {
            GetUserTicketsCommand = new LambdaCommand(GetUserTickets);
            CurrentUser = current;
            YourTicketsView userViewWind = new();
            userViewWind.DataContext = current;

            //string encryptLogin = EncryptionHelper.Encrypt(CurrentUser.Login, EncryptionHelper.encryptionKey);

            //string userJsonData = JsonSerializer.Serialize(encryptLogin); // передать сюда текущий логин пользователя из User Personal

            string encryptLogin = EncryptionHelper.Encrypt(CurrentUser.Login, EncryptionHelper.encryptionKey);

           
        }

        public async void GetUserTickets(object o)
        {
            string encryptLogin = EncryptionHelper.Encrypt(CurrentUser.Login, EncryptionHelper.encryptionKey);

            string jsonBooking = JsonSerializer.Serialize(encryptLogin);
            string jsonResult = await HttpClientData.SendDataUserTicketAsync(jsonBooking);
            List<AvaliableSeat> seatList = JsonSerializer.Deserialize<List<AvaliableSeat>>(jsonResult);
            //RouteViewModel routeView = new RouteViewModel(seatList, CurrentUser);

            AvaliableSeats1 = seatList;

            
        }

    }
}
