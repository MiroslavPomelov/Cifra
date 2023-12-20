namespace Theme_32_Lesson_4_Practice
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
            TitanicDataDGV = new DataGridView();
            PassengerId = new DataGridViewTextBoxColumn();
            Survived = new DataGridViewTextBoxColumn();
            Pclass = new DataGridViewTextBoxColumn();
            Name = new DataGridViewTextBoxColumn();
            Sex = new DataGridViewTextBoxColumn();
            Age = new DataGridViewTextBoxColumn();
            SibSp = new DataGridViewTextBoxColumn();
            Parch = new DataGridViewTextBoxColumn();
            Ticket = new DataGridViewTextBoxColumn();
            Fare = new DataGridViewTextBoxColumn();
            Cabin = new DataGridViewTextBoxColumn();
            Embarked = new DataGridViewTextBoxColumn();
            SurvivedCB = new CheckBox();
            AgeCb = new CheckBox();
            ThirdClassCB = new CheckBox();
            TimeL = new Label();
            ResultBTN = new Button();
            ((System.ComponentModel.ISupportInitialize)TitanicDataDGV).BeginInit();
            SuspendLayout();
            // 
            // TitanicDataDGV
            // 
            TitanicDataDGV.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            TitanicDataDGV.AutoSizeRowsMode = DataGridViewAutoSizeRowsMode.AllCells;
            TitanicDataDGV.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            TitanicDataDGV.Columns.AddRange(new DataGridViewColumn[] { PassengerId, Survived, Pclass, Name, Sex, Age, SibSp, Parch, Ticket, Fare, Cabin, Embarked });
            TitanicDataDGV.Location = new Point(12, 12);
            TitanicDataDGV.Name = "TitanicDataDGV";
            TitanicDataDGV.RowTemplate.Height = 25;
            TitanicDataDGV.Size = new Size(1240, 426);
            TitanicDataDGV.TabIndex = 0;
            // 
            // PassengerId
            // 
            PassengerId.HeaderText = "PassengerId";
            PassengerId.Name = "PassengerId";
            // 
            // Survived
            // 
            Survived.HeaderText = "Survived";
            Survived.Name = "Survived";
            // 
            // Pclass
            // 
            Pclass.HeaderText = "Pclass";
            Pclass.Name = "Pclass";
            // 
            // Name
            // 
            Name.HeaderText = "Name";
            Name.Name = "Name";
            // 
            // Sex
            // 
            Sex.HeaderText = "Sex";
            Sex.Name = "Sex";
            // 
            // Age
            // 
            Age.HeaderText = "Age";
            Age.Name = "Age";
            // 
            // SibSp
            // 
            SibSp.HeaderText = "SibSp";
            SibSp.Name = "SibSp";
            // 
            // Parch
            // 
            Parch.HeaderText = "Parch";
            Parch.Name = "Parch";
            // 
            // Ticket
            // 
            Ticket.HeaderText = "Ticket";
            Ticket.Name = "Ticket";
            // 
            // Fare
            // 
            Fare.HeaderText = "Fare";
            Fare.Name = "Fare";
            // 
            // Cabin
            // 
            Cabin.HeaderText = "Cabin";
            Cabin.Name = "Cabin";
            // 
            // Embarked
            // 
            Embarked.HeaderText = "Embarked";
            Embarked.Name = "Embarked";
            // 
            // SurvivedCB
            // 
            SurvivedCB.AutoSize = true;
            SurvivedCB.Location = new Point(1307, 12);
            SurvivedCB.Name = "SurvivedCB";
            SurvivedCB.Size = new Size(88, 19);
            SurvivedCB.TabIndex = 1;
            SurvivedCB.Text = "Выжившие";
            SurvivedCB.UseVisualStyleBackColor = true;
            // 
            // AgeCb
            // 
            AgeCb.AutoSize = true;
            AgeCb.Location = new Point(1307, 37);
            AgeCb.Name = "AgeCb";
            AgeCb.Size = new Size(136, 19);
            AgeCb.TabIndex = 2;
            AgeCb.Text = "Совершеннолетние";
            AgeCb.UseVisualStyleBackColor = true;
            // 
            // ThirdClassCB
            // 
            ThirdClassCB.AutoSize = true;
            ThirdClassCB.Location = new Point(1307, 62);
            ThirdClassCB.Name = "ThirdClassCB";
            ThirdClassCB.Size = new Size(73, 19);
            ThirdClassCB.TabIndex = 3;
            ThirdClassCB.Text = "3й класс";
            ThirdClassCB.UseVisualStyleBackColor = true;
            // 
            // TimeL
            // 
            TimeL.AutoSize = true;
            TimeL.Location = new Point(1426, 12);
            TimeL.Name = "TimeL";
            TimeL.Size = new Size(33, 15);
            TimeL.TabIndex = 4;
            TimeL.Text = "Time";
            // 
            // ResultBTN
            // 
            ResultBTN.Location = new Point(1307, 393);
            ResultBTN.Name = "ResultBTN";
            ResultBTN.Size = new Size(169, 45);
            ResultBTN.TabIndex = 5;
            ResultBTN.Text = "Вывести";
            ResultBTN.UseVisualStyleBackColor = true;
            ResultBTN.Click += ResultBTN_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1524, 450);
            Controls.Add(ResultBTN);
            Controls.Add(TimeL);
            Controls.Add(ThirdClassCB);
            Controls.Add(AgeCb);
            Controls.Add(SurvivedCB);
            Controls.Add(TitanicDataDGV);
            Text = "Form1";
            Load += Form1_Load;
            ((System.ComponentModel.ISupportInitialize)TitanicDataDGV).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private DataGridView TitanicDataDGV;
        private CheckBox SurvivedCB;
        private CheckBox AgeCb;
        private CheckBox ThirdClassCB;
        private Label TimeL;
        private DataGridViewTextBoxColumn PassengerId;
        private DataGridViewTextBoxColumn Survived;
        private DataGridViewTextBoxColumn Pclass;
        private DataGridViewTextBoxColumn Name;
        private DataGridViewTextBoxColumn Sex;
        private DataGridViewTextBoxColumn Age;
        private DataGridViewTextBoxColumn SibSp;
        private DataGridViewTextBoxColumn Parch;
        private DataGridViewTextBoxColumn Ticket;
        private DataGridViewTextBoxColumn Fare;
        private DataGridViewTextBoxColumn Cabin;
        private DataGridViewTextBoxColumn Embarked;
        private Button ResultBTN;
    }
}