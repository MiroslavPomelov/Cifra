namespace Timer
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
            components = new System.ComponentModel.Container();
            lb0 = new Label();
            btStart = new Button();
            btReset = new Button();
            timer1 = new System.Windows.Forms.Timer(components);
            tbM = new TextBox();
            tbS = new TextBox();
            lanelm = new Label();
            labels = new Label();
            label1 = new Label();
            lb2 = new Label();
            SuspendLayout();
            // 
            // lb0
            // 
            lb0.AutoSize = true;
            lb0.Font = new Font("Segoe UI", 32F, FontStyle.Regular, GraphicsUnit.Point);
            lb0.Location = new Point(51, 29);
            lb0.Name = "lb0";
            lb0.Size = new Size(59, 72);
            lb0.TabIndex = 0;
            lb0.Text = "0";
            lb0.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // btStart
            // 
            btStart.Location = new Point(34, 172);
            btStart.Name = "btStart";
            btStart.Size = new Size(94, 59);
            btStart.TabIndex = 1;
            btStart.Text = "Старт";
            btStart.UseVisualStyleBackColor = true;
            btStart.Click += btStart_Click;
            // 
            // btReset
            // 
            btReset.Location = new Point(149, 172);
            btReset.Name = "btReset";
            btReset.Size = new Size(94, 59);
            btReset.TabIndex = 2;
            btReset.Text = "Сброс";
            btReset.UseVisualStyleBackColor = true;
            btReset.Click += btReset_Click;
            // 
            // timer1
            // 
            timer1.Tick += timer1_Tick;
            // 
            // tbM
            // 
            tbM.Location = new Point(51, 124);
            tbM.Name = "tbM";
            tbM.Size = new Size(64, 27);
            tbM.TabIndex = 3;
            tbM.TextAlign = HorizontalAlignment.Center;
            tbM.KeyPress += tbM_KeyPress;
            // 
            // tbS
            // 
            tbS.Location = new Point(163, 124);
            tbS.Name = "tbS";
            tbS.Size = new Size(68, 27);
            tbS.TabIndex = 4;
            tbS.TextAlign = HorizontalAlignment.Center;
            tbS.KeyPress += tbS_KeyPress;
            // 
            // lanelm
            // 
            lanelm.AutoSize = true;
            lanelm.Location = new Point(51, 101);
            lanelm.Name = "lanelm";
            lanelm.Size = new Size(64, 20);
            lanelm.TabIndex = 5;
            lanelm.Text = "Минуты";
            // 
            // labels
            // 
            labels.AutoSize = true;
            labels.Location = new Point(163, 101);
            labels.Name = "labels";
            labels.Size = new Size(68, 20);
            labels.TabIndex = 6;
            labels.Text = "Секунды";
            // 
            // label1
            // 
            label1.Font = new Font("Segoe UI", 32F, FontStyle.Regular, GraphicsUnit.Point);
            label1.Location = new Point(125, 29);
            label1.Name = "label1";
            label1.Size = new Size(32, 61);
            label1.TabIndex = 7;
            label1.Text = ":";
            label1.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // lb2
            // 
            lb2.AutoSize = true;
            lb2.Font = new Font("Segoe UI", 32F, FontStyle.Regular, GraphicsUnit.Point);
            lb2.Location = new Point(163, 29);
            lb2.Name = "lb2";
            lb2.Size = new Size(59, 72);
            lb2.TabIndex = 8;
            lb2.Text = "0";
            lb2.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(289, 260);
            Controls.Add(lb2);
            Controls.Add(label1);
            Controls.Add(labels);
            Controls.Add(lanelm);
            Controls.Add(tbS);
            Controls.Add(tbM);
            Controls.Add(btReset);
            Controls.Add(btStart);
            Controls.Add(lb0);
            Name = "Form1";
            Text = "Таймер";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lb0;
        private Button btStart;
        private Button btReset;
        private System.Windows.Forms.Timer timer1;
        private TextBox tbM;
        private TextBox tbS;
        private Label lanelm;
        private Label labels;
        private Label label1;
        private Label lb2;
    }
}