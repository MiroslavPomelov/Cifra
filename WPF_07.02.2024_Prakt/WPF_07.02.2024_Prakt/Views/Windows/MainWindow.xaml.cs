using System;
using System.Collections.Generic;
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
using WPF_07._02._2024_Prakt.Services;
using WPF_07._02._2024_Prakt.ViewModels;

namespace WPF_07._02._2024_Prakt
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        PassengersViewModel PassengersViewModel = new PassengersViewModel();
        public MainWindow()
        {
            InitializeComponent();
            DataContext = PassengersViewModel;

        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            foreach (var item in CSVFileReader.CSVFileReadering())
            {
                PassengersViewModel.Passangers.Add(item);
            }
        }
    }
}
