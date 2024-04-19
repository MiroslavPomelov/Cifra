using MaterialDesignThemes.Wpf;
using System;
using System.Windows.Input;
using Train_ticket.Core;
using Train_ticket.Infrastructure.Commands;
using Train_ticket.Model.Data.DataBaseEntities;
using Train_ticket.View;
using Train_ticket.ViewModel.BaseViewModel;


namespace Train_ticket.ViewModel
{
    internal class UserViewModel : ViewModelBase
    {


        public ICommand ShowUserDataCommand { get; }

        public UserViewModel(User current)
        {
            ShowUserDataCommand = new LambdaCommand(ShowUserData);
            CurrentUser = current;
            UserView userViewWind = new();
            userViewWind.DataContext = current;
        }

        public void ShowUserData(object o)
        {
            
        }
    }
}
