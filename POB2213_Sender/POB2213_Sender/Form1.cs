namespace POB2213_Sender
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void bt_enter_Click(object sender, EventArgs e)
        {
            bool Acces = false;
            string[] DataBase = File.ReadAllLines("C:\\Users\\C4PC2\\Documents\\MirPo\\Cifra\\UserData.txt");

            for (int line = 0; line < DataBase.Length; line++)
            {
                if (DataBase[line].Split(" ")[0] == tb_login.Text && DataBase[line].Split(" ")[1] == tb_Password.Text)
                {
                    Acces = true;
                    break;
                }
            }

            if (Acces)
            {
                MessageBox.Show("Вы авторизованы");
            }
            else
            {
                MessageBox.Show("Неверный логин или пароль!");
            }
        }

        private void tb_login_TextChanged(object sender, EventArgs e)
        {

        }

        private void tb_Password_TextChanged(object sender, EventArgs e)
        {

        }

        private void button2_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}