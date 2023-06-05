namespace FirstWinF
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
            this.label1 = new System.Windows.Forms.Label();
            this.tbKurs = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.tbDollar = new System.Windows.Forms.TextBox();
            this.btResult = new System.Windows.Forms.Button();
            this.lbResult = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(40, 13);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(167, 21);
            this.label1.TabIndex = 0;
            this.label1.Text = "Введите курс доллара";
            // 
            // tbKurs
            // 
            this.tbKurs.Location = new System.Drawing.Point(40, 50);
            this.tbKurs.Margin = new System.Windows.Forms.Padding(4);
            this.tbKurs.Name = "tbKurs";
            this.tbKurs.Size = new System.Drawing.Size(312, 29);
            this.tbKurs.TabIndex = 1;
            this.tbKurs.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.tbKurs_KeyPress_1);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(40, 108);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(319, 21);
            this.label2.TabIndex = 2;
            this.label2.Text = "Введите количество долларов для покупки";
            // 
            // tbDollar
            // 
            this.tbDollar.Location = new System.Drawing.Point(40, 153);
            this.tbDollar.Margin = new System.Windows.Forms.Padding(4);
            this.tbDollar.Name = "tbDollar";
            this.tbDollar.Size = new System.Drawing.Size(312, 29);
            this.tbDollar.TabIndex = 3;
            this.tbDollar.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.tbDollar_KeyPress);
            // 
            // btResult
            // 
            this.btResult.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btResult.Location = new System.Drawing.Point(124, 218);
            this.btResult.Margin = new System.Windows.Forms.Padding(4);
            this.btResult.Name = "btResult";
            this.btResult.Size = new System.Drawing.Size(151, 44);
            this.btResult.TabIndex = 4;
            this.btResult.Text = "Рассчитать";
            this.btResult.UseVisualStyleBackColor = true;
            this.btResult.Click += new System.EventHandler(this.btResult_Click);
            // 
            // lbResult
            // 
            this.lbResult.Font = new System.Drawing.Font("Segoe UI", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lbResult.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.lbResult.Location = new System.Drawing.Point(40, 291);
            this.lbResult.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.lbResult.Name = "lbResult";
            this.lbResult.Size = new System.Drawing.Size(313, 113);
            this.lbResult.TabIndex = 5;
            this.lbResult.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 21F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(405, 421);
            this.Controls.Add(this.lbResult);
            this.Controls.Add(this.btResult);
            this.Controls.Add(this.tbDollar);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.tbKurs);
            this.Controls.Add(this.label1);
            this.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Margin = new System.Windows.Forms.Padding(4);
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Конверетер";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Label label1;
        private TextBox tbKurs;
        private Label label2;
        private TextBox tbDollar;
        private Button btResult;
        private Label lbResult;
    }
}