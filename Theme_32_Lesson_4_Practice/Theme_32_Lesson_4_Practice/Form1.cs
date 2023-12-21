using System;

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
            List<Passenger> temp = new List<Passenger>();
            List<Passenger> survived = new List<Passenger>();

            using (TitanicDBContext dBContext = new TitanicDBContext())
            {
                temp = DataBaseWorker.Read();
                if (SurvivedCB.Checked)
                {
                    survived.Clear();
                    foreach (var item in temp)
                    {
                        if (item.Survived == 1)
                        {
                            survived.Add(item);
                        }
                    }
                    TitanicDataDGV.DataSource = survived;
                }
                if (AgeCb.Checked)
                {
                    survived.Clear();
                    foreach (var item in temp)
                    {
                        if (item.Age > 17)
                        {
                            survived.Add(item);
                        }
                    }
                    TitanicDataDGV.DataSource = survived;
                }
                if (ThirdClassCB.Checked)
                {
                    survived.Clear();
                    foreach (var item in temp)
                    {
                        if (item.Pclass == 3)
                        {
                            survived.Add(item);
                        }
                    }
                    TitanicDataDGV.DataSource = survived;
                }
                if (SurvivedCB.Checked && AgeCb.Checked)
                {
                    survived.Clear();
                    foreach (var item in temp)
                    {
                        if (item.Survived == 1 && item.Age > 17)
                        {
                            survived.Add(item);
                        }
                    }
                    TitanicDataDGV.DataSource = survived;
                }
                if (SurvivedCB.Checked && AgeCb.Checked && ThirdClassCB.Checked)
                {
                    survived.Clear();
                    foreach (var item in temp)
                    {
                        if (item.Survived == 1 && item.Age > 17 && item.Pclass == 3)
                        {
                            survived.Add(item);
                        }
                    }
                    TitanicDataDGV.DataSource = survived;
                }
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            TitanicDataDGV.DataSource = DataBaseWorker.Read();
        }
    }
}