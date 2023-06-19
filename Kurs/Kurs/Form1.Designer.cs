namespace Kurs
{
    partial class frmKurs
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
            this.dtpDate = new System.Windows.Forms.DateTimePicker();
            this.btAdd = new System.Windows.Forms.Button();
            this.nudRubles = new System.Windows.Forms.NumericUpDown();
            this.nudCop = new System.Windows.Forms.NumericUpDown();
            this.cbCurrent = new System.Windows.Forms.ComboBox();
            ((System.ComponentModel.ISupportInitialize)(this.nudRubles)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.nudCop)).BeginInit();
            this.SuspendLayout();
            // 
            // dtpDate
            // 
            this.dtpDate.Location = new System.Drawing.Point(55, 37);
            this.dtpDate.Name = "dtpDate";
            this.dtpDate.Size = new System.Drawing.Size(200, 23);
            this.dtpDate.TabIndex = 0;
            // 
            // btAdd
            // 
            this.btAdd.Location = new System.Drawing.Point(111, 176);
            this.btAdd.Name = "btAdd";
            this.btAdd.Size = new System.Drawing.Size(86, 32);
            this.btAdd.TabIndex = 2;
            this.btAdd.Text = "Добавить";
            this.btAdd.UseVisualStyleBackColor = true;
            this.btAdd.Click += new System.EventHandler(this.btAdd_Click);
            // 
            // nudRubles
            // 
            this.nudRubles.Location = new System.Drawing.Point(55, 131);
            this.nudRubles.Name = "nudRubles";
            this.nudRubles.Size = new System.Drawing.Size(92, 23);
            this.nudRubles.TabIndex = 3;
            // 
            // nudCop
            // 
            this.nudCop.Location = new System.Drawing.Point(166, 131);
            this.nudCop.Name = "nudCop";
            this.nudCop.Size = new System.Drawing.Size(89, 23);
            this.nudCop.TabIndex = 4;
            // 
            // cbCurrent
            // 
            this.cbCurrent.FormattingEnabled = true;
            this.cbCurrent.Items.AddRange(new object[] {
            "USD",
            "EURO",
            "POUND"});
            this.cbCurrent.Location = new System.Drawing.Point(55, 82);
            this.cbCurrent.Name = "cbCurrent";
            this.cbCurrent.Size = new System.Drawing.Size(200, 23);
            this.cbCurrent.TabIndex = 5;
            // 
            // frmKurs
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(539, 331);
            this.Controls.Add(this.cbCurrent);
            this.Controls.Add(this.nudCop);
            this.Controls.Add(this.nudRubles);
            this.Controls.Add(this.btAdd);
            this.Controls.Add(this.dtpDate);
            this.Name = "frmKurs";
            this.Text = "Курс Валют";
            ((System.ComponentModel.ISupportInitialize)(this.nudRubles)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.nudCop)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private DateTimePicker dtpDate;
        private Button btAdd;
        private NumericUpDown nudRubles;
        private NumericUpDown nudCop;
        private ComboBox cbCurrent;
    }
}