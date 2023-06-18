using System.Data;

namespace Timer
{
    public partial class Form1 : Form
    {
        int m, s;

        public Form1()
        {
            InitializeComponent();
            timer1.Interval = 1000;
        }

        private void btStart_Click(object sender, EventArgs e)
        {
            m = Convert.ToInt32(lb0.Text);
            s = Convert.ToInt32(lb2.Text);


            if (btStart.Text == "Старт")
            {
                btStart.Text = "Стоп";
                timer1.Start();
            }
            else
            {
                m = Convert.ToInt32(tbM.Text);
                s = Convert.ToInt32(tbS.Text);
                btStart.Text = "Старт";
                timer1.Stop();
            }
        }


        private void btReset_Click(object sender, EventArgs e)
        {
            timer1.Stop();
            lb0.Text = "0";
            lb2.Text = "0";
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            s--;
            if (s == -1)
            {
                m--;
                s = 59;
            }

            if (m == 0 && s == 0)
            {
                timer1.Stop();
                MessageBox.Show("Время вышло!");
            }

            lb0.Text = Convert.ToString(m);
            lb2.Text = Convert.ToString(s);
        }
    }
}