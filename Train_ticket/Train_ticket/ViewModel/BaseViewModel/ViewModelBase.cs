using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Train_ticket.Model.Data.DataBaseEntities;

namespace Train_ticket.ViewModel.BaseViewModel
{
    public class ViewModelBase : INotifyPropertyChanged
    {
        private User _currentUser;
        public User CurrentUser
        {
            get { return _currentUser; }
            set
            {
                if (value != _currentUser)
                {
                    _currentUser = value;
                    OnPropertyChanged(nameof(CurrentUser));
                }
            }
        }



        public event PropertyChangedEventHandler PropertyChanged;

        public virtual void OnPropertyChanged([CallerMemberName] string propertyChanged=null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyChanged));
        }
    }
}
