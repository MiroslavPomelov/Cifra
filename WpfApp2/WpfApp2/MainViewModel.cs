using Newtonsoft.Json;
using System.Collections.ObjectModel;
using System.ComponentModel;

namespace WpfApp2
{
    internal class MainViewModel : INotifyPropertyChanged
    {
        public ObservableCollection<Item> Items { get; set; }
        public RelayCommand SaveCommand { get; set; }

        public MainViewModel()
        {
            Items = new ObservableCollection<Item>
            {
                new Item { Name = "Item 1" },
                new Item { Name = "Item 2" },
                new Item { Name = "Item 3" }
            };

            SaveCommand = new RelayCommand(Save, CanSave);
        }

        private bool CanSave(object obj)
        {
            return Items.Any(item => item.IsChecked);
        }

        private void Save(object obj)
        {
            var selectedItems = Items.Where(item => item.IsChecked).Select(item => item.Name);
            var json = JsonConvert.SerializeObject(selectedItems);
            // Дальнейшая обработка JSON строки...
        }

        public event PropertyChangedEventHandler PropertyChanged;

    }
}
