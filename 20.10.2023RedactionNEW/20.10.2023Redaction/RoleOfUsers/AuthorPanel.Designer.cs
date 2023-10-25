namespace _20._10._2023Redaction.RoleOfUsers
{
    partial class AuthorPanel
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
            ParagraphTextTB = new TextBox();
            label1 = new Label();
            label2 = new Label();
            HeaderTextTB = new TextBox();
            label3 = new Label();
            UnderHeaderTextTB = new TextBox();
            AddParagraphBTN = new Button();
            AddUnderHeaderBTN = new Button();
            AddHeaderBTN = new Button();
            ArticleListLB = new ListBox();
            label4 = new Label();
            AddNewArticleBTN = new Button();
            ArticleNameTB = new TextBox();
            label5 = new Label();
            SuspendLayout();
            // 
            // ParagraphTextTB
            // 
            ParagraphTextTB.Location = new Point(724, 174);
            ParagraphTextTB.Multiline = true;
            ParagraphTextTB.Name = "ParagraphTextTB";
            ParagraphTextTB.Size = new Size(394, 429);
            ParagraphTextTB.TabIndex = 0;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(724, 156);
            label1.Name = "label1";
            label1.Size = new Size(80, 15);
            label1.TabIndex = 1;
            label1.Text = "Абзац Статьи";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(734, 32);
            label2.Name = "label2";
            label2.Size = new Size(105, 15);
            label2.TabIndex = 3;
            label2.Text = "Заголовок Статьи";
            // 
            // HeaderTextTB
            // 
            HeaderTextTB.Font = new Font("Segoe UI", 16F, FontStyle.Bold, GraphicsUnit.Point);
            HeaderTextTB.Location = new Point(724, 50);
            HeaderTextTB.Multiline = true;
            HeaderTextTB.Name = "HeaderTextTB";
            HeaderTextTB.Size = new Size(394, 33);
            HeaderTextTB.TabIndex = 2;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(724, 86);
            label3.Name = "label3";
            label3.Size = new Size(125, 15);
            label3.TabIndex = 5;
            label3.Text = "Подзаголовок Статьи";
            // 
            // UnderHeaderTextTB
            // 
            UnderHeaderTextTB.Font = new Font("Segoe UI", 14F, FontStyle.Bold, GraphicsUnit.Point);
            UnderHeaderTextTB.Location = new Point(724, 104);
            UnderHeaderTextTB.Multiline = true;
            UnderHeaderTextTB.Name = "UnderHeaderTextTB";
            UnderHeaderTextTB.Size = new Size(394, 37);
            UnderHeaderTextTB.TabIndex = 4;
            // 
            // AddParagraphBTN
            // 
            AddParagraphBTN.Location = new Point(537, 580);
            AddParagraphBTN.Name = "AddParagraphBTN";
            AddParagraphBTN.Size = new Size(181, 23);
            AddParagraphBTN.TabIndex = 6;
            AddParagraphBTN.Text = "Добавить абзац";
            AddParagraphBTN.UseVisualStyleBackColor = true;
            // 
            // AddUnderHeaderBTN
            // 
            AddUnderHeaderBTN.Location = new Point(537, 551);
            AddUnderHeaderBTN.Name = "AddUnderHeaderBTN";
            AddUnderHeaderBTN.Size = new Size(181, 23);
            AddUnderHeaderBTN.TabIndex = 7;
            AddUnderHeaderBTN.Text = "Добавить подзаголовок";
            AddUnderHeaderBTN.UseVisualStyleBackColor = true;
            // 
            // AddHeaderBTN
            // 
            AddHeaderBTN.Location = new Point(537, 522);
            AddHeaderBTN.Name = "AddHeaderBTN";
            AddHeaderBTN.Size = new Size(181, 23);
            AddHeaderBTN.TabIndex = 8;
            AddHeaderBTN.Text = "Добавить заголовок";
            AddHeaderBTN.UseVisualStyleBackColor = true;
            // 
            // ArticleListLB
            // 
            ArticleListLB.FormattingEnabled = true;
            ArticleListLB.ItemHeight = 15;
            ArticleListLB.Location = new Point(537, 50);
            ArticleListLB.Name = "ArticleListLB";
            ArticleListLB.Size = new Size(181, 454);
            ArticleListLB.TabIndex = 9;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(537, 32);
            label4.Name = "label4";
            label4.Size = new Size(86, 15);
            label4.TabIndex = 10;
            label4.Text = "Список статей";
            // 
            // AddNewArticleBTN
            // 
            AddNewArticleBTN.Location = new Point(12, 83);
            AddNewArticleBTN.Name = "AddNewArticleBTN";
            AddNewArticleBTN.Size = new Size(207, 46);
            AddNewArticleBTN.TabIndex = 11;
            AddNewArticleBTN.Text = "Создать статью";
            AddNewArticleBTN.UseVisualStyleBackColor = true;
            AddNewArticleBTN.Click += AddNewArticleBTN_Click;
            // 
            // ArticleNameTB
            // 
            ArticleNameTB.Location = new Point(12, 50);
            ArticleNameTB.Name = "ArticleNameTB";
            ArticleNameTB.Size = new Size(510, 23);
            ArticleNameTB.TabIndex = 12;
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(12, 32);
            label5.Name = "label5";
            label5.Size = new Size(97, 15);
            label5.TabIndex = 13;
            label5.Text = "Название статьи";
            // 
            // AuthorPanel
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1135, 615);
            Controls.Add(label5);
            Controls.Add(ArticleNameTB);
            Controls.Add(AddNewArticleBTN);
            Controls.Add(label4);
            Controls.Add(ArticleListLB);
            Controls.Add(AddHeaderBTN);
            Controls.Add(AddUnderHeaderBTN);
            Controls.Add(AddParagraphBTN);
            Controls.Add(label3);
            Controls.Add(UnderHeaderTextTB);
            Controls.Add(label2);
            Controls.Add(HeaderTextTB);
            Controls.Add(label1);
            Controls.Add(ParagraphTextTB);
            Name = "AuthorPanel";
            Text = "AuthorPanel";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox ParagraphTextTB;
        private Label label1;
        private Label label2;
        private TextBox HeaderTextTB;
        private Label label3;
        private TextBox UnderHeaderTextTB;
        private Button AddParagraphBTN;
        private Button AddUnderHeaderBTN;
        private Button AddHeaderBTN;
        private ListBox ArticleListLB;
        private Label label4;
        private Button AddNewArticleBTN;
        private TextBox ArticleNameTB;
        private Label label5;
    }
}