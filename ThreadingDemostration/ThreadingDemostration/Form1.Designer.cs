namespace ThreadingDemostration
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
            FirstProccesPB = new ProgressBar();
            FirstStartBTN = new Button();
            SecondStartBTN = new Button();
            SecondProccesPB = new ProgressBar();
            SuspendLayout();
            // 
            // FirstProccesPB
            // 
            FirstProccesPB.Location = new Point(21, 18);
            FirstProccesPB.Name = "FirstProccesPB";
            FirstProccesPB.Size = new Size(755, 37);
            FirstProccesPB.TabIndex = 0;
            // 
            // FirstStartBTN
            // 
            FirstStartBTN.Location = new Point(636, 70);
            FirstStartBTN.Name = "FirstStartBTN";
            FirstStartBTN.Size = new Size(140, 44);
            FirstStartBTN.TabIndex = 1;
            FirstStartBTN.Text = "Запуск";
            FirstStartBTN.UseVisualStyleBackColor = true;
            FirstStartBTN.Click += FirstStartBTN_Click;
            // 
            // SecondStartBTN
            // 
            SecondStartBTN.Location = new Point(636, 196);
            SecondStartBTN.Name = "SecondStartBTN";
            SecondStartBTN.Size = new Size(140, 44);
            SecondStartBTN.TabIndex = 3;
            SecondStartBTN.Text = "Запуск";
            SecondStartBTN.UseVisualStyleBackColor = true;
            SecondStartBTN.Click += SecondStartBTN_Click;
            // 
            // SecondProccesPB
            // 
            SecondProccesPB.Location = new Point(21, 144);
            SecondProccesPB.Name = "SecondProccesPB";
            SecondProccesPB.Size = new Size(755, 37);
            SecondProccesPB.TabIndex = 2;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 526);
            Controls.Add(SecondStartBTN);
            Controls.Add(SecondProccesPB);
            Controls.Add(FirstStartBTN);
            Controls.Add(FirstProccesPB);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
        }

        #endregion

        private ProgressBar FirstProccesPB;
        private Button FirstStartBTN;
        private Button SecondStartBTN;
        private ProgressBar SecondProccesPB;
    }
}