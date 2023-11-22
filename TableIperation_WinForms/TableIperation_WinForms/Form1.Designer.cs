namespace TableIperation_WinForms
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
            DataGridDGV = new DataGridView();
            label1 = new Label();
            UserNameTb = new TextBox();
            UserSurnameTb = new TextBox();
            label2 = new Label();
            UserAgesTb = new TextBox();
            label3 = new Label();
            AddBTN = new Button();
            UploadListBTN = new Button();
            AddColumnBTN = new Button();
            ColumnNameTB = new TextBox();
            ColumnTextTB = new TextBox();
            UserNames = new DataGridViewTextBoxColumn();
            Surnames = new DataGridViewTextBoxColumn();
            Ages = new DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)DataGridDGV).BeginInit();
            SuspendLayout();
            // 
            // DataGridDGV
            // 
            DataGridDGV.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            DataGridDGV.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            DataGridDGV.Columns.AddRange(new DataGridViewColumn[] { UserNames, Surnames, Ages });
            DataGridDGV.Location = new Point(12, 23);
            DataGridDGV.Name = "DataGridDGV";
            DataGridDGV.RowTemplate.Height = 25;
            DataGridDGV.Size = new Size(501, 468);
            DataGridDGV.TabIndex = 0;
            DataGridDGV.KeyDown += DataGridDGV_KeyDown;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(532, 23);
            label1.Name = "label1";
            label1.Size = new Size(31, 15);
            label1.TabIndex = 1;
            label1.Text = "Имя";
            // 
            // UserNameTb
            // 
            UserNameTb.Location = new Point(532, 41);
            UserNameTb.Name = "UserNameTb";
            UserNameTb.Size = new Size(255, 23);
            UserNameTb.TabIndex = 2;
            // 
            // UserSurnameTb
            // 
            UserSurnameTb.Location = new Point(532, 93);
            UserSurnameTb.Name = "UserSurnameTb";
            UserSurnameTb.Size = new Size(255, 23);
            UserSurnameTb.TabIndex = 4;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(532, 75);
            label2.Name = "label2";
            label2.Size = new Size(58, 15);
            label2.TabIndex = 3;
            label2.Text = "Фамилия";
            // 
            // UserAgesTb
            // 
            UserAgesTb.Location = new Point(532, 145);
            UserAgesTb.Name = "UserAgesTb";
            UserAgesTb.Size = new Size(255, 23);
            UserAgesTb.TabIndex = 6;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(532, 127);
            label3.Name = "label3";
            label3.Size = new Size(50, 15);
            label3.TabIndex = 5;
            label3.Text = "Возраст";
            // 
            // AddBTN
            // 
            AddBTN.Location = new Point(613, 187);
            AddBTN.Name = "AddBTN";
            AddBTN.Size = new Size(174, 43);
            AddBTN.TabIndex = 7;
            AddBTN.Text = "Добавить";
            AddBTN.UseVisualStyleBackColor = true;
            AddBTN.Click += AddBTN_Click;
            // 
            // UploadListBTN
            // 
            UploadListBTN.Location = new Point(613, 236);
            UploadListBTN.Name = "UploadListBTN";
            UploadListBTN.Size = new Size(174, 43);
            UploadListBTN.TabIndex = 8;
            UploadListBTN.Text = "Выгрузить список";
            UploadListBTN.UseVisualStyleBackColor = true;
            UploadListBTN.Click += UploadListBTN_Click;
            // 
            // AddColumnBTN
            // 
            AddColumnBTN.Location = new Point(712, 432);
            AddColumnBTN.Name = "AddColumnBTN";
            AddColumnBTN.Size = new Size(75, 59);
            AddColumnBTN.TabIndex = 9;
            AddColumnBTN.UseVisualStyleBackColor = true;
            AddColumnBTN.Click += AddColumnBTN_Click;
            // 
            // ColumnNameTB
            // 
            ColumnNameTB.Location = new Point(532, 432);
            ColumnNameTB.Name = "ColumnNameTB";
            ColumnNameTB.Size = new Size(174, 23);
            ColumnNameTB.TabIndex = 10;
            // 
            // ColumnTextTB
            // 
            ColumnTextTB.Location = new Point(532, 468);
            ColumnTextTB.Name = "ColumnTextTB";
            ColumnTextTB.Size = new Size(174, 23);
            ColumnTextTB.TabIndex = 11;
            // 
            // UserNames
            // 
            UserNames.HeaderText = "Имена пользователей";
            UserNames.Name = "UserNames";
            // 
            // Surnames
            // 
            Surnames.HeaderText = "Фамилии пользователей";
            Surnames.Name = "Surnames";
            // 
            // Ages
            // 
            Ages.HeaderText = "Возраст";
            Ages.Name = "Ages";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(799, 503);
            Controls.Add(ColumnTextTB);
            Controls.Add(ColumnNameTB);
            Controls.Add(AddColumnBTN);
            Controls.Add(UploadListBTN);
            Controls.Add(AddBTN);
            Controls.Add(UserAgesTb);
            Controls.Add(label3);
            Controls.Add(UserSurnameTb);
            Controls.Add(label2);
            Controls.Add(UserNameTb);
            Controls.Add(label1);
            Controls.Add(DataGridDGV);
            Name = "Form1";
            Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)DataGridDGV).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private DataGridView DataGridDGV;
        private Label label1;
        private TextBox UserNameTb;
        private TextBox UserSurnameTb;
        private Label label2;
        private TextBox UserAgesTb;
        private Label label3;
        private Button AddBTN;
        private Button UploadListBTN;
        private Button AddColumnBTN;
        private TextBox ColumnNameTB;
        private TextBox ColumnTextTB;
        private DataGridViewTextBoxColumn UserNames;
        private DataGridViewTextBoxColumn Surnames;
        private DataGridViewTextBoxColumn Ages;
    }
}