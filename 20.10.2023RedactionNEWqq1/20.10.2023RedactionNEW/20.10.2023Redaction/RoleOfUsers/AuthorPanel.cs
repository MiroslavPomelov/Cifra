using Microsoft.VisualBasic.ApplicationServices;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _20._10._2023Redaction.RoleOfUsers
{
    public partial class AuthorPanel : Form
    {

        public User CurrentUser { get; set; }
        List<User> users = new List<User>();
      
        public AuthorPanel(User user)
        {
            InitializeComponent();
            CurrentUser = user;
            for (int i = 0; i < CurrentUser.ArticleList.Count; i++)
            {
                ArticleListLB.Items.Add(CurrentUser.ArticleList[i]);
            }
        }

        private void AddNewArticleBTN_Click(object sender, EventArgs e)
        {
            if (ArticleNameTB.Text != "")
            {

                CurrentUser.ArticleList.Add(ArticleNameTB.Text + ".txt");
                ArticleListLB.Items.Add(ArticleNameTB.Text);

                StreamWriter writer = new StreamWriter(ArticleNameTB.Text + ".txt", true);
                writer.WriteLine(ArticleNameTB.Text + "\n");
                writer.Close();


            }
        }

        private void AddHeaderBTN_Click(object sender, EventArgs e)
        {
            if (ArticleNameTB.Text != "")
            {
                CurrentUser.ArticleList.Add(HeaderTextTB.Text + ".txt");

                StreamWriter writer = new StreamWriter(ArticleNameTB.Text + ".txt", true);
                writer.WriteLineAsync(HeaderTextTB.Text + "\n");
                writer.Close();
            }
        }

        private void AddUnderHeaderBTN_Click(object sender, EventArgs e)
        {
            if (ArticleNameTB.Text != "")
            {
                CurrentUser.ArticleList.Add(HeaderTextTB.Text + ".txt");

                StreamWriter writer = new StreamWriter(ArticleNameTB.Text + ".txt", true);
                writer.WriteLineAsync(UnderHeaderTextTB.Text);
                writer.Close();
            }
        }

        private void AddParagraphBTN_Click(object sender, EventArgs e)
        {
            if (ArticleNameTB.Text != "")
            {
                CurrentUser.ArticleList.Add(HeaderTextTB.Text + ".txt");

                StreamWriter writer = new StreamWriter(ArticleNameTB.Text + ".txt", true);
                writer.WriteLineAsync(ParagraphTextTB.Text);
                writer.Close();
            }
        }

        private void AuthorExitBTN_Click(object sender, EventArgs e)
        {
            Form1 authenticationForm = new Form1();
            authenticationForm.Show();
            Close();
        }

       
    }
}
