namespace _20._10._2023Redaction.RoleOfUsers
{
    partial class ReaderPanel
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
            RederArticleLB = new ListBox();
            ReadArticleBTN = new Button();
            RederArticlesTB = new TextBox();
            ReaderExitBTN = new Button();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(54, 24);
            label1.Name = "label1";
            label1.Size = new Size(110, 20);
            label1.TabIndex = 0;
            label1.Text = "Список статей:";
            // 
            // RederArticleLB
            // 
            RederArticleLB.FormattingEnabled = true;
            RederArticleLB.ItemHeight = 20;
            RederArticleLB.Location = new Point(12, 59);
            RederArticleLB.Name = "RederArticleLB";
            RederArticleLB.Size = new Size(210, 344);
            RederArticleLB.TabIndex = 1;
            // 
            // ReadArticleBTN
            // 
            ReadArticleBTN.Location = new Point(259, 199);
            ReadArticleBTN.Name = "ReadArticleBTN";
            ReadArticleBTN.Size = new Size(148, 56);
            ReadArticleBTN.TabIndex = 2;
            ReadArticleBTN.Text = "Читать";
            ReadArticleBTN.UseVisualStyleBackColor = true;
            ReadArticleBTN.Click += ReadArticleBTN_Click;
            // 
            // RederArticlesTB
            // 
            RederArticlesTB.Location = new Point(443, 59);
            RederArticlesTB.Multiline = true;
            RederArticlesTB.Name = "RederArticlesTB";
            RederArticlesTB.Size = new Size(331, 344);
            RederArticlesTB.TabIndex = 3;
            // 
            // ReaderExitBTN
            // 
            ReaderExitBTN.Location = new Point(625, 424);
            ReaderExitBTN.Name = "ReaderExitBTN";
            ReaderExitBTN.Size = new Size(151, 49);
            ReaderExitBTN.TabIndex = 4;
            ReaderExitBTN.Text = "Выйти из Аккаунта";
            ReaderExitBTN.UseVisualStyleBackColor = true;
            ReaderExitBTN.Click += ReaderExitBTN_Click;
            // 
            // ReaderPanel
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 482);
            Controls.Add(ReaderExitBTN);
            Controls.Add(RederArticlesTB);
            Controls.Add(ReadArticleBTN);
            Controls.Add(RederArticleLB);
            Controls.Add(label1);
            Name = "ReaderPanel";
            Text = "ReaderPanel";
            Load += ReaderPanel_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private ListBox RederArticleLB;
        private Button ReadArticleBTN;
        private TextBox RederArticlesTB;
        private Button ReaderExitBTN;
    }
}