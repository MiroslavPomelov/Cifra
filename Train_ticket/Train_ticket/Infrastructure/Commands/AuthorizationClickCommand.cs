using MaterialDesignThemes.Wpf;
using System;
using System.Threading.Channels;
using System.Windows;
using System.Windows.Media;
using Train_ticket.AppWindow;
using Train_ticket.Infrastructure.Commands.BaseCommand;

namespace Train_ticket.Infrastructure.Commands
{
    public class AuthorizationClickCommand : Command
    {
        public override bool CanExecute(object parameter) => true;

        public override void Execute(object parameter)
        {
            AuthorizationWindow authorizationWindow = new AuthorizationWindow();
            authorizationWindow.Show();
        }
    }
}
