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

namespace WPF_02._02._2024
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            //var gradientBrush = new RadialGradientBrush(Colors.Black, Colors.Blue);
            //Resources["MyBrush"] = gradientBrush;

            Style oldStyle = (Style)Resources["recStyle"];

            Style newStyle = new Style(typeof(Rectangle), oldStyle);

            Setter[] setters =
            {
                new Setter(WidthProperty, 400.00),
                new Setter(HeightProperty, 400.00),
                new Setter(System.Windows.Shapes.Rectangle.FillProperty, new SolidColorBrush(Colors.Purple))
            };

            foreach (var item in setters)
            {
                newStyle.Setters.Add(item);
            }

            myRec.Style = newStyle;
        }
    }
}
