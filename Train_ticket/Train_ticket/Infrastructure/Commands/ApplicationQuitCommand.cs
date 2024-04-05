using System;
using System.Windows;
using Train_ticket.Infrastructure.Commands.BaseCommand;


namespace Train_ticket.Infrastructure.Commands
{
    public class ApplicationQuitCommand : Command
    {

        public override bool CanExecute(object parameter) => true;

        public override void Execute(object parameter)
        {
            Application.Current.Shutdown();
        }

    }
}
