using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPF_07._02._2024_Prakt.Model;
using WPF_07._02._2024_Prakt.Services;
using WPF_07._02._2024_Prakt.ViewModels.Base;

namespace WPF_07._02._2024_Prakt.ViewModels
{
    public class PassengersViewModel : ViewModelBase
    {
        private ObservableCollection<TitanicPassanger> _passangers;

        public ObservableCollection<TitanicPassanger> Passangers
        {
            get { return _passangers; }
            set
            {
                if (_passangers != value)
                {
                    _passangers = value;
                    OnPropertyChanged(nameof(Passangers));
                    //GetCurrenPassanger();
                }
            }
        }

        private TitanicPassanger _selectedPassanger;
        public TitanicPassanger SelectedPassanger
        {
            get { return _selectedPassanger; }
            set
            {
                if (_selectedPassanger != value)
                {
                    _selectedPassanger = value;
                    OnPropertyChanged(nameof(SelectedPassanger));
                }
            }
        }


        public PassengersViewModel()
        {
            Passangers = new ObservableCollection<TitanicPassanger>();
        }

        //private void GetCurrenPassanger()
        //{
        //    SelectedPassanger = CSVFileReader.CSVFileReadering();
        //}
    }
}
