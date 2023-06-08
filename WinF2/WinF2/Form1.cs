namespace WinF2
{
    public partial class Form1 : Form
    {
        decimal startPrice;
        string result = "Комплектация: ";
        public Form1()
        {
            InitializeComponent();
            startPrice = 2500000;
            labelname.Text += startPrice.ToString("C");
        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
            if (checkBox_electro.Checked)
            {
                startPrice += decimal.Parse(tb_electro.Text);
                result += "\n" + checkBox_electro.Text + ":" + tb_electro.Text;
                label_result.Text = result;
            }
        }

        private void checkBox_abs_CheckedChanged(object sender, EventArgs e)
        {
            if (checkBox_abs.Checked)
            {
                startPrice += decimal.Parse(tb_abs.Text);
                result += "\n" + checkBox_abs.Text + ":" + tb_abs.Text;
                label_result.Text = result;
            }
        }

        private void checkBox_cond_CheckedChanged(object sender, EventArgs e)
        {
            if (checkBox_cond.Checked)
            {
                startPrice += decimal.Parse(tb_cond.Text);
                result += "\n" + checkBox_cond.Text + ":" + tb_cond.Text;
                label_result.Text = result;
            }
        }
    }
}