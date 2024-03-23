using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.DirectoryServices.ActiveDirectory;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WPF_Prakt
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        public Data MyData { get; set; }

        public MainWindow()
        {
            InitializeComponent();

            MyData = new Data();
            MainStack.DataContext = MyData;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            MyData.MyCollection.Add(new Person(NameTB.Text, SurnameTB.Text, AgeTB.Text));
        }
    }

    public class Data : INotifyPropertyChanged
    {
        private ObservableCollection<Person> _myCollection;
        public ObservableCollection<Person> MyCollection
        {
            get { return _myCollection; }
            set
            {
                if (_myCollection != value)
                {
                    _myCollection = value;
                    OnPropertyChanged(nameof(MyCollection));
                }
            }
        }

        public Data()
        {
            MyCollection = new ObservableCollection<Person>();
        }

        public event PropertyChangedEventHandler? PropertyChanged;

        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }

    public class Person
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }

        public Person(string name, string surname, string age)
        {
            Name = name;
            Surname = surname;
            Age = int.Parse(age);
        }
    }
}
