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
                new Person("Иван", 32, 183.6, 84.825),
                 new Person("Анна", 28, 165.2, 55.5),
                  new Person("Петр", 45, 175.0, 75.2),
                   new Person("Мария", 22, 170.5, 62.7),
                    new Person("Алексей",38, 178.3, 80.1),
                     new Person("Елена", 31, 160.0, 58.9),
                      new Person("Сергей", 29, 176.8, 73.0),
                       new Person("Ольга", 27, 168.7, 60.3),
                        new Person("Дмитрий", 33, 181.2, 89.4),
                         new Person("Наталья", 35, 172.4, 68.7)

            };

            DataGridDGW.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            DataGridDGW.DataSource = people;
        }
    }
}