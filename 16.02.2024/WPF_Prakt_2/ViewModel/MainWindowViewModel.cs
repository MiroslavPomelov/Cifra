using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPF_Prakt_2.Models;
using WPF_Prakt_2.Services;
using WPF_Prakt_2.ViewModel.Base;

namespace WPF_Prakt_2.ViewModel
{
    public class MainWindowViewModel : BaseViewModel
    {
        private List<Product> _listProduct;

        public List<Product> ListProduct
        {
            get
            {
                return _listProduct;
            }
            set
            {
                if (_listProduct != value)
                {
                    _listProduct = value;
                    OnPropertyChanges(nameof(ListProduct));
                }
            }
        }

        public MainWindowViewModel()
        {
            ListProduct = ProductListCreator.GetProducts();
        }
    }
}
