namespace POB2213_Sender
{
    partial class MainForm
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
            bodyTB = new TextBox();
            label4 = new Label();
            button1 = new Button();
            domenCB = new ComboBox();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point);
            label1.Location = new Point(12, 13);
            label1.Name = "label1";
            label1.Size = new Size(50, 21);
            label1.TabIndex = 0;
            label1.Text = "From:";
            // 
            // fromTB
            // 
            fromTB.Location = new Point(82, 11);
            fromTB.Name = "fromTB";
            fromTB.Size = new Size(585, 23);
            fromTB.TabIndex = 1;
            // 
            // toTB
            // 
            toTB.Location = new Point(82, 50);
            toTB.Name = "toTB";
            toTB.Size = new Size(585, 23);
            toTB.TabIndex = 3;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point);
            label2.Location = new Point(12, 52);
            label2.Name = "label2";
            label2.Size = new Size(28, 21);
            label2.TabIndex = 2;
            label2.Text = "To:";
            // 
            // subjectTB
            // 
            subjectTB.Location = new Point(82, 92);
            subjectTB.Name = "subjectTB";
            subjectTB.Size = new Size(585, 23);
            subjectTB.TabIndex = 5;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point);
            label3.Location = new Point(12, 94);
            label3.Name = "label3";
            label3.Size = new Size(64, 21);
            label3.TabIndex = 4;
            label3.Text = "Subject:";
            // 
            // bodyTB
            // 
            bodyTB.Location = new Point(12, 164);
            bodyTB.Multiline = true;
            bodyTB.Name = "bodyTB";
            bodyTB.Size = new Size(655, 212);
            bodyTB.TabIndex = 7;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point);
            label4.Location = new Point(12, 131);
            label4.Name = "label4";
            label4.Size = new Size(48, 21);
            label4.TabIndex = 6;
            label4.Text = "Body:";
            // 
            // button1
            // 
            button1.Font = new Font("Segoe UI", 14F, FontStyle.Regular, GraphicsUnit.Point);
            button1.Location = new Point(537, 382);
            button1.Name = "button1";
            button1.Size = new Size(130, 56);
            button1.TabIndex = 8;
            button1.Text = "Send";
            button1.UseVisualStyleBackColor = true;
            button1.Click += sendBtn_Click;
            // 
            // domenCB
            // 
            domenCB.DropDownStyle = ComboBoxStyle.DropDownList;
            domenCB.FormattingEnabled = true;
            domenCB.Items.AddRange(new object[] { "mail.ru", "google.com", "yandex.ru" });
            domenCB.Location = new Point(12, 403);
            domenCB.Name = "domenCB";
            domenCB.Size = new Size(121, 23);
            domenCB.TabIndex = 9;
            // 
            // MainForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(682, 450);
            Controls.Add(domenCB);
            Controls.Add(button1);
            Controls.Add(bodyTB);
            Controls.Add(label4);
            Controls.Add(subjectTB);
            Controls.Add(label3);
            Controls.Add(toTB);
            Controls.Add(label2);
            Controls.Add(fromTB);
            Controls.Add(label1);
            Name = "MainForm";
            Text = "MainForm";
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
        private TextBox bodyTB;
        private Label label4;
        private Button button1;
        private ComboBox domenCB;
    }
}