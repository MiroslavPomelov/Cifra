﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using Train_ticket.AppWindow;
using Train_ticket.Core;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.Model.Data.DataBaseEntities;
using Train_ticket.Services;
using Train_ticket.Services.WEBServices;
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
        public User User {  get; set; }

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
        

        public UserPersonalViewModel(User previous)
        {
            CurrentUser = previous;            
            CurrentView = new UserViewModel(CurrentUser);
            CloseAppCommand = new LambdaCommand(CloseApp);
            ExitUserPersonalCommand = new LambdaCommand(ExitUserPersonal);
            ViewUserWindowCommand = new LambdaCommand(ViewUserWindow);
            ViewBuyTicketWindowCommand = new LambdaCommand(ViewBuyTicketWindow);
            ViewYourTicketsWindowCommand = new LambdaCommand(ViewYourTicketsWindow);


            User_Personal nextWindow = new User_Personal();

            var windows = Application.Current.Windows.OfType<Window>();
            foreach (var window in windows)
            {
                window.Close();
                nextWindow = new User_Personal();
            }

           
            nextWindow.DataContext = this;
            nextWindow.Show();

        }
        public void CloseApp(object o)
        {
            Application.Current.Shutdown();
        }

        public void ExitUserPersonal(object o)
        {
            AuthorizationWindow authorizationWindow = new AuthorizationWindow();
            authorizationWindow.Show();
            var windows = Application.Current.Windows.OfType<User_Personal>();
            foreach ( var window in windows)
            {
                window.Close();
            }
        }

        public void ViewUserWindow(object o)
        {
            UserVm = new UserViewModel(CurrentUser);

            CurrentView = UserVm;

            UserViewCommand = new RelayCommand(o =>
            {
                CurrentView = UserVm;
            });
        }

        public void ViewBuyTicketWindow(object o)
        {
            BuyTicketVM = new BuyTicketViewModel(CurrentUser);

            CurrentView = BuyTicketVM;

            BuyTicketViewCommand = new RelayCommand(o =>
            {
                CurrentView = BuyTicketVM;
            });
        }

        public void ViewYourTicketsWindow(object o)
        {
            string encryptLogin = EncryptionHelper.Encrypt(CurrentUser.Login, EncryptionHelper.encryptionKey);

            string userJsonData = JsonSerializer.Serialize(encryptLogin);

            HttpClientData request = new();

            //List<AvaliableSeat> data = request.GETDataAsync<List<AvaliableSeat>>(userJsonData, "history").Result;

            YourTicketsVM = new YourTicketsViewModel(CurrentUser);

            CurrentView = YourTicketsVM;

            YourTicketsViewCommand = new RelayCommand(o =>
            {
                CurrentView = YourTicketsVM;
            });
        }
    }
}
