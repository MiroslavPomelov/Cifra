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
            TitanicDataDGV.Location = new Point(14, 16);
            TitanicDataDGV.Margin = new Padding(3, 4, 3, 4);
            TitanicDataDGV.Name = "TitanicDataDGV";
            TitanicDataDGV.RowHeadersWidth = 51;
            TitanicDataDGV.RowTemplate.Height = 25;
            TitanicDataDGV.Size = new Size(1417, 568);
            TitanicDataDGV.TabIndex = 0;
            // 
            // SurvivedCB
            // 
            SurvivedCB.AutoSize = true;
            SurvivedCB.Location = new Point(1494, 16);
            SurvivedCB.Margin = new Padding(3, 4, 3, 4);
            SurvivedCB.Name = "SurvivedCB";
            SurvivedCB.Size = new Size(108, 24);
            SurvivedCB.TabIndex = 1;
            SurvivedCB.Text = "Выжившие";
            SurvivedCB.UseVisualStyleBackColor = true;
            // 
            // AgeCb
            // 
            AgeCb.AutoSize = true;
            AgeCb.Location = new Point(1494, 49);
            AgeCb.Margin = new Padding(3, 4, 3, 4);
            AgeCb.Name = "AgeCb";
            AgeCb.Size = new Size(169, 24);
            AgeCb.TabIndex = 2;
            AgeCb.Text = "Совершеннолетние";
            AgeCb.UseVisualStyleBackColor = true;
            // 
            // ThirdClassCB
            // 
            ThirdClassCB.AutoSize = true;
            ThirdClassCB.Location = new Point(1494, 83);
            ThirdClassCB.Margin = new Padding(3, 4, 3, 4);
            ThirdClassCB.Name = "ThirdClassCB";
            ThirdClassCB.Size = new Size(89, 24);
            ThirdClassCB.TabIndex = 3;
            ThirdClassCB.Text = "3й класс";
            ThirdClassCB.UseVisualStyleBackColor = true;
            // 
            // TimeL
            // 
            TimeL.AutoSize = true;
            TimeL.Location = new Point(1630, 16);
            TimeL.Name = "TimeL";
            TimeL.Size = new Size(42, 20);
            TimeL.TabIndex = 4;
            TimeL.Text = "Time";
            // 
            // ResultBTN
            // 
            ResultBTN.Location = new Point(1494, 524);
            ResultBTN.Margin = new Padding(3, 4, 3, 4);
            ResultBTN.Name = "ResultBTN";
            ResultBTN.Size = new Size(193, 60);
            ResultBTN.TabIndex = 5;
            ResultBTN.Text = "Вывести";
            ResultBTN.UseVisualStyleBackColor = true;
            ResultBTN.Click += ResultBTN_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1742, 600);
            Controls.Add(ResultBTN);
            Controls.Add(TimeL);
            Controls.Add(ThirdClassCB);
            Controls.Add(AgeCb);
            Controls.Add(SurvivedCB);
            Controls.Add(TitanicDataDGV);
            Margin = new Padding(3, 4, 3, 4);
            Name = "Form1";
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
        private Button ResultBTN;
    }
}