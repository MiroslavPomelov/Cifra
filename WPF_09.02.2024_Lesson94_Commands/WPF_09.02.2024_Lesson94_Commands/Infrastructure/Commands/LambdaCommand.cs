using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPF_09._02._2024_Lesson94_Commands.Infrastructure.Commands.BaseCommand;

namespace WPF_09._02._2024_Lesson94_Commands.Infrastructure.Commands
{
    public class LambdaCommand : Command
    {
        private Action<object> _execute;
        private Func<object, bool> _canExecute;

        public LambdaCommand(Action<object> execute, Func<object, bool> canExecute)
        {
            _execute = execute;
            _canExecute = canExecute;
        }

        public override bool CanExecute(object? parameter) => true;
      

        public override void Execute(object? parameter)
        {
            _execute(parameter);
        }


    }
}
