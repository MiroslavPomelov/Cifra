using OfficeOpenXml;

namespace DGW_Excel_Operations
{
    public partial class Form1 : Form
    {
        List<Student> students1 = ExcelWorker.OpenExcel();
        public Form1()
        {
            
            InitializeComponent();
        }
    }
}