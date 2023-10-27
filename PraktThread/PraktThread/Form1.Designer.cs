namespace PraktThread
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
            label2 = new Label();
            label3 = new Label();
            label4 = new Label();
            PlayerLBL = new Label();
            LeftMoveBTN = new Button();
            RightMoveBTN = new Button();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI", 60F, FontStyle.Regular, GraphicsUnit.Point);
            label1.Location = new Point(78, 18);
            label1.Name = "label1";
            label1.Size = new Size(116, 106);
            label1.TabIndex = 2;
            label1.Text = "❆";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Segoe UI", 60F, FontStyle.Regular, GraphicsUnit.Point);
            label2.Location = new Point(249, 18);
            label2.Name = "label2";
            label2.Size = new Size(116, 106);
            label2.TabIndex = 3;
            label2.Text = "❆";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Font = new Font("Segoe UI", 60F, FontStyle.Regular, GraphicsUnit.Point);
            label3.Location = new Point(424, 18);
            label3.Name = "label3";
            label3.Size = new Size(116, 106);
            label3.TabIndex = 4;
            label3.Text = "❆";
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Font = new Font("Segoe UI", 60F, FontStyle.Regular, GraphicsUnit.Point);
            label4.Location = new Point(589, 18);
            label4.Name = "label4";
            label4.Size = new Size(116, 106);
            label4.TabIndex = 5;
            label4.Text = "❆";
            // 
            // PlayerLBL
            // 
            PlayerLBL.AutoSize = true;
            PlayerLBL.Font = new Font("Segoe UI", 35F, FontStyle.Regular, GraphicsUnit.Point);
            PlayerLBL.Location = new Point(353, 260);
            PlayerLBL.Name = "PlayerLBL";
            PlayerLBL.Size = new Size(86, 62);
            PlayerLBL.TabIndex = 6;
            PlayerLBL.Text = "🏂";
            // 
            // LeftMoveBTN
            // 
            LeftMoveBTN.Font = new Font("Segoe UI", 30F, FontStyle.Regular, GraphicsUnit.World);
            LeftMoveBTN.Location = new Point(262, 358);
            LeftMoveBTN.Name = "LeftMoveBTN";
            LeftMoveBTN.Size = new Size(75, 62);
            LeftMoveBTN.TabIndex = 7;
            LeftMoveBTN.Text = "⭰";
            LeftMoveBTN.UseVisualStyleBackColor = true;
            LeftMoveBTN.Click += LeftMoveBTN_Click;
            // 
            // RightMoveBTN
            // 
            RightMoveBTN.Font = new Font("Segoe UI", 30F, FontStyle.Regular, GraphicsUnit.Point);
            RightMoveBTN.Location = new Point(451, 358);
            RightMoveBTN.Name = "RightMoveBTN";
            RightMoveBTN.Size = new Size(75, 62);
            RightMoveBTN.TabIndex = 8;
            RightMoveBTN.Text = "→";
            RightMoveBTN.UseVisualStyleBackColor = true;
            RightMoveBTN.Click += RightMoveBTN_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(RightMoveBTN);
            Controls.Add(LeftMoveBTN);
            Controls.Add(PlayerLBL);
            Controls.Add(label4);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(label1);
            Name = "Form1";
            Text = "Form1";
            Load += Form1_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        private Label label1;
        private Label label2;
        private Label label3;
        private Label label4;
        private Label PlayerLBL;
        private Button LeftMoveBTN;
        private Button RightMoveBTN;
    }
}