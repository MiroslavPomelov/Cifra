namespace WordOperation
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
            filePathTB = new TextBox();
            extBoldnessCB = new CheckBox();
            label2 = new Label();
            label3 = new Label();
            paragraphTB = new TextBox();
            label4 = new Label();
            fontColorCB = new ComboBox();
            label5 = new Label();
            textSizeTB = new TextBox();
            addParagraphBTN = new Button();
            saveBTN = new Button();
            OpenBTN = new Button();
            openFileDialog1 = new OpenFileDialog();
            fontStyleTB = new ComboBox();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(15, 14);
            label1.Name = "label1";
            label1.Size = new Size(76, 15);
            label1.TabIndex = 0;
            label1.Text = "Путь к фалу:";
            // 
            // filePathTB
            // 
            filePathTB.Location = new Point(12, 32);
            filePathTB.Name = "filePathTB";
            filePathTB.Size = new Size(330, 23);
            filePathTB.TabIndex = 1;
            // 
            // extBoldnessCB
            // 
            extBoldnessCB.AutoSize = true;
            extBoldnessCB.Location = new Point(498, 34);
            extBoldnessCB.Name = "extBoldnessCB";
            extBoldnessCB.Size = new Size(74, 19);
            extBoldnessCB.TabIndex = 2;
            extBoldnessCB.Text = "Жирный";
            extBoldnessCB.UseVisualStyleBackColor = true;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(15, 68);
            label2.Name = "label2";
            label2.Size = new Size(62, 15);
            label2.TabIndex = 3;
            label2.Text = "Параграф";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(401, 87);
            label3.Name = "label3";
            label3.Size = new Size(46, 15);
            label3.TabIndex = 5;
            label3.Text = "Шрифт";
            // 
            // paragraphTB
            // 
            paragraphTB.Location = new Point(12, 87);
            paragraphTB.Multiline = true;
            paragraphTB.Name = "paragraphTB";
            paragraphTB.Size = new Size(330, 351);
            paragraphTB.TabIndex = 6;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(401, 138);
            label4.Name = "label4";
            label4.Size = new Size(33, 15);
            label4.TabIndex = 8;
            label4.Text = "Цвет";
            // 
            // fontColorCB
            // 
            fontColorCB.FormattingEnabled = true;
            fontColorCB.Items.AddRange(new object[] { "Черный", "Синий", "Зеленый", "Красный" });
            fontColorCB.Location = new Point(401, 156);
            fontColorCB.Name = "fontColorCB";
            fontColorCB.Size = new Size(174, 23);
            fontColorCB.TabIndex = 7;
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(400, 193);
            label5.Name = "label5";
            label5.Size = new Size(47, 15);
            label5.TabIndex = 10;
            label5.Text = "Размер";
            // 
            // textSizeTB
            // 
            textSizeTB.Location = new Point(400, 211);
            textSizeTB.Name = "textSizeTB";
            textSizeTB.Size = new Size(172, 23);
            textSizeTB.TabIndex = 12;
            // 
            // addParagraphBTN
            // 
            addParagraphBTN.Location = new Point(400, 255);
            addParagraphBTN.Name = "addParagraphBTN";
            addParagraphBTN.Size = new Size(174, 44);
            addParagraphBTN.TabIndex = 13;
            addParagraphBTN.Text = "Добавить параграф";
            addParagraphBTN.UseVisualStyleBackColor = true;
            addParagraphBTN.Click += addParagraphBTN_Click;
            // 
            // saveBTN
            // 
            saveBTN.Location = new Point(454, 400);
            saveBTN.Name = "saveBTN";
            saveBTN.Size = new Size(118, 38);
            saveBTN.TabIndex = 14;
            saveBTN.Text = "Сохранить";
            saveBTN.UseVisualStyleBackColor = true;
            saveBTN.Click += saveBTN_Click;
            // 
            // OpenBTN
            // 
            OpenBTN.Location = new Point(359, 31);
            OpenBTN.Name = "OpenBTN";
            OpenBTN.Size = new Size(88, 24);
            OpenBTN.TabIndex = 15;
            OpenBTN.Text = "Открыть";
            OpenBTN.UseVisualStyleBackColor = true;
            OpenBTN.Click += OpenBTN_Click;
            // 
            // openFileDialog1
            // 
            openFileDialog1.FileName = "openFileDialog1";
            // 
            // fontStyleTB
            // 
            fontStyleTB.FormattingEnabled = true;
            fontStyleTB.Items.AddRange(new object[] { "Arial", "Calibri", "Times New Roman" });
            fontStyleTB.Location = new Point(406, 110);
            fontStyleTB.Name = "fontStyleTB";
            fontStyleTB.Size = new Size(166, 23);
            fontStyleTB.TabIndex = 16;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(588, 450);
            Controls.Add(fontStyleTB);
            Controls.Add(OpenBTN);
            Controls.Add(saveBTN);
            Controls.Add(addParagraphBTN);
            Controls.Add(textSizeTB);
            Controls.Add(label5);
            Controls.Add(label4);
            Controls.Add(fontColorCB);
            Controls.Add(paragraphTB);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(extBoldnessCB);
            Controls.Add(filePathTB);
            Controls.Add(label1);
            Name = "Form1";
            Text = "Form1";
            FormClosed += Form1_FormClosed;
            Load += Form1_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private TextBox filePathTB;
        private CheckBox extBoldnessCB;
        private Label label2;
        private ComboBox comboBox1;
        private Label label3;
        private TextBox paragraphTB;
        private Label label4;
        private ComboBox fontColorCB;
        private Label label5;
        private TextBox textSizeTB;
        private Button addParagraphBTN;
        private ComboBox comboBox3;
        private Button saveBTN;
        private Button OpenBTN;
        private OpenFileDialog openFileDialog1;
        private ComboBox fontStyleTB;
    }
}