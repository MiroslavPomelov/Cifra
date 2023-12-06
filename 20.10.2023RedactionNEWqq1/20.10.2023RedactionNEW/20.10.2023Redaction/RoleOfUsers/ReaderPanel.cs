using Microsoft.VisualBasic.ApplicationServices;
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
    public partial class ReaderPanel : Form
    {
        public User CurrentUser { get; set; }
        public ReaderPanel(User user)
        {
            InitializeComponent();
            CurrentUser = user;
            string[] articles = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.txt*", SearchOption.AllDirectories);
            for (int i = 0; i < articles.Length; i++)
            {
                CurrentUser.ArticleList.Add((Path.GetFileName(articles[i])));
                RederArticleLB.Items.Add(Path.GetFileName(articles[i]));
            }
        }

        private void ReaderPanel_Load(object sender, EventArgs e)
        {

        }

        private async void ReadArticleBTN_Click(object sender, EventArgs e)
        {
            StreamReader streamReader = new StreamReader(RederArticleLB.Text, true);
            string text = await streamReader.ReadToEndAsync();
            RederArticlesTB.Text = text;
            streamReader.Close();
        }

        private void ReaderExitBTN_Click(object sender, EventArgs e)
        {
            Form1 authenticationForm = new Form1();
            authenticationForm.Show();
            Close();
        }
    }
}
