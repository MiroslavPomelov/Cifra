namespace WinF2
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
            label1 = new Label();
            lbTotal = new Label();
            checkBox_abs = new CheckBox();
            checkBox_cond = new CheckBox();
            checkBox_electro = new CheckBox();
            tb_abs = new TextBox();
            tb_cond = new TextBox();
            tb_electro = new TextBox();
            pictureBox1 = new PictureBox();
            labelname = new Label();
            label_result = new Label();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI", 14F, FontStyle.Bold, GraphicsUnit.Point);
            label1.Location = new Point(28, 23);
            label1.Name = "label1";
            label1.Size = new Size(174, 32);
            label1.TabIndex = 0;
            label1.Text = "Mercdez Benz";
            // 
            // lbTotal
            // 
            lbTotal.Location = new Point(28, 147);
            lbTotal.Name = "lbTotal";
            lbTotal.Size = new Size(427, 190);
            lbTotal.TabIndex = 2;
            lbTotal.Text = "Выберите комплектацию";
            // 
            // checkBox_abs
            // 
            checkBox_abs.AutoSize = true;
            checkBox_abs.Location = new Point(43, 187);
            checkBox_abs.Name = "checkBox_abs";
            checkBox_abs.Size = new Size(56, 24);
            checkBox_abs.TabIndex = 3;
            checkBox_abs.Text = "Abs";
            checkBox_abs.UseVisualStyleBackColor = true;
            checkBox_abs.CheckedChanged += checkBox_abs_CheckedChanged;
            // 
            // checkBox_cond
            // 
            checkBox_cond.AutoSize = true;
            checkBox_cond.Location = new Point(43, 223);
            checkBox_cond.Name = "checkBox_cond";
            checkBox_cond.Size = new Size(128, 24);
            checkBox_cond.TabIndex = 4;
            checkBox_cond.Text = "Кондиционер";
            checkBox_cond.UseVisualStyleBackColor = true;
            checkBox_cond.CheckedChanged += checkBox_cond_CheckedChanged;
            // 
            // checkBox_electro
            // 
            checkBox_electro.AutoSize = true;
            checkBox_electro.Location = new Point(43, 259);
            checkBox_electro.Name = "checkBox_electro";
            checkBox_electro.Size = new Size(166, 24);
            checkBox_electro.TabIndex = 5;
            checkBox_electro.Text = "Электроподъемник";
            checkBox_electro.UseVisualStyleBackColor = true;
            checkBox_electro.CheckedChanged += checkBox1_CheckedChanged;
            // 
            // tb_abs
            // 
            tb_abs.Location = new Point(278, 187);
            tb_abs.Name = "tb_abs";
            tb_abs.Size = new Size(125, 27);
            tb_abs.TabIndex = 6;
            // 
            // tb_cond
            // 
            tb_cond.Location = new Point(278, 221);
            tb_cond.Name = "tb_cond";
            tb_cond.Size = new Size(125, 27);
            tb_cond.TabIndex = 7;
            // 
            // tb_electro
            // 
            tb_electro.Location = new Point(278, 256);
            tb_electro.Name = "tb_electro";
            tb_electro.Size = new Size(125, 27);
            tb_electro.TabIndex = 8;
            // 
            // pictureBox1
            // 
            pictureBox1.Image = Properties.Resources.download_mercedes_benz_png_pic_transparent_png_28;
            pictureBox1.Location = new Point(495, 51);
            pictureBox1.Name = "pictureBox1";
            pictureBox1.Size = new Size(307, 254);
            pictureBox1.SizeMode = PictureBoxSizeMode.Zoom;
            pictureBox1.TabIndex = 9;
            pictureBox1.TabStop = false;
            // 
            // labelname
            // 
            labelname.AutoSize = true;
            labelname.Location = new Point(28, 85);
            labelname.Name = "labelname";
            labelname.Size = new Size(175, 20);
            labelname.TabIndex = 10;
            labelname.Text = "Базавая комплектация: ";
            // 
            // label_result
            // 
            label_result.Location = new Point(56, 348);
            label_result.Name = "label_result";
            label_result.Size = new Size(746, 142);
            label_result.TabIndex = 11;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(897, 525);
            Controls.Add(label_result);
            Controls.Add(labelname);
            Controls.Add(pictureBox1);
            Controls.Add(tb_electro);
            Controls.Add(tb_cond);
            Controls.Add(tb_abs);
            Controls.Add(checkBox_electro);
            Controls.Add(checkBox_cond);
            Controls.Add(checkBox_abs);
            Controls.Add(lbTotal);
            Controls.Add(label1);
            Name = "Form1";
            Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private Label lbTotal;
        private CheckBox checkBox_abs;
        private CheckBox checkBox_cond;
        private CheckBox checkBox_electro;
        private TextBox tb_abs;
        private TextBox tb_cond;
        private TextBox tb_electro;
        private PictureBox pictureBox1;
        private Label labelname;
        private Label label_result;
    }
}