namespace FileForm
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.lbFiles = new System.Windows.Forms.ListBox();
            this.brBrowse = new System.Windows.Forms.Button();
            this.pbImage = new System.Windows.Forms.PictureBox();
            this.lbPath = new System.Windows.Forms.Label();
            this.cbExtension = new System.Windows.Forms.ComboBox();
            this.btNext = new System.Windows.Forms.Button();
            this.btPrev = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.pbImage)).BeginInit();
            this.SuspendLayout();
            // 
            // lbFiles
            // 
            this.lbFiles.FormattingEnabled = true;
            this.lbFiles.ItemHeight = 30;
            this.lbFiles.Location = new System.Drawing.Point(21, 24);
            this.lbFiles.Margin = new System.Windows.Forms.Padding(5, 6, 5, 6);
            this.lbFiles.Name = "lbFiles";
            this.lbFiles.Size = new System.Drawing.Size(253, 304);
            this.lbFiles.TabIndex = 0;
            this.lbFiles.SelectedIndexChanged += new System.EventHandler(this.lbFiles_SelectedIndexChanged);
            // 
            // brBrowse
            // 
            this.brBrowse.Location = new System.Drawing.Point(21, 340);
            this.brBrowse.Margin = new System.Windows.Forms.Padding(5, 6, 5, 6);
            this.brBrowse.Name = "brBrowse";
            this.brBrowse.Size = new System.Drawing.Size(99, 38);
            this.brBrowse.TabIndex = 1;
            this.brBrowse.Text = "Обзор";
            this.brBrowse.UseVisualStyleBackColor = true;
            this.brBrowse.Click += new System.EventHandler(this.brBrowse_Click);
            // 
            // pbImage
            // 
            this.pbImage.Location = new System.Drawing.Point(295, 24);
            this.pbImage.Name = "pbImage";
            this.pbImage.Size = new System.Drawing.Size(427, 304);
            this.pbImage.TabIndex = 2;
            this.pbImage.TabStop = false;
            // 
            // lbPath
            // 
            this.lbPath.AutoSize = true;
            this.lbPath.Location = new System.Drawing.Point(295, 356);
            this.lbPath.Name = "lbPath";
            this.lbPath.Size = new System.Drawing.Size(0, 30);
            this.lbPath.TabIndex = 3;
            // 
            // cbExtension
            // 
            this.cbExtension.FormattingEnabled = true;
            this.cbExtension.Items.AddRange(new object[] {
            "*.png",
            "*.jpg",
            "*.bmp"});
            this.cbExtension.Location = new System.Drawing.Point(128, 340);
            this.cbExtension.Name = "cbExtension";
            this.cbExtension.Size = new System.Drawing.Size(146, 38);
            this.cbExtension.TabIndex = 4;
            // 
            // btNext
            // 
            this.btNext.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("btNext.BackgroundImage")));
            this.btNext.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btNext.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btNext.Location = new System.Drawing.Point(128, 398);
            this.btNext.Name = "btNext";
            this.btNext.Size = new System.Drawing.Size(98, 42);
            this.btNext.TabIndex = 5;
            this.btNext.UseVisualStyleBackColor = true;
            this.btNext.Click += new System.EventHandler(this.btNext_Click);
            // 
            // btPrev
            // 
            this.btPrev.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("btPrev.BackgroundImage")));
            this.btPrev.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btPrev.Location = new System.Drawing.Point(21, 398);
            this.btPrev.Name = "btPrev";
            this.btPrev.Size = new System.Drawing.Size(99, 42);
            this.btPrev.TabIndex = 6;
            this.btPrev.UseVisualStyleBackColor = true;
            this.btPrev.Click += new System.EventHandler(this.btPrev_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(12F, 30F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(766, 463);
            this.Controls.Add(this.btPrev);
            this.Controls.Add(this.btNext);
            this.Controls.Add(this.cbExtension);
            this.Controls.Add(this.lbPath);
            this.Controls.Add(this.pbImage);
            this.Controls.Add(this.brBrowse);
            this.Controls.Add(this.lbFiles);
            this.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.Margin = new System.Windows.Forms.Padding(5, 6, 5, 6);
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Галерея";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.pbImage)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private ListBox lbFiles;
        private Button brBrowse;
        private PictureBox pbImage;
        private Label lbPath;
        private ComboBox cbExtension;
        private Button btNext;
        private Button btPrev;
    }
}