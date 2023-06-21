using System.Data;

namespace Timer
{
    public partial class Form1 : Form
    {
        int m, s;
        bool b = true;

        public Form1()
        {
            InitializeComponent();
            btStart.Click += btStart_Click;
            btStart.Text = "Старт";
            timer1.Interval = 1000;
            tbM.MaxLength = 2;
            tbS.MaxLength = 2;
        }

        void btStop_Click(object sender, EventArgs e)
        {
            timer1.Stop();
            m = Convert.ToInt32(lb0.Text);
            s = Convert.ToInt32(lb2.Text);
            btReset.Enabled = true;

            btStart.Text = "Старт";
            btStart.Click -= new EventHandler(btStop_Click);
            btStart.Click += new EventHandler(btStart_Click);
        }

        private void btStart_Click(object sender, EventArgs e)
        {
            if (b)
            {
                try
                {
                    m = Convert.ToInt32(tbM.Text);
                    s = Convert.ToInt32(tbS.Text);
                    b = false;
                }
                catch (Exception)
                {
                    MessageBox.Show("Введите целое число!");
                    timer1.Stop();
                    throw;
                }
            }
            timer1.Start();
            btReset.Enabled = false;

            btStart.Text = "Стоп";
            btStart.Click -= new EventHandler(btStart_Click);
            btStart.Click += new EventHandler(btStop_Click);
        }


        private void btReset_Click(object sender, EventArgs e)
        {
            timer1.Stop();
            lb0.Text = "0";
            lb2.Text = "0";
            b = true;
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
            lb2.Text = Convert.ToString(s + 1);
        }

        private void tbM_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!Char.IsDigit(ch) && ch != 8)
            {
                e.Handled = true;
            }
        }

        private void tbS_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!Char.IsDigit(ch) && ch != 8)
            {
                e.Handled = true;
            }
        }
    }
}
