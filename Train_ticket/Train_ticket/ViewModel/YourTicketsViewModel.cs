using System;
using System.Collections.Generic;
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
        public ICommand GetUserTicketsCommand { get; }
        public YourTicketsViewModel(List<AvaliableSeat> data,User current)
        {
            GetUserTicketsCommand = new LambdaCommand(GetUserTickets);
            CurrentUser = current;
            YourTicketsView userViewWind = new();
            userViewWind.DataContext = current;

            string encryptLogin = EncryptionHelper.Encrypt(CurrentUser.Login, EncryptionHelper.encryptionKey);

            string userJsonData = JsonSerializer.Serialize(encryptLogin); // передать сюда текущий логин пользователя из User Personal

            _ = HttpClientData.SendDataUserTicketAsync(userJsonData, current);

        }

        public void GetUserTickets(object o)
        {
                       
        }

    }
}
