namespace Sender2
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
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
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            label1 = new Label();
            usernameTB = new TextBox();
            userpassTB = new TextBox();
            label2 = new Label();
            enterBtn = new Button();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(12, 18);
            label1.Name = "label1";
            label1.Size = new Size(109, 15);
            label1.TabIndex = 0;
            label1.Text = "Имя пользователя";
            // 
            // usernameTB
            // 
            usernameTB.Location = new Point(12, 36);
            usernameTB.Name = "usernameTB";
            usernameTB.Size = new Size(230, 23);
            usernameTB.TabIndex = 1;
            // 
            // userpassTB
            // 
            userpassTB.Location = new Point(12, 104);
            userpassTB.Name = "userpassTB";
            userpassTB.Size = new Size(230, 23);
            userpassTB.TabIndex = 3;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(12, 86);
            label2.Name = "label2";
            label2.Size = new Size(49, 15);
            label2.TabIndex = 2;
            label2.Text = "Пароль";
            // 
            // enterBtn
            // 
            enterBtn.Location = new Point(167, 158);
            enterBtn.Name = "enterBtn";
            enterBtn.Size = new Size(75, 23);
            enterBtn.TabIndex = 4;
            enterBtn.Text = "Войти";
            enterBtn.UseVisualStyleBackColor = true;
            enterBtn.Click += enterBtn_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(257, 205);
            Controls.Add(enterBtn);
            Controls.Add(userpassTB);
            Controls.Add(label2);
            Controls.Add(usernameTB);
            Controls.Add(label1);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private TextBox usernameTB;
        private TextBox userpassTB;
        private Label label2;
        private Button enterBtn;
    }
}