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
            AuthorCB = new CheckBox();
            ReaderCB = new CheckBox();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(14, 69);
            label1.Name = "label1";
            label1.Size = new Size(42, 20);
            label1.TabIndex = 0;
            label1.Text = "Имя:";
            // 
            // UserNameTB
            // 
            UserNameTB.Location = new Point(14, 93);
            UserNameTB.Margin = new Padding(3, 4, 3, 4);
            UserNameTB.Name = "UserNameTB";
            UserNameTB.Size = new Size(286, 27);
            UserNameTB.TabIndex = 1;
            // 
            // UserSurnameTB
            // 
            UserSurnameTB.Location = new Point(14, 164);
            UserSurnameTB.Margin = new Padding(3, 4, 3, 4);
            UserSurnameTB.Name = "UserSurnameTB";
            UserSurnameTB.Size = new Size(286, 27);
            UserSurnameTB.TabIndex = 3;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(14, 140);
            label2.Name = "label2";
            label2.Size = new Size(76, 20);
            label2.TabIndex = 2;
            label2.Text = "Фамилия:";
            // 
            // UserLoginTB
            // 
            UserLoginTB.Location = new Point(14, 36);
            UserLoginTB.Margin = new Padding(3, 4, 3, 4);
            UserLoginTB.Name = "UserLoginTB";
            UserLoginTB.Size = new Size(286, 27);
            UserLoginTB.TabIndex = 5;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(14, 12);
            label3.Name = "label3";
            label3.Size = new Size(55, 20);
            label3.TabIndex = 4;
            label3.Text = "Логин:";
            // 
            // UserMailTB
            // 
            UserMailTB.Location = new Point(14, 236);
            UserMailTB.Margin = new Padding(3, 4, 3, 4);
            UserMailTB.Name = "UserMailTB";
            UserMailTB.Size = new Size(286, 27);
            UserMailTB.TabIndex = 11;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(14, 212);
            label4.Name = "label4";
            label4.Size = new Size(123, 20);
            label4.TabIndex = 10;
            label4.Text = "Адрес эл. почты:";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(14, 340);
            label5.Name = "label5";
            label5.Size = new Size(119, 20);
            label5.TabIndex = 8;
            label5.Text = "Дата рождения:";
            // 
            // UserPasswordTB
            // 
            UserPasswordTB.Location = new Point(14, 293);
            UserPasswordTB.Margin = new Padding(3, 4, 3, 4);
            UserPasswordTB.Name = "UserPasswordTB";
            UserPasswordTB.Size = new Size(286, 27);
            UserPasswordTB.TabIndex = 7;
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Location = new Point(14, 269);
            label6.Name = "label6";
            label6.Size = new Size(65, 20);
            label6.TabIndex = 6;
            label6.Text = "Пароль:";
            // 
            // RegistrateBTN
            // 
            RegistrateBTN.Location = new Point(68, 442);
            RegistrateBTN.Margin = new Padding(3, 4, 3, 4);
            RegistrateBTN.Name = "RegistrateBTN";
            RegistrateBTN.Size = new Size(158, 60);
            RegistrateBTN.TabIndex = 12;
            RegistrateBTN.Text = "Зарегестрироваться";
            RegistrateBTN.UseVisualStyleBackColor = true;
            RegistrateBTN.Click += RegistrateFinishBTN_Click;
            // 
            // UserBirthdayTB
            // 
            UserBirthdayTB.Location = new Point(14, 364);
            UserBirthdayTB.Margin = new Padding(3, 4, 3, 4);
            UserBirthdayTB.Name = "UserBirthdayTB";
            UserBirthdayTB.Size = new Size(228, 27);
            UserBirthdayTB.TabIndex = 13;
            // 
            // AuthorCB
            // 
            AuthorCB.AutoSize = true;
            AuthorCB.Location = new Point(14, 411);
            AuthorCB.Name = "AuthorCB";
            AuthorCB.Size = new Size(73, 24);
            AuthorCB.TabIndex = 14;
            AuthorCB.Text = "Автор";
            AuthorCB.UseVisualStyleBackColor = true;
            // 
            // ReaderCB
            // 
            ReaderCB.AutoSize = true;
            ReaderCB.Location = new Point(206, 411);
            ReaderCB.Name = "ReaderCB";
            ReaderCB.Size = new Size(94, 24);
            ReaderCB.TabIndex = 15;
            ReaderCB.Text = "Читатель";
            ReaderCB.UseVisualStyleBackColor = true;
            // 
            // RegistrationForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(315, 532);
            Controls.Add(ReaderCB);
            Controls.Add(AuthorCB);
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
            Margin = new Padding(3, 4, 3, 4);
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
        private CheckBox AuthorCB;
        private CheckBox ReaderCB;
    }
}