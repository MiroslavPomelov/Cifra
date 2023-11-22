namespace DGW_Excel_Operations
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
            DGWStudents = new DataGridView();
            OpenBTN = new Button();
            SaveBTN = new Button();
            ((System.ComponentModel.ISupportInitialize)DGWStudents).BeginInit();
            SuspendLayout();
            // 
            // DGWStudents
            // 
            DGWStudents.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            DGWStudents.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            DGWStudents.Location = new Point(12, 12);
            DGWStudents.Name = "DGWStudents";
            DGWStudents.RowTemplate.Height = 25;
            DGWStudents.Size = new Size(669, 361);
            DGWStudents.TabIndex = 0;
            // 
            // OpenBTN
            // 
            OpenBTN.Location = new Point(40, 403);
            OpenBTN.Name = "OpenBTN";
            OpenBTN.Size = new Size(115, 35);
            OpenBTN.TabIndex = 1;
            OpenBTN.Text = "Открыть";
            OpenBTN.UseVisualStyleBackColor = true;
            // 
            // SaveBTN
            // 
            SaveBTN.Location = new Point(186, 403);
            SaveBTN.Name = "SaveBTN";
            SaveBTN.Size = new Size(98, 35);
            SaveBTN.TabIndex = 2;
            SaveBTN.Text = "Сохранить";
            SaveBTN.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(SaveBTN);
            Controls.Add(OpenBTN);
            Controls.Add(DGWStudents);
            Name = "Form1";
            Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)DGWStudents).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private DataGridView DGWStudents;
        private Button OpenBTN;
        private Button SaveBTN;
    }
}