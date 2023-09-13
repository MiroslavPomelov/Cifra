using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace POB2213_Sender
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();

            domenCB.SelectedIndex = 0;
        }

        private void sendBtn_Click(object sender, EventArgs e)
        {
            if (domenCB.SelectedIndex == 0)
            {
                SendMassageInMailRu();
            }
        }

    }
}
