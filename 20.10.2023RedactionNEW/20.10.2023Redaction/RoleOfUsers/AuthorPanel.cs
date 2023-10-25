using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _20._10._2023Redaction.RoleOfUsers
{
    public partial class AuthorPanel : Form
    {
        public User CurrentUser { get; set; }
        public AuthorPanel(User user)
        {
            InitializeComponent();
            CurrentUser = user;
        }

        private void AddNewArticleBTN_Click(object sender, EventArgs e)
        {
            CurrentUser.ArticleList.Add(ArticleNameTB.Text + ".txt");
            ArticleListLB.Items.Add(ArticleNameTB.Text);

            StreamWriter writer = new StreamWriter(ArticleNameTB.Text + ".txt");
            //writer.Write(ArticleNameTB.Text);
            writer.Close();
        }
    }
}
