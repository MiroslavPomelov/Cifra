namespace WinNew
{
    partial class EditForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            label1 = new Label();
            textBox1 = new TextBox();
            btAdd = new Button();
            btSave = new Button();
            panel1 = new Panel();
            btAnswerAdd = new Button();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(20, 97);
            label1.Name = "label1";
            label1.Size = new Size(120, 20);
            label1.TabIndex = 0;
            label1.Text = "Введите вопрос";
            // 
            // textBox1
            // 
            textBox1.Location = new Point(20, 129);
            textBox1.Name = "textBox1";
            textBox1.Size = new Size(737, 27);
            textBox1.TabIndex = 1;
            // 
            // btAdd
            // 
            btAdd.Location = new Point(20, 193);
            btAdd.Name = "btAdd";
            btAdd.Size = new Size(91, 50);
            btAdd.TabIndex = 2;
            btAdd.Text = "Добавить ответ";
            btAdd.UseVisualStyleBackColor = true;
            // 
            // btSave
            // 
            btSave.Location = new Point(129, 193);
            btSave.Name = "btSave";
            btSave.Size = new Size(94, 50);
            btSave.TabIndex = 3;
            btSave.Text = "Сохранить";
            btSave.UseVisualStyleBackColor = true;
            // 
            // panel1
            // 
            panel1.Location = new Point(20, 249);
            panel1.Name = "panel1";
            panel1.Size = new Size(737, 173);
            panel1.TabIndex = 4;
            // 
            // btAnswerAdd
            // 
            btAnswerAdd.Location = new Point(20, 34);
            btAnswerAdd.Name = "btAnswerAdd";
            btAnswerAdd.Size = new Size(91, 49);
            btAnswerAdd.TabIndex = 5;
            btAnswerAdd.Text = "Добавить вопрос";
            btAnswerAdd.UseVisualStyleBackColor = true;
            // 
            // EditForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(btAnswerAdd);
            Controls.Add(panel1);
            Controls.Add(btSave);
            Controls.Add(btAdd);
            Controls.Add(textBox1);
            Controls.Add(label1);
            Name = "EditForm";
            Text = "Редактор Тестов";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private TextBox textBox1;
        private Button btAdd;
        private Button btSave;
        private Panel panel1;
        private Button btAnswerAdd;
    }
}