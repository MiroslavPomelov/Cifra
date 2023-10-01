

using MailKit.Net.Smtp;
using MimeKit;

namespace Sender2
{
    public partial class SMTPSender
    {
        private void SendMassageInMailRu()
        {
            SmtpClient smtp = new SmtpClient();

            //merosss1@mail.ru
            //46SerKatMir
            //dhFzcvAR7PDxvqaiAiFz

            smtp.Connect("smtp.mail.ru", 465, true);
            smtp.Authenticate(Properties.Settings.Default.UserName, Properties.Settings.Default.UserPassword);

            BodyBuilder builder = new BodyBuilder()
            {
                TextBody = textTB.Text,
                HtmlBody = textTB.Text
            };

            MimeMessage message = new MimeMessage()
            {
                Subject = subjectTB.Text,
                Body = builder.ToMessageBody()
            };

            message.To.Add(MailboxAddress.Parse(toTB.Text));
            message.From.Add(new MailboxAddress("MiroslavPo", "merosss1@mail.ru"));

            smtp.Send(message);
        }
    }
}
