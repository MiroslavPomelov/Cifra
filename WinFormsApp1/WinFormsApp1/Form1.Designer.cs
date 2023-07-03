namespace WinFormsApp1
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
            plKurs = new Panel();
            btLoad = new Button();
            btSave = new Button();
            dgvKurs = new DataGridView();
            ColumnData = new DataGridViewTextBoxColumn();
            ColumnKurs = new DataGridViewTextBoxColumn();
            btRefresh = new Button();
            ((System.ComponentModel.ISupportInitialize)dgvKurs).BeginInit();
            SuspendLayout();
            // 
            // plKurs
            // 
            plKurs.Anchor = AnchorStyles.Right;
            plKurs.AutoSize = true;
            plKurs.Location = new Point(325, 12);
            plKurs.Name = "plKurs";
            plKurs.Size = new Size(463, 368);
            plKurs.TabIndex = 1;
            // 
            // btLoad
            // 
            btLoad.Anchor = AnchorStyles.Bottom;
            btLoad.AutoSize = true;
            btLoad.Location = new Point(4, 397);
            btLoad.Name = "btLoad";
            btLoad.Size = new Size(132, 41);
            btLoad.TabIndex = 2;
            btLoad.Text = "Load";
            btLoad.UseVisualStyleBackColor = true;
            btLoad.Click += btLoad_Click;
            // 
            // btSave
            // 
            btSave.Anchor = AnchorStyles.Bottom;
            btSave.AutoSize = true;
            btSave.Location = new Point(168, 397);
            btSave.Name = "btSave";
            btSave.Size = new Size(136, 41);
            btSave.TabIndex = 3;
            btSave.Text = "Save";
            btSave.UseVisualStyleBackColor = true;
            btSave.Click += btSave_Click;
            // 
            // dgvKurs
            // 
            dgvKurs.Anchor = AnchorStyles.Left;
            dgvKurs.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgvKurs.Columns.AddRange(new DataGridViewColumn[] { ColumnData, ColumnKurs });
            dgvKurs.Location = new Point(4, 12);
            dgvKurs.Name = "dgvKurs";
            dgvKurs.RowHeadersWidth = 51;
            dgvKurs.RowTemplate.Height = 29;
            dgvKurs.Size = new Size(300, 368);
            dgvKurs.TabIndex = 4;
            dgvKurs.CellValueChanged += dgvKurs_CellValueChanged;
            // 
            // ColumnData
            // 
            ColumnData.HeaderText = "Дата";
            ColumnData.MinimumWidth = 6;
            ColumnData.Name = "ColumnData";
            ColumnData.Width = 125;
            // 
            // ColumnKurs
            // 
            ColumnKurs.HeaderText = "Курс";
            ColumnKurs.MinimumWidth = 6;
            ColumnKurs.Name = "ColumnKurs";
            ColumnKurs.Width = 125;
            // 
            // btRefresh
            // 
            btRefresh.Location = new Point(527, 408);
            btRefresh.Name = "btRefresh";
            btRefresh.Size = new Size(94, 29);
            btRefresh.TabIndex = 5;
            btRefresh.Text = "Refresh";
            btRefresh.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            AutoSize = true;
            ClientSize = new Size(800, 450);
            Controls.Add(btRefresh);
            Controls.Add(dgvKurs);
            Controls.Add(btSave);
            Controls.Add(btLoad);
            Controls.Add(plKurs);
            Name = "Form1";
            Text = "Form1";
            SizeChanged += Form1_SizeChanged;
            ((System.ComponentModel.ISupportInitialize)dgvKurs).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        private Panel plKurs;
        private Button btLoad;
        private Button btSave;
        private DataGridView dgvKurs;
        private DataGridViewTextBoxColumn ColumnData;
        private DataGridViewTextBoxColumn ColumnKurs;
        private Button btRefresh;
    }
}