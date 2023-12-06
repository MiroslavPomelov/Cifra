using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _20._10._2023Redaction
{
    public partial class RegistrationForm : Form
    {
        public RegistrationForm()
        {
            InitializeComponent();
        }

        private void RegistrateFinishBTN_Click(object sender, EventArgs e)
        {
            RegistrateNewUser();
        }

        private void RegistrateNewUser()
        {
            string userLogin = UserLoginTB.Text;
            string userName = UserNameTB.Text;
            string userSurName = UserSurnameTB.Text;
            string userMail = UserMailTB.Text;
            string userPassword = UserPasswordTB.Text;
            DateTime birthDay = UserBirthdayTB.Value;
            bool author = AuthorCB.Checked;
            bool reader = ReaderCB.Checked;
            bool isredactor = false;
            Role role = ReaderCB.Checked == true ? Role.Reader : Role.Author;           

            User newUser = new User(userLogin, userName, userSurName, userMail, userPassword, birthDay, role);

            UserRegistration.RegisterUser(newUser);

            Form1 auteticate = new Form1();
            auteticate.Show();
            Close();
        }

        private void ReaderCB_CheckedChanged(object sender, EventArgs e)
        {
            AuthorCB.Checked = false;
        }

        private void AuthorCB_CheckedChanged(object sender, EventArgs e)
        {
            ReaderCB.Checked = false;
        }
    }
}
