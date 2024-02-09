using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using WPF_09._02._2024_Lesson94_Commands.Infrastructure.Commands;
using WPF_09._02._2024_Lesson94_Commands.ViewModels.BaseViewModel;

namespace WPF_09._02._2024_Lesson94_Commands.ViewModels
{
    public class MainViewModel : ViewModel
    {
        private string _text;


        public string Text
        {
            get => _text;
            set
            {
                if (_text != value)
                {
                    _text = value;
                    OnPropertyChanged(nameof(Text));
                }
            }
        }

        public ICommand ChangeTextCommand { get; }

        public MainViewModel()
        {
            ChangeTextCommand = new LambdaCommand(OnChangeTextExecute, /*CanChangeTextexecute*/ (object obj) => true);
        }

        //private bool CanChangeTextexecute(object obj) => true;

        private void OnChangeTextExecute(object obj)
        {
            Text = "asdddddddaaaaaaddwwwwwww123333333333333122223eeeeeee12312";
        }
    }
}
