namespace ThreadingDemostration
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void FirstStartBTN_Click(object sender, EventArgs e)
        {
            Thread load = new Thread(LaunchFirstThread);
            load.Start();
        }


        private void SecondStartBTN_Click(object sender, EventArgs e)
        {
            Thread load = new Thread(LaunchSecondThread);
            load.Start();
        }

        public void LaunchFirstThread()
        {
            for (int i = 0; i <= 100; i++)
            {
                FirstProccesPB.Value = i;
                Thread.Sleep(250);
                if (i == 30)
                {
                    Control control = new Label();
                    control.Location = new System.Drawing.Point(12, 170);

                }
            }
        }

        public void LaunchSecondThread()
        {
            for (int i = 0; i <= 100; i++)
            {
                SecondProccesPB.Value = i;
                Thread.Sleep(500);
            }
        }
    }
}