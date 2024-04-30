using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using Train_ticket.AppWindow;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.Model.Data.DataBaseEntities;
using Train_ticket.Services;
using Train_ticket.View;
using Train_ticket.ViewModel.BaseViewModel;

namespace Train_ticket.ViewModel
{
    internal class RouteViewModel : ViewModelBase
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

        private List<Seat> _seats;
        public List<Seat> Seats
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

        public ICommand CloseAppCommand { get; }
        public ICommand BackToUserViewCommand { get; }
        public ICommand BuyTicketCommand { get; }

        public RouteViewModel(List<AvaliableSeat> data, List<Seat> seats)
        {
            CloseAppCommand = new LambdaCommand(CloseApp);
            BackToUserViewCommand = new LambdaCommand(BackToUserView);
            BuyTicketCommand = new LambdaCommand(BuyTicket);

            AvaliableSeats = data;
            Seats = seats;

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
            User_Personal user_Personal = new User_Personal();
            user_Personal.Show();
            var windows = Application.Current.Windows.OfType<RouteView>();
            foreach (var window in windows)
            {
                window.Close();
            }
        }

        public void BuyTicket(object o)
        {
            //AvaliableSeat принять сущность seat и в ней изменить данные, после чего отправить
            //Seat seat = {  };

            //Сереализовать сущность в дсон строку
            //string userJsonData = JsonSerializer.Serialize(seat);

            //_ = HttpClientData.SendDataBookingTickethAsync(userJsonData);
        }
    }
}
