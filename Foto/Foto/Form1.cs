namespace Foto
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            btOK.Enabled = false;
        }

        private void tbCount_TextChanged(object sender, EventArgs e)
        {
            if (tbCount.Text.Length != 0)
            {
                btOK.Enabled = true;
            }
            else
            {
                btOK.Enabled = false;
            }
        }

        private void btOK_Click(object sender, EventArgs e)
        {
            decimal price = 0;
            if (rb34.Checked)
            {
                price = decimal.Parse(tbPrice3x4.Text);
            }
            if (rb9_12.Checked)
            {
                price = decimal.Parse(tbPrice9x12.Text);
            }
            if (rb12_15.Checked)
            {
                price = decimal.Parse(tbPrice12x15.Text);
            }
            if (rb18_24.Checked)
            {
                price = decimal.Parse(tbPrice18x24.Text);
            }
            lbResult.Text = "Итого: " + (int.Parse(tbCount.Text) * price).ToString("C");
        }
    }
}