namespace _20._10._2023Redaction
{
    partial class RegistrationForm
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
            UserNameTB = new TextBox();
            UserSurnameTB = new TextBox();
            label2 = new Label();
            UserLoginTB = new TextBox();
            label3 = new Label();
            UserMailTB = new TextBox();
            label4 = new Label();
            label5 = new Label();
            UserPasswordTB = new TextBox();
            label6 = new Label();
            RegistrateBTN = new Button();
            UserBirthdayTB = new DateTimePicker();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(12, 52);
            label1.Name = "label1";
            label1.Size = new Size(34, 15);
            label1.TabIndex = 0;
            label1.Text = "Имя:";
            // 
            // UserNameTB
            // 
            UserNameTB.Location = new Point(12, 70);
            UserNameTB.Name = "UserNameTB";
            UserNameTB.Size = new Size(251, 23);
            UserNameTB.TabIndex = 1;
            // 
            // UserSurnameTB
            // 
            UserSurnameTB.Location = new Point(12, 123);
            UserSurnameTB.Name = "UserSurnameTB";
            UserSurnameTB.Size = new Size(251, 23);
            UserSurnameTB.TabIndex = 3;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(12, 105);
            label2.Name = "label2";
            label2.Size = new Size(61, 15);
            label2.TabIndex = 2;
            label2.Text = "Фамилия:";
            // 
            // UserLoginTB
            // 
            UserLoginTB.Location = new Point(12, 27);
            UserLoginTB.Name = "UserLoginTB";
            UserLoginTB.Size = new Size(251, 23);
            UserLoginTB.TabIndex = 5;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(12, 9);
            label3.Name = "label3";
            label3.Size = new Size(44, 15);
            label3.TabIndex = 4;
            label3.Text = "Логин:";
            // 
            // UserMailTB
            // 
            UserMailTB.Location = new Point(12, 177);
            UserMailTB.Name = "UserMailTB";
            UserMailTB.Size = new Size(251, 23);
            UserMailTB.TabIndex = 11;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(12, 159);
            label4.Name = "label4";
            label4.Size = new Size(100, 15);
            label4.TabIndex = 10;
            label4.Text = "Адрес эл. почты:";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(12, 255);
            label5.Name = "label5";
            label5.Size = new Size(93, 15);
            label5.TabIndex = 8;
            label5.Text = "Дата рождения:";
            // 
            // UserPasswordTB
            // 
            UserPasswordTB.Location = new Point(12, 220);
            UserPasswordTB.Name = "UserPasswordTB";
            UserPasswordTB.Size = new Size(251, 23);
            UserPasswordTB.TabIndex = 7;
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Location = new Point(12, 202);
            label6.Name = "label6";
            label6.Size = new Size(52, 15);
            label6.TabIndex = 6;
            label6.Text = "Пароль:";
            // 
            // RegistrateBTN
            // 
            RegistrateBTN.Location = new Point(63, 314);
            RegistrateBTN.Name = "RegistrateBTN";
            RegistrateBTN.Size = new Size(138, 45);
            RegistrateBTN.TabIndex = 12;
            RegistrateBTN.Text = "Зарегестрироваться";
            RegistrateBTN.UseVisualStyleBackColor = true;
            RegistrateBTN.Click += RegistrateFinishBTN_Click;
            // 
            // UserBirthdayTB
            // 
            UserBirthdayTB.Location = new Point(12, 273);
            UserBirthdayTB.Name = "UserBirthdayTB";
            UserBirthdayTB.Size = new Size(200, 23);
            UserBirthdayTB.TabIndex = 13;
            // 
            // RegistrationForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(276, 382);
            Controls.Add(UserBirthdayTB);
            Controls.Add(RegistrateBTN);
            Controls.Add(UserMailTB);
            Controls.Add(label4);
            Controls.Add(label5);
            Controls.Add(UserPasswordTB);
            Controls.Add(label6);
            Controls.Add(UserLoginTB);
            Controls.Add(label3);
            Controls.Add(UserSurnameTB);
            Controls.Add(label2);
            Controls.Add(UserNameTB);
            Controls.Add(label1);
            Name = "RegistrationForm";
            Text = "RegistrationForm";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private TextBox UserNameTB;
        private TextBox UserSurnameTB;
        private Label label2;
        private TextBox UserLoginTB;
        private Label label3;
        private TextBox UserMailTB;
        private Label label4;
        private Label label5;
        private TextBox UserPasswordTB;
        private Label label6;
        private Button RegistrateBTN;
        private DateTimePicker UserBirthdayTB;
    }
}