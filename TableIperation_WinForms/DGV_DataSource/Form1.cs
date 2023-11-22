namespace DGV_DataSource
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void UploadDataBTN_Click(object sender, EventArgs e)
        {
            UploadData();
        }

        private void UploadData()
        {
            List<Person> people = new List<Person>()
            {
                new Person("����", 32, 183.6, 84.825),
                 new Person("����", 28, 165.2, 55.5),
                  new Person("����", 45, 175.0, 75.2),
                   new Person("�����", 22, 170.5, 62.7),
                    new Person("�������",38, 178.3, 80.1),
                     new Person("�����", 31, 160.0, 58.9),
                      new Person("������", 29, 176.8, 73.0),
                       new Person("�����", 27, 168.7, 60.3),
                        new Person("�������", 33, 181.2, 89.4),
                         new Person("�������", 35, 172.4, 68.7)

            };

            DataGridDGW.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            DataGridDGW.DataSource = people;
        }
    }
}