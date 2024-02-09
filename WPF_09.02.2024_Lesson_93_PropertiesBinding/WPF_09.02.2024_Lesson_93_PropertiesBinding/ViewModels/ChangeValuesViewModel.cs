using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPF_09._02._2024_Lesson_93_PropertiesBinding.Models;
using WPF_09._02._2024_Lesson_93_PropertiesBinding.Services;
using WPF_09._02._2024_Lesson_93_PropertiesBinding.ViewModels.Base;

namespace WPF_09._02._2024_Lesson_93_PropertiesBinding.ViewModels
{
    public class ChangeValuesViewModel : ViewModelBase
    {
        private string _textBoxText;
        public string TextBoxText
        {
            get => _textBoxText;
            set
            {
                if (_textBoxText != value)
                {
                    _textBoxText = value;
                    OnPropertyChanged(nameof(TextBoxText));
                    LoadUserInfo();
                }
            }
        }

        private User _userData;
        public User UserData
        {
            get => _userData;
            set
            {
                if (_userData != value)
                {
                    _userData = value;
                    OnPropertyChanged(nameof(UserData));
                }
            }
        }

        private void LoadUserInfo()
        {
            UserData = UserListCreator.GetUser(int.Parse(TextBoxText));
        }
    }
}
