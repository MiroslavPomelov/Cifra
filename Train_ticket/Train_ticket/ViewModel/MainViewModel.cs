using System;
using Train_ticket.Core;

namespace Train_ticket.ViewModel
{
    internal class MainViewModel : ObservableObject
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
            get { return _currentView; }
            set
            {
                _currentView = value;
                OnPropertyChanged();
            }
        }


        public MainViewModel()
        {
            UserVm = new UserViewModel();
            BuyTicketVM = new BuyTicketViewModel();
            YourTicketsVM = new YourTicketsViewModel();

            CurrentView = UserVm;

            UserViewCommand = new RelayCommand(o =>
            {
                CurrentView = UserVm;
            });


            BuyTicketViewCommand = new RelayCommand(o =>
            {
                CurrentView = BuyTicketVM;
            });

            YourTicketsViewCommand = new RelayCommand(o =>
            {
                CurrentView = YourTicketsVM;
            });

        }
    }
}
