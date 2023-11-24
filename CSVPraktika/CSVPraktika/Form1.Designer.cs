namespace CSVPraktika
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
            ListDGV = new DataGridView();
            ShowBTN = new Button();
            SaveBTN = new Button();
            button1 = new Button();
            comboBox1 = new ComboBox();
            ((System.ComponentModel.ISupportInitialize)ListDGV).BeginInit();
            SuspendLayout();
            // 
            // ListDGV
            // 
            ListDGV.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            ListDGV.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            ListDGV.Location = new Point(405, 12);
            ListDGV.Name = "ListDGV";
            ListDGV.RowTemplate.Height = 25;
            ListDGV.Size = new Size(631, 525);
            ListDGV.TabIndex = 0;
            ListDGV.KeyDown += ListDGV_KeyDown;
            // 
            // ShowBTN
            // 
            ShowBTN.Location = new Point(248, 12);
            ShowBTN.Name = "ShowBTN";
            ShowBTN.Size = new Size(139, 43);
            ShowBTN.TabIndex = 1;
            ShowBTN.Text = "Считать";
            ShowBTN.UseVisualStyleBackColor = true;
            ShowBTN.Click += ShowBTN_Click;
            // 
            // SaveBTN
            // 
            SaveBTN.Location = new Point(248, 84);
            SaveBTN.Name = "SaveBTN";
            SaveBTN.Size = new Size(139, 45);
            SaveBTN.TabIndex = 2;
            SaveBTN.Text = "Сохранить";
            SaveBTN.UseVisualStyleBackColor = true;
            SaveBTN.Click += SaveBTN_Click;
            // 
            // button1
            // 
            button1.Location = new Point(307, 206);
            button1.Name = "button1";
            button1.Size = new Size(75, 23);
            button1.TabIndex = 4;
            button1.Text = "button1";
            button1.UseVisualStyleBackColor = true;
            button1.Click += button1_Click;
            // 
            // comboBox1
            // 
            comboBox1.FormattingEnabled = true;
            comboBox1.Location = new Point(12, 23);
            comboBox1.Name = "comboBox1";
            comboBox1.Size = new Size(121, 23);
            comboBox1.TabIndex = 5;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1048, 570);
            Controls.Add(comboBox1);
            Controls.Add(button1);
            Controls.Add(SaveBTN);
            Controls.Add(ShowBTN);
            Controls.Add(ListDGV);
            Name = "Form1";
            Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)ListDGV).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private DataGridView ListDGV;
        private Button ShowBTN;
        private Button SaveBTN;
        private Button button1;
        private ComboBox comboBox1;
    }
}