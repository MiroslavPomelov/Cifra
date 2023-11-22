namespace DGV_DataSource
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
            DataGridDGW = new DataGridView();
            UploadDataBTN = new Button();
            ((System.ComponentModel.ISupportInitialize)DataGridDGW).BeginInit();
            SuspendLayout();
            // 
            // DataGridDGW
            // 
            DataGridDGW.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            DataGridDGW.Location = new Point(24, 28);
            DataGridDGW.Name = "DataGridDGW";
            DataGridDGW.RowTemplate.Height = 25;
            DataGridDGW.Size = new Size(753, 373);
            DataGridDGW.TabIndex = 0;
            // 
            // UploadDataBTN
            // 
            UploadDataBTN.Location = new Point(536, 415);
            UploadDataBTN.Name = "UploadDataBTN";
            UploadDataBTN.Size = new Size(241, 23);
            UploadDataBTN.TabIndex = 1;
            UploadDataBTN.Text = "Выгрузка данных";
            UploadDataBTN.UseVisualStyleBackColor = true;
            UploadDataBTN.Click += UploadDataBTN_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(UploadDataBTN);
            Controls.Add(DataGridDGW);
            Name = "Form1";
            Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)DataGridDGW).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private DataGridView DataGridDGW;
        private Button UploadDataBTN;
    }
}