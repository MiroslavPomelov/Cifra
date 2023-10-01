namespace Sender2
{
    partial class SMTPSender
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
            fromTB = new TextBox();
            toTB = new TextBox();
            label2 = new Label();
            subjectTB = new TextBox();
            label3 = new Label();
            textTB = new TextBox();
            label4 = new Label();
            sendmassageBtn = new Button();
            serversCB = new ComboBox();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(12, 21);
            label1.Name = "label1";
            label1.Size = new Size(52, 15);
            label1.TabIndex = 0;
            label1.Text = "От кого:";
            // 
            // fromTB
            // 
            fromTB.Location = new Point(74, 18);
            fromTB.Name = "fromTB";
            fromTB.Size = new Size(618, 23);
            fromTB.TabIndex = 1;
            // 
            // toTB
            // 
            toTB.Location = new Point(74, 63);
            toTB.Name = "toTB";
            toTB.Size = new Size(618, 23);
            toTB.TabIndex = 3;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(12, 66);
            label2.Name = "label2";
            label2.Size = new Size(39, 15);
            label2.TabIndex = 2;
            label2.Text = "Кому:";
            // 
            // subjectTB
            // 
            subjectTB.Location = new Point(74, 115);
            subjectTB.Name = "subjectTB";
            subjectTB.Size = new Size(618, 23);
            subjectTB.TabIndex = 5;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(12, 118);
            label3.Name = "label3";
            label3.Size = new Size(37, 15);
            label3.TabIndex = 4;
            label3.Text = "Тема:";
            // 
            // textTB
            // 
            textTB.Location = new Point(12, 189);
            textTB.Multiline = true;
            textTB.Name = "textTB";
            textTB.Size = new Size(680, 189);
            textTB.TabIndex = 7;
            textTB.TextChanged += textTB_TextChanged;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(12, 162);
            label4.Name = "label4";
            label4.Size = new Size(106, 15);
            label4.TabIndex = 6;
            label4.Text = "Текст сообщения:";
            // 
            // sendmassageBtn
            // 
            sendmassageBtn.Location = new Point(563, 396);
            sendmassageBtn.Name = "sendmassageBtn";
            sendmassageBtn.Size = new Size(129, 33);
            sendmassageBtn.TabIndex = 8;
            sendmassageBtn.Text = "Отправить";
            sendmassageBtn.UseVisualStyleBackColor = true;
            sendmassageBtn.Click += sendmassageBtn_Click;
            // 
            // serversCB
            // 
            serversCB.DropDownStyle = ComboBoxStyle.DropDownList;
            serversCB.FormattingEnabled = true;
            serversCB.Items.AddRange(new object[] { "yandex.ru", "mail.ru", "google.com" });
            serversCB.Location = new Point(12, 396);
            serversCB.Name = "serversCB";
            serversCB.Size = new Size(121, 23);
            serversCB.TabIndex = 9;
            // 
            // SMTPSender
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(709, 443);
            Controls.Add(serversCB);
            Controls.Add(sendmassageBtn);
            Controls.Add(textTB);
            Controls.Add(label4);
            Controls.Add(subjectTB);
            Controls.Add(label3);
            Controls.Add(toTB);
            Controls.Add(label2);
            Controls.Add(fromTB);
            Controls.Add(label1);
            Name = "SMTPSender";
            Text = "SMTPSender";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private TextBox fromTB;
        private TextBox toTB;
        private Label label2;
        private TextBox subjectTB;
        private Label label3;
        private TextBox textTB;
        private Label label4;
        private Button sendmassageBtn;
        private ComboBox serversCB;
    }
}