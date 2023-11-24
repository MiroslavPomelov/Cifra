using CsvHelper;
using System.Globalization;
using CsvHelper.Configuration;
using System.Windows.Forms;

namespace CSVPraktika
{
    public partial class Form1 : Form
    {
        private List<Goods> _goods = new List<Goods>();

        string[] files = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.csv*", SearchOption.AllDirectories);



        //string[] files = new string[];
        public Form1()
        {
            InitializeComponent();
        }

        private void ShowBTN_Click(object sender, EventArgs e)
        {

            UploadStudents();
        }

        public void UploadStudents()
        {
            Goods goods = new Goods();
            StreamReader reader = new StreamReader("inventoryControl.csv");

            CsvConfiguration csvConfiguration = new CsvConfiguration(CultureInfo.InvariantCulture);

            CsvReader csvReader = new CsvReader(reader, csvConfiguration);
            _goods = csvReader.GetRecords<Goods>().ToList();
            reader.Close();

            ListDGV.DataSource = _goods;
        }

        private void ListDGV_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Delete)
            {
                if (ListDGV.SelectedCells.Count > 0)
                {
                    ListDGV.SelectedCells[0].Value = null;
                }
            }

            if (e.KeyCode == Keys.Tab)
            {
                if (ListDGV.SelectedCells.Count > 0)
                {
                    //ListDGV.Rows.RemoveAt(ListDGV.SelectedCells[0].RowIndex);
                    _goods.RemoveAt(ListDGV.SelectedCells[0].RowIndex);
                }
            }
        }

        private void SaveBTN_Click(object sender, EventArgs e)
        {
            using (StreamWriter writer = new StreamWriter("Example.csv")) 
            {
                CsvWriter csvWriter = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture));  

                List<Goods> people = new List<Goods>()
                {

                };


                csvWriter.WriteRecords(people); 
            }

        }
        private void button1_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < files.Length; i++)
            {
                comboBox1.Items.Add(Path.GetFileName(files[i]));
            }
        }
    }
}