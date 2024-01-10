namespace Theme_34_Lesson_6_CRUD_Application
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
            FirstNameTB = new TextBox();
            LastNameTB = new TextBox();
            AgeTB = new TextBox();
            label1 = new Label();
            label2 = new Label();
            label3 = new Label();
            AddStudentBTN = new Button();
            AllStudentsLB = new ListBox();
            AllStudentsBTN = new Button();
            ChangeBTN = new Button();
            button1 = new Button();
            SuspendLayout();
            // 
            // FirstNameTB
            // 
            FirstNameTB.Location = new Point(12, 35);
            FirstNameTB.Name = "FirstNameTB";
            FirstNameTB.Size = new Size(152, 23);
            FirstNameTB.TabIndex = 0;
            // 
            // LastNameTB
            // 
            LastNameTB.Location = new Point(12, 94);
            LastNameTB.Name = "LastNameTB";
            LastNameTB.Size = new Size(152, 23);
            LastNameTB.TabIndex = 1;
            // 
            // AgeTB
            // 
            AgeTB.Location = new Point(12, 151);
            AgeTB.Name = "AgeTB";
            AgeTB.Size = new Size(152, 23);
            AgeTB.TabIndex = 2;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(15, 7);
            label1.Name = "label1";
            label1.Size = new Size(34, 15);
            label1.TabIndex = 3;
            label1.Text = "Имя:";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(15, 68);
            label2.Name = "label2";
            label2.Size = new Size(61, 15);
            label2.TabIndex = 4;
            label2.Text = "Фамилия:";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(17, 126);
            label3.Name = "label3";
            label3.Size = new Size(53, 15);
            label3.TabIndex = 5;
            label3.Text = "Возраст:";
            // 
            // AddStudentBTN
            // 
            AddStudentBTN.Location = new Point(12, 199);
            AddStudentBTN.Name = "AddStudentBTN";
            AddStudentBTN.Size = new Size(152, 40);
            AddStudentBTN.TabIndex = 6;
            AddStudentBTN.Text = "Добавить студента";
            AddStudentBTN.UseVisualStyleBackColor = true;
            AddStudentBTN.Click += AddStudentBTN_Click;
            // 
            // AllStudentsLB
            // 
            AllStudentsLB.FormattingEnabled = true;
            AllStudentsLB.ItemHeight = 15;
            AllStudentsLB.Location = new Point(199, 35);
            AllStudentsLB.Name = "AllStudentsLB";
            AllStudentsLB.Size = new Size(399, 424);
            AllStudentsLB.TabIndex = 7;
            // 
            // AllStudentsBTN
            // 
            AllStudentsBTN.Location = new Point(12, 245);
            AllStudentsBTN.Name = "AllStudentsBTN";
            AllStudentsBTN.Size = new Size(152, 40);
            AllStudentsBTN.TabIndex = 8;
            AllStudentsBTN.Text = "Вывести список";
            AllStudentsBTN.UseVisualStyleBackColor = true;
            AllStudentsBTN.Click += AllStudentsBTN_Click;
            // 
            // ChangeBTN
            // 
            ChangeBTN.Location = new Point(12, 291);
            ChangeBTN.Name = "ChangeBTN";
            ChangeBTN.Size = new Size(152, 34);
            ChangeBTN.TabIndex = 9;
            ChangeBTN.Text = "Редактировать";
            ChangeBTN.UseVisualStyleBackColor = true;
            // 
            // button1
            // 
            button1.Location = new Point(12, 331);
            button1.Name = "button1";
            button1.Size = new Size(152, 34);
            button1.TabIndex = 10;
            button1.Text = "Удалить";
            button1.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(613, 474);
            Controls.Add(button1);
            Controls.Add(ChangeBTN);
            Controls.Add(AllStudentsBTN);
            Controls.Add(AllStudentsLB);
            Controls.Add(AddStudentBTN);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(label1);
            Controls.Add(AgeTB);
            Controls.Add(LastNameTB);
            Controls.Add(FirstNameTB);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox FirstNameTB;
        private TextBox LastNameTB;
        private TextBox AgeTB;
        private Label label1;
        private Label label2;
        private Label label3;
        private Button AddStudentBTN;
        private ListBox AllStudentsLB;
        private Button AllStudentsBTN;
        private Button ChangeBTN;
        private Button button1;
    }
}