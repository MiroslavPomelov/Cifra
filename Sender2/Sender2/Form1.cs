namespace Sender2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void enterBtn_Click(object sender, EventArgs e)
        {
            if (usernameTB.Text == "UserOne" && userpassTB.Text == "12345")
            {
                Hide();
                SMTPSender smtpSender = new SMTPSender();
                smtpSender.Show();
            }
        }
    }
}