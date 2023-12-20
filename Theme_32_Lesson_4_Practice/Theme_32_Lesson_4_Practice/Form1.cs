namespace Theme_32_Lesson_4_Practice
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            //TimeL.Name = DateTime.Now.ToString();
        }


        private void ResultBTN_Click(object sender, EventArgs e)
        {
            List<Titanic> titanicList = new List<Titanic>();

            using (TitanicDBContext dBContext = new TitanicDBContext())
            {
                titanicList = dBContext.Titanics.ToList();
                foreach (var person in titanicList)
                {
                    if (SurvivedCB.Checked && person.Survived == 1)
                    {
                        TitanicDataDGV.DataSource = person;
                    }
                    //TitanicDataDGV.Rows.Add($"{person.PassengerId}, {person.Name}, {person.Age}");
                }
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
}