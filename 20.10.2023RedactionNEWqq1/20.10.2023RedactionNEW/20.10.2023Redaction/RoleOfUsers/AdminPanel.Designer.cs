namespace _20._10._2023Redaction.RoleOfUsers
{
    partial class AdminPanel
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            label1 = new Label();
            UsersListLB = new ListBox();
            AddUserBTN = new Button();
            DeleteUserBTN = new Button();
            ChangeUserInfoBTN = new Button();
            AdminExitBTN = new Button();
            InfoUserBTN = new Button();
            InfoUserTB = new TextBox();
            ArticleOfUserTB = new TextBox();
            label2 = new Label();
            label3 = new Label();
            ReadArticleOfUserBTN = new Button();
            ArticleListOfUserBTN = new Button();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(21, 22);
            label1.Name = "label1";
            label1.Size = new Size(171, 20);
            label1.TabIndex = 0;
            label1.Text = "Список пользователей:";
            // 
            // UsersListLB
            // 
            UsersListLB.FormattingEnabled = true;
            UsersListLB.ItemHeight = 20;
            UsersListLB.Location = new Point(21, 58);
            UsersListLB.Name = "UsersListLB";
            UsersListLB.Size = new Size(171, 404);
            UsersListLB.TabIndex = 1;
            // 
            // AddUserBTN
            // 
            AddUserBTN.Location = new Point(228, 58);
            AddUserBTN.Name = "AddUserBTN";
            AddUserBTN.Size = new Size(125, 55);
            AddUserBTN.TabIndex = 2;
            AddUserBTN.Text = "Добавить пользователя";
            AddUserBTN.UseVisualStyleBackColor = true;
            AddUserBTN.Click += AddUserBTN_Click;
            // 
            // DeleteUserBTN
            // 
            DeleteUserBTN.Location = new Point(228, 219);
            DeleteUserBTN.Name = "DeleteUserBTN";
            DeleteUserBTN.Size = new Size(125, 59);
            DeleteUserBTN.TabIndex = 3;
            DeleteUserBTN.Text = "Удалить пользователя";
            DeleteUserBTN.UseVisualStyleBackColor = true;
            DeleteUserBTN.Click += DeleteUserBTN_Click;
            // 
            // ChangeUserInfoBTN
            // 
            ChangeUserInfoBTN.Location = new Point(228, 140);
            ChangeUserInfoBTN.Name = "ChangeUserInfoBTN";
            ChangeUserInfoBTN.Size = new Size(125, 52);
            ChangeUserInfoBTN.TabIndex = 4;
            ChangeUserInfoBTN.Text = "Редактировать пользователя";
            ChangeUserInfoBTN.UseVisualStyleBackColor = true;
            ChangeUserInfoBTN.Click += ChangeUserInfoBTN_Click;
            // 
            // AdminExitBTN
            // 
            AdminExitBTN.Location = new Point(619, 488);
            AdminExitBTN.Name = "AdminExitBTN";
            AdminExitBTN.Size = new Size(130, 51);
            AdminExitBTN.TabIndex = 5;
            AdminExitBTN.Text = "Выйти из Аккаунта";
            AdminExitBTN.UseVisualStyleBackColor = true;
            AdminExitBTN.Click += button2_Click;
            // 
            // InfoUserBTN
            // 
            InfoUserBTN.Location = new Point(228, 307);
            InfoUserBTN.Name = "InfoUserBTN";
            InfoUserBTN.Size = new Size(125, 56);
            InfoUserBTN.TabIndex = 6;
            InfoUserBTN.Text = "Информация";
            InfoUserBTN.UseVisualStyleBackColor = true;
            InfoUserBTN.Click += InfoUserBTN_Click;
            // 
            // InfoUserTB
            // 
            InfoUserTB.Location = new Point(391, 58);
            InfoUserTB.Multiline = true;
            InfoUserTB.Name = "InfoUserTB";
            InfoUserTB.Size = new Size(358, 404);
            InfoUserTB.TabIndex = 7;
            // 
            // ArticleOfUserTB
            // 
            ArticleOfUserTB.Location = new Point(884, 58);
            ArticleOfUserTB.Multiline = true;
            ArticleOfUserTB.Name = "ArticleOfUserTB";
            ArticleOfUserTB.Size = new Size(572, 404);
            ArticleOfUserTB.TabIndex = 8;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(391, 22);
            label2.Name = "label2";
            label2.Size = new Size(105, 20);
            label2.TabIndex = 9;
            label2.Text = "Информация:";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(884, 22);
            label3.Name = "label3";
            label3.Size = new Size(54, 20);
            label3.TabIndex = 10;
            label3.Text = "Статья";
            // 
            // ReadArticleOfUserBTN
            // 
            ReadArticleOfUserBTN.Location = new Point(755, 219);
            ReadArticleOfUserBTN.Name = "ReadArticleOfUserBTN";
            ReadArticleOfUserBTN.Size = new Size(123, 59);
            ReadArticleOfUserBTN.TabIndex = 11;
            ReadArticleOfUserBTN.Text = "Читать статью";
            ReadArticleOfUserBTN.UseVisualStyleBackColor = true;
            // 
            // ArticleListOfUserBTN
            // 
            ArticleListOfUserBTN.Location = new Point(228, 391);
            ArticleListOfUserBTN.Name = "ArticleListOfUserBTN";
            ArticleListOfUserBTN.Size = new Size(125, 53);
            ArticleListOfUserBTN.TabIndex = 12;
            ArticleListOfUserBTN.Text = "Список статей";
            ArticleListOfUserBTN.UseVisualStyleBackColor = true;
            ArticleListOfUserBTN.Click += ArticleListOfUserBTN_Click;
            // 
            // AdminPanel
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1479, 578);
            Controls.Add(ArticleListOfUserBTN);
            Controls.Add(ReadArticleOfUserBTN);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(ArticleOfUserTB);
            Controls.Add(InfoUserTB);
            Controls.Add(InfoUserBTN);
            Controls.Add(AdminExitBTN);
            Controls.Add(ChangeUserInfoBTN);
            Controls.Add(DeleteUserBTN);
            Controls.Add(AddUserBTN);
            Controls.Add(UsersListLB);
            Controls.Add(label1);
            Name = "AdminPanel";
            Text = "AdminPanel";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private ListBox UsersListLB;
        private Button AddUserBTN;
        private Button DeleteUserBTN;
        private Button ChangeUserInfoBTN;
        private Button AdminExitBTN;
        private Button InfoUserBTN;
        private TextBox InfoUserTB;
        private TextBox ArticleOfUserTB;
        private Label label2;
        private Label label3;
        private Button ReadArticleOfUserBTN;
        private Button ArticleListOfUserBTN;
    }
}