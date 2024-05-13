using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Train_ticket.AppWindow;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.Model.Data.DataBaseEntities;
using Train_ticket.Services;
using Train_ticket.Services.WEBServices;
using Train_ticket.View;
using Train_ticket.ViewModel.BaseViewModel;

namespace Train_ticket.ViewModel
{
    internal class RouteViewModel : ViewModelBase, INotifyPropertyChanged
    {
        private List<AvaliableSeat> _avaliableSeats;
        public List<AvaliableSeat> AvaliableSeats
        {
            get => _avaliableSeats;
            set
            {
                if (_avaliableSeats != value)
                {
                    _avaliableSeats = value;
                    OnPropertyChanged(nameof(AvaliableSeats));
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

        private Seat _seat;
        public Seat Seat
        {
            get => _seat;
            set
            {
                if (_seat != value)
                {
                    _seat = value;
                    OnPropertyChanged(nameof(Seat));
                }
            }
        }

        private ObservableCollection<AvaliableSeat> _filteredSeats;
        public ObservableCollection<AvaliableSeat> FilteredSeats
        {
            get { return _filteredSeats; }
            set
            {
                _filteredSeats = value;
                OnPropertyChanged();
            }
        }

        public ICommand CloseAppCommand { get; }
        public ICommand BackToUserViewCommand { get; }
        public ICommand BuyTicketCommand { get; }

        public RouteViewModel(List<AvaliableSeat> data, User current)
        {
            //AvaliableSeat seat = new AvaliableSeat(1, "asdsad", "asdsad", new DateTime(2024,05,10), new DateTime(2024, 05, 10), "asdsad",22,2, "asdsad",7,100,1, "asdsad", "asdsad");

            CloseAppCommand = new LambdaCommand(CloseApp);
            BackToUserViewCommand = new LambdaCommand(BackToUserView);
            BuyTicketCommand = new LambdaCommand(BuyTicket);
            CurrentUser = current;

            List<AvaliableSeat> avaliableSeats = new();

            avaliableSeats.Add(data.First());
            AvaliableSeats = avaliableSeats;
            Seats = data;

            //string userJsonData = JsonSerializer.Serialize(seats);

            //_ = HttpClientData.SendDataBookingTickethAsync(userJsonData);

            RouteView routeView = new RouteView();
            routeView.DataContext = this;
            routeView.Show();
        }

        public void CloseApp(object o)
        {
            Application.Current.Shutdown();
        }

        public void BackToUserView(object o)
        {
            //User_Personal user_Personal = new User_Personal();
            //user_Personal.Show();
            //var windows = Application.Current.Windows.OfType<RouteView>();
            //foreach (var window in windows)
            //{
            //    window.Close();
            //}

            UserPersonalViewModel next = new(CurrentUser);
        }

        public void BuyTicket(object o)
        {
            List<AvaliableSeat> allSeats = Seats.ToList();
            List<AvaliableSeat> bookingSeats = allSeats.Where(x => x.Booked == 1).ToList();

            string encryptLogin = EncryptionHelper.Encrypt(CurrentUser.Login, EncryptionHelper.encryptionKey);

            foreach (var item in bookingSeats)
            {
                item.Login = encryptLogin;
                item.Data = EncryptionHelper.Encrypt(item.Data, EncryptionHelper.encryptionKey);
            }

            string jsonBooking = JsonSerializer.Serialize(bookingSeats);

            _ = HttpClientData.SendDataBookingTickethAsync(jsonBooking);

            //User current = authData.GETDataAsync<User>(userJsonData, "auth").Result;
            UserPersonalViewModel next = new(CurrentUser);
        }

        public void FilterData()
        {
            if (AvaliableSeats != null)
            {
                // Очищаем фильтрованные данные
                FilteredSeats.Clear();

                // Добавляем выбранный объект в фильтрованные данные
                foreach (var item in AvaliableSeats)
                {
                    FilteredSeats.Add(item);
                }
            }
        }
    }
}
