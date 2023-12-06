namespace _20._10._2023Redaction
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
            UserLoginTB = new TextBox();
            label1 = new Label();
            label2 = new Label();
            UserPasswordTB = new TextBox();
            AutentificateBTN = new Button();
            label3 = new Label();
            RegistrateBTN = new Button();
            SuspendLayout();
            // 
            // UserLoginTB
            // 
            UserLoginTB.Location = new Point(12, 27);
            UserLoginTB.Name = "UserLoginTB";
            UserLoginTB.Size = new Size(322, 23);
            UserLoginTB.TabIndex = 0;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(12, 9);
            label1.Name = "label1";
            label1.Size = new Size(119, 15);
            label1.TabIndex = 1;
            label1.Text = "Логин пользователя";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(12, 63);
            label2.Name = "label2";
            label2.Size = new Size(127, 15);
            label2.TabIndex = 3;
            label2.Text = "Пароль пользователя";
            // 
            // UserPasswordTB
            // 
            UserPasswordTB.Location = new Point(12, 81);
            UserPasswordTB.Name = "UserPasswordTB";
            UserPasswordTB.Size = new Size(322, 23);
            UserPasswordTB.TabIndex = 2;
            // 
            // AutentificateBTN
            // 
            AutentificateBTN.Location = new Point(192, 122);
            AutentificateBTN.Name = "AutentificateBTN";
            AutentificateBTN.Size = new Size(141, 39);
            AutentificateBTN.TabIndex = 4;
            AutentificateBTN.Text = "Войти";
            AutentificateBTN.UseVisualStyleBackColor = true;
            AutentificateBTN.Click += EnterBT_Click;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(12, 213);
            label3.Name = "label3";
            label3.Size = new Size(156, 15);
            label3.TabIndex = 5;
            label3.Text = "Еще не зарегестрированы?";
            // 
            // RegistrateBTN
            // 
            RegistrateBTN.Location = new Point(192, 209);
            RegistrateBTN.Name = "RegistrateBTN";
            RegistrateBTN.Size = new Size(141, 23);
            RegistrateBTN.TabIndex = 6;
            RegistrateBTN.Text = "Зарегестрироваться";
            RegistrateBTN.UseVisualStyleBackColor = true;
            RegistrateBTN.Click += RegistrateBTN_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(344, 267);
            Controls.Add(RegistrateBTN);
            Controls.Add(label3);
            Controls.Add(AutentificateBTN);
            Controls.Add(label2);
            Controls.Add(UserPasswordTB);
            Controls.Add(label1);
            Controls.Add(UserLoginTB);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox UserLoginTB;
        private Label label1;
        private Label label2;
        private TextBox UserPasswordTB;
        private Button AutentificateBTN;
        private Label label3;
        private Button RegistrateBTN;
    }
}