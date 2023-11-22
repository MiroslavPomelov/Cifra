namespace DGV_Practice_1
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
            DaraGridView = new DataGridView();
            label1 = new Label();
            StudentNameTB = new TextBox();
            StudentSurnameTB = new TextBox();
            label2 = new Label();
            StudentAgeTB = new TextBox();
            label3 = new Label();
            AddBTN = new Button();
            AddToListBTN = new Button();
            StudentName = new DataGridViewTextBoxColumn();
            SrudentSurname = new DataGridViewTextBoxColumn();
            Age = new DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)DaraGridView).BeginInit();
            SuspendLayout();
            // 
            // DaraGridView
            // 
            DaraGridView.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            DaraGridView.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            DaraGridView.Columns.AddRange(new DataGridViewColumn[] { StudentName, SrudentSurname, Age });
            DaraGridView.Location = new Point(26, 22);
            DaraGridView.Name = "DaraGridView";
            DaraGridView.RowTemplate.Height = 25;
            DaraGridView.Size = new Size(534, 396);
            DaraGridView.TabIndex = 0;
            DaraGridView.KeyDown += DaraGridView_KeyDown;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(566, 22);
            label1.Name = "label1";
            label1.Size = new Size(34, 15);
            label1.TabIndex = 1;
            label1.Text = "Имя:";
            // 
            // StudentNameTB
            // 
            StudentNameTB.Location = new Point(566, 50);
            StudentNameTB.Name = "StudentNameTB";
            StudentNameTB.Size = new Size(222, 23);
            StudentNameTB.TabIndex = 2;
            // 
            // StudentSurnameTB
            // 
            StudentSurnameTB.Location = new Point(566, 109);
            StudentSurnameTB.Name = "StudentSurnameTB";
            StudentSurnameTB.Size = new Size(222, 23);
            StudentSurnameTB.TabIndex = 4;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(566, 81);
            label2.Name = "label2";
            label2.Size = new Size(61, 15);
            label2.TabIndex = 3;
            label2.Text = "Фамилия:";
            // 
            // StudentAgeTB
            // 
            StudentAgeTB.Location = new Point(566, 171);
            StudentAgeTB.Name = "StudentAgeTB";
            StudentAgeTB.Size = new Size(222, 23);
            StudentAgeTB.TabIndex = 6;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(566, 143);
            label3.Name = "label3";
            label3.Size = new Size(53, 15);
            label3.TabIndex = 5;
            label3.Text = "Возраст:";
            // 
            // AddBTN
            // 
            AddBTN.Location = new Point(658, 213);
            AddBTN.Name = "AddBTN";
            AddBTN.Size = new Size(130, 48);
            AddBTN.TabIndex = 7;
            AddBTN.Text = "Добавить";
            AddBTN.UseVisualStyleBackColor = true;
            AddBTN.Click += AddBTN_Click;
            // 
            // AddToListBTN
            // 
            AddToListBTN.Location = new Point(658, 267);
            AddToListBTN.Name = "AddToListBTN";
            AddToListBTN.Size = new Size(130, 47);
            AddToListBTN.TabIndex = 8;
            AddToListBTN.Text = "Выгрузить список";
            AddToListBTN.UseVisualStyleBackColor = true;
            AddToListBTN.Click += AddToListBTN_Click;
            // 
            // StudentName
            // 
            StudentName.HeaderText = "Имя";
            StudentName.Name = "StudentName";
            // 
            // SrudentSurname
            // 
            SrudentSurname.HeaderText = "Фамилия";
            SrudentSurname.Name = "SrudentSurname";
            // 
            // Age
            // 
            Age.HeaderText = "Возраст";
            Age.Name = "Age";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(AddToListBTN);
            Controls.Add(AddBTN);
            Controls.Add(StudentAgeTB);
            Controls.Add(label3);
            Controls.Add(StudentSurnameTB);
            Controls.Add(label2);
            Controls.Add(StudentNameTB);
            Controls.Add(label1);
            Controls.Add(DaraGridView);
            Name = "Form1";
            Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)DaraGridView).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private DataGridView DaraGridView;
        private Label label1;
        private TextBox StudentNameTB;
        private TextBox StudentSurnameTB;
        private Label label2;
        private TextBox StudentAgeTB;
        private Label label3;
        private Button AddBTN;
        private Button AddToListBTN;
        private DataGridViewTextBoxColumn StudentName;
        private DataGridViewTextBoxColumn SrudentSurname;
        private DataGridViewTextBoxColumn Age;
    }
}