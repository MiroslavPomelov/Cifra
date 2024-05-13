using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace WpfApp1
{
    public class MainViewModel : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        private ObservableCollection<Person> _people;
        public ObservableCollection<Person> People
        {
            get { return _people; }
            set
            {
                _people = value;
                OnPropertyChanged();
            }
        }

        private ObservableCollection<Person> _filteredPeople;
        public ObservableCollection<Person> FilteredPeople
        {
            get { return _filteredPeople; }
            set
            {
                _filteredPeople = value;
                OnPropertyChanged();
            }
        }

        private Person _selectedPerson;
        public Person SelectedPerson
        {
            get { return _selectedPerson; }
            set
            {
                _selectedPerson = value;
                OnPropertyChanged();
            }
        }

        public MainViewModel()
        {
            // Инициализация данных
            People = new ObservableCollection<Person>
            {
                new Person("John", 25, "Developer"),
                new Person("Alice", 30, "Manager"),
                new Person("Bob", 40, "Engineer")
            };

            FilteredPeople = new ObservableCollection<Person>();
        }

        public void FilterData()
        {
            if (SelectedPerson != null)
            {
                // Очищаем фильтрованные данные
                FilteredPeople.Clear();

                // Добавляем выбранный объект в фильтрованные данные
                FilteredPeople.Add(SelectedPerson);
            }
        }

        protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
