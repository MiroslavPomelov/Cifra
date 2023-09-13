namespace POB2213_Sender
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
            lb_login = new Label();
            tb_login = new TextBox();
            tb_Password = new TextBox();
            lb_password = new Label();
            bt_enter = new Button();
            button1 = new Button();
            button2 = new Button();
            button3 = new Button();
            SuspendLayout();
            // 
            // lb_login
            // 
            lb_login.AutoSize = true;
            lb_login.Font = new Font("Segoe UI", 16F, FontStyle.Regular, GraphicsUnit.Point);
            lb_login.Location = new Point(12, 32);
            lb_login.Name = "lb_login";
            lb_login.Size = new Size(75, 30);
            lb_login.TabIndex = 0;
            lb_login.Text = "Логин";
            // 
            // tb_login
            // 
            tb_login.Font = new Font("Segoe UI", 16F, FontStyle.Regular, GraphicsUnit.Point);
            tb_login.Location = new Point(12, 65);
            tb_login.Name = "tb_login";
            tb_login.Size = new Size(306, 36);
            tb_login.TabIndex = 1;
            tb_login.TextChanged += tb_login_TextChanged;
            // 
            // tb_Password
            // 
            tb_Password.Font = new Font("Segoe UI", 16F, FontStyle.Regular, GraphicsUnit.Point);
            tb_Password.Location = new Point(12, 146);
            tb_Password.Name = "tb_Password";
            tb_Password.Size = new Size(306, 36);
            tb_Password.TabIndex = 3;
            tb_Password.TextChanged += tb_Password_TextChanged;
            // 
            // lb_password
            // 
            lb_password.AutoSize = true;
            lb_password.Font = new Font("Segoe UI", 16F, FontStyle.Regular, GraphicsUnit.Point);
            lb_password.Location = new Point(7, 113);
            lb_password.Name = "lb_password";
            lb_password.Size = new Size(89, 30);
            lb_password.TabIndex = 2;
            lb_password.Text = "Пароль";
            // 
            // bt_enter
            // 
            bt_enter.Font = new Font("Segoe UI", 16F, FontStyle.Regular, GraphicsUnit.Point);
            bt_enter.Location = new Point(103, 204);
            bt_enter.Name = "bt_enter";
            bt_enter.Size = new Size(104, 45);
            bt_enter.TabIndex = 4;
            bt_enter.Text = "Войти";
            bt_enter.UseVisualStyleBackColor = true;
            bt_enter.Click += bt_enter_Click;
            // 
            // button1
            // 
            button1.Location = new Point(271, 11);
            button1.Name = "button1";
            button1.Size = new Size(23, 23);
            button1.TabIndex = 5;
            button1.Text = "🗕";
            button1.UseVisualStyleBackColor = true;
            // 
            // button2
            // 
            button2.Font = new Font("Segoe UI", 9F, FontStyle.Regular, GraphicsUnit.Point);
            button2.Location = new Point(300, 11);
            button2.Name = "button2";
            button2.Size = new Size(22, 23);
            button2.TabIndex = 6;
            button2.Text = "❌";
            button2.UseVisualStyleBackColor = true;
            button2.Click += button2_Click;
            // 
            // button3
            // 
            button3.Location = new Point(242, 11);
            button3.Name = "button3";
            button3.Size = new Size(23, 23);
            button3.TabIndex = 7;
            button3.Text = "🗗";
            button3.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(335, 315);
            Controls.Add(button3);
            Controls.Add(button2);
            Controls.Add(button1);
            Controls.Add(bt_enter);
            Controls.Add(tb_Password);
            Controls.Add(lb_password);
            Controls.Add(tb_login);
            Controls.Add(lb_login);
            FormBorderStyle = FormBorderStyle.None;
            Name = "Form1";
            Text = "Form1";
            Load += Form1_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lb_login;
        private TextBox tb_login;
        private TextBox tb_Password;
        private Label lb_password;
        private Button bt_enter;
        private Button button1;
        private Button button2;
        private Button button3;
    }
}