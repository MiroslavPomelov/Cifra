
using MailKit.Net.Smtp;
using MimeKit;

namespace POB2213_Sender
{
    public partial class MainForm : Form
    {
        private void SendMassageInMailRu()
        {
            SmtpClient smtp = new SmtpClient();

            smtp.Connect("smtp.mail.ru", 465, true);
            smtp.Authenticate();

            BodyBuilder builder = new BodyBuilder();
        }
    }
}
