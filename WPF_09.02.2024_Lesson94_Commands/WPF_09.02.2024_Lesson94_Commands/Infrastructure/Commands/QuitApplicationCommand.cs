using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using WPF_09._02._2024_Lesson94_Commands.Infrastructure.Commands.BaseCommand;

namespace WPF_09._02._2024_Lesson94_Commands.Infrastructure.Commands
{
    public class QuitApplicationCommand : Command
    {
        public override bool CanExecute(object? parameter) => true;

        public override void Execute(object? parameter)
        {
            Application.Current.Shutdown();
        }
    }
}
