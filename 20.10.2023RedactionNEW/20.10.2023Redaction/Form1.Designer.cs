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
            EnterBT = new Button();
            label3 = new Label();
            RegistrateBTN = new Button();
            SuspendLayout();
            // 
            // UserLoginTB
            // 
            UserLoginTB.Location = new Point(14, 36);
            UserLoginTB.Margin = new Padding(3, 4, 3, 4);
            UserLoginTB.Name = "UserLoginTB";
            UserLoginTB.Size = new Size(367, 27);
            UserLoginTB.TabIndex = 0;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(14, 12);
            label1.Name = "label1";
            label1.Size = new Size(152, 20);
            label1.TabIndex = 1;
            label1.Text = "Логин пользователя";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(14, 84);
            label2.Name = "label2";
            label2.Size = new Size(162, 20);
            label2.TabIndex = 3;
            label2.Text = "Пароль пользователя";
            // 
            // UserPasswordTB
            // 
            UserPasswordTB.Location = new Point(14, 108);
            UserPasswordTB.Margin = new Padding(3, 4, 3, 4);
            UserPasswordTB.Name = "UserPasswordTB";
            UserPasswordTB.Size = new Size(367, 27);
            UserPasswordTB.TabIndex = 2;
            // 
            // EnterBT
            // 
            EnterBT.Location = new Point(220, 162);
            EnterBT.Margin = new Padding(3, 4, 3, 4);
            EnterBT.Name = "EnterBT";
            EnterBT.Size = new Size(161, 52);
            EnterBT.TabIndex = 4;
            EnterBT.Text = "Войти";
            EnterBT.UseVisualStyleBackColor = true;
            EnterBT.Click += EnterBT_Click;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(14, 284);
            label3.Name = "label3";
            label3.Size = new Size(200, 20);
            label3.TabIndex = 5;
            label3.Text = "Еще не зарегестрированы?";
            // 
            // RegistrateBTN
            // 
            RegistrateBTN.Location = new Point(220, 279);
            RegistrateBTN.Margin = new Padding(3, 4, 3, 4);
            RegistrateBTN.Name = "RegistrateBTN";
            RegistrateBTN.Size = new Size(161, 31);
            RegistrateBTN.TabIndex = 6;
            RegistrateBTN.Text = "Зарегестрироваться";
            RegistrateBTN.UseVisualStyleBackColor = true;
            RegistrateBTN.Click += RegistrateBTN_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(393, 356);
            Controls.Add(RegistrateBTN);
            Controls.Add(label3);
            Controls.Add(EnterBT);
            Controls.Add(label2);
            Controls.Add(UserPasswordTB);
            Controls.Add(label1);
            Controls.Add(UserLoginTB);
            Margin = new Padding(3, 4, 3, 4);
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
        private Button EnterBT;
        private Label label3;
        private Button RegistrateBTN;
    }
}