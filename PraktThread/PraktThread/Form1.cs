namespace PraktThread
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void StartBTN_Click(object sender, EventArgs e)
        {

        }

        private void LeftMoveBTN_Click(object sender, EventArgs e)
        {
            int param = PlayerLBL.Location.X;
            param -= 10;
            PlayerLBL.Location = new System.Drawing.Point(param, PlayerLBL.Location.Y);
            Thread thread = new Thread(Falling);
        }

        private void RightMoveBTN_Click(object sender, EventArgs e)
        {
            int param = PlayerLBL.Location.X;
            param += 10;
            PlayerLBL.Location = new System.Drawing.Point(param, PlayerLBL.Location.Y);
            Thread thread = new Thread(Falling);
        }

        private void Form1_Load(object sender, EventArgs e)
        {
           
        }

        public void Falling()
        {
            int param = label1.Location.Y;
            param -= 10;
            for (int i = 0; i < 100; i++)
            {
                label1.Location = new System.Drawing.Point(param, label1.Location.Y);
                label2.Location = new System.Drawing.Point(label1.Location.X, i);
                label3.Location = new System.Drawing.Point(label1.Location.X, i);
                label4.Location = new System.Drawing.Point(label1.Location.X, i);
                Thread.Sleep(200);
            }
        }
    }
}