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
using System.Windows.Shapes;
using Train_ticket.ViewModel;

namespace Train_ticket.View
{
    /// <summary>
    /// Логика взаимодействия для RouteView.xaml
    /// </summary>
    public partial class RouteView : Window
    {
        public RouteView()
        {
            InitializeComponent();
            DataContext = new RouteView();
        }

        private void DataGrid_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            // Обработчик события изменения выбора в первом DataGrid
            ((RouteViewModel)DataContext).FilterData();
        }
    }
}
