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


            User newUser = new User(userLogin, userName, userSurName, userMail, userPassword, birthDay);

            UserRegistration.RegisterUser(newUser);
        }
    }
}
