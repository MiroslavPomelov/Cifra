namespace Secundomer
{
    public partial class Form1 : Form
    {
        int m, s, ms;
        string strM, strS, strMS;

        private void btStart_Click(object sender, EventArgs e)
        {
            if (timer1.Enabled)
            {
                timer1.Enabled = false;
                btStart.Text = "Пуск";
                btReset.Enabled = true;
            }
            else
            {
                timer1.Enabled = true;
                btStart.Text = "Стоп";
                btReset.Enabled = false;
            }
        }

        private void btReset_Click(object sender, EventArgs e)
        {
            m = s = ms = 0;
            strM = "00";
            strS = "00";
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            string res = String.Empty;
            s++;
            if (s == 60)
            {
                m++;
                s = 0;
            }
            if (m < 60)
            {
                if (s<10)
                {
                    res = "0"+m + ":" + "0" + s;
                }
                else
                {
                    res = "0" + m + ":" + "0" + s;
                }
            }
            if (s < 10)
            {
                res = m + ":" + "0" + s;
            }
            else
            {
                res = m + ":" + s;
            }

            lbSeconds.Text = res;
        }

        public Form1()
        {
            InitializeComponent();
            m = s = ms = 0;
            strM = "00";
            strS = "00";
            timer1.Interval = 100;
        }
    }
}