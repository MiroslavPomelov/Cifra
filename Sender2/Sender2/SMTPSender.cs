using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Sender2
{
    public partial class SMTPSender : Form
    {
        public SMTPSender()
        {
            InitializeComponent();

            serversCB.SelectedIndex = 0;
        }

        private void textTB_TextChanged(object sender, EventArgs e)
        {

        }

        private void sendmassageBtn_Click(object sender, EventArgs e)
        {
            if (serversCB.SelectedIndex == 0)
            {
                //SendMassageInYandex();

            }
            else if (serversCB.SelectedIndex == 1)
            {
                SendMassageInMailRu();
            }
        }
    }
}
