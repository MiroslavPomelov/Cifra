namespace NkEdit
{
    public partial class NKEdIt : Form
    {
        private string fn=String.Empty;
        private bool docChanged=false;
        private OpenFileDialog openFileDialog;
        private SaveFileDialog saveFileDialog;
        private PrintDialog printDialog;
        private FontDialog fontDialog;
        public NKEdIt()
        {
            InitializeComponent();
            textBox1.ScrollBars =RichTextBoxScrollBars.Vertical;
            textBox1.Text = String.Empty;
            this.Text = "NkEdit - Новый документ";
            toolStrip1.Visible = true;
            ParamToolStripMenuItem.Checked = true;

            openFileDialog = new OpenFileDialog();
            openFileDialog.DefaultExt = "txt";
            openFileDialog.Filter = "Текст|*.txt";
            openFileDialog.Title = "Открыть документ";
            openFileDialog.Multiselect = false;

            saveFileDialog = new SaveFileDialog();
            saveFileDialog.DefaultExt = "txt";
            saveFileDialog.Filter= "Текст|*.txt";
            saveFileDialog.Title = "Сохранить документ";

            printDialog = new PrintDialog();
            fontDialog = new FontDialog();
        }
        private async void OpenDocument()
        {
            openFileDialog.FileName = String.Empty;
            if(openFileDialog.ShowDialog()==DialogResult.OK)
            {
                fn = openFileDialog.FileName;
                this.Text = fn;
                using (StreamReader sr=new StreamReader(fn))
                {
                    textBox1.Text=await sr.ReadToEndAsync();
                    textBox1.SelectionStart = textBox1.TextLength;
                }
            }
        }
        private int SaveDocument()
        {
            int result = 0;
            if(fn==String.Empty)
            {
                if (saveFileDialog.ShowDialog() == DialogResult.OK)
                {
                    fn = saveFileDialog.FileName;
                    this.Text = fn;
                }
                else result = -1;
            }
            if(fn!=String.Empty)
            {
                FileInfo fi=new FileInfo(fn);   
                using (StreamWriter sw=fi.CreateText())
                {
                    sw.WriteAsync(textBox1.Text);
                    result = 0;
                }
            }
            return result;
        }

        private void открытьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            openFileDialog.FileName = String.Empty;
            if (docChanged)
            {
                Save();
            }
            OpenDocument();
        }

        private void сохранитьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SaveDocument();
        }

        private void создатьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (docChanged) Save();
        }
        private void Save()
        {
                DialogResult dr = MessageBox.Show("Сохранить изменения?", "NKEdit",
                    MessageBoxButtons.YesNoCancel, MessageBoxIcon.Warning);
                switch (dr)
                {
                    case DialogResult.Yes:
                        if (SaveDocument() == 0)
                        {
                            textBox1.Clear();
                            docChanged = false;
                        }
                        break;
                    case DialogResult.No:
                        textBox1.Clear();
                        docChanged = false;
                        break;
                    case DialogResult.Cancel:
                        break;
                }
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            if(textBox1.Text.Length!=0) docChanged = true;
        }

        private void сохранитьКакToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Save();
        }

        private void выходToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if(MessageBox.Show("Вы действительно хотите закрыть приложение?","NKEdit",
                MessageBoxButtons.YesNo,MessageBoxIcon.Warning)==DialogResult.Yes)
            {
                if (docChanged) Save();
                Close();
            }
          
        }

        private void печатьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            printDialog.ShowDialog();
        }

        private void ParamToolStripMenuItem_Click(object sender, EventArgs e)
        {
            toolStrip1.Visible = !toolStrip1.Visible;
            ParamToolStripMenuItem.Checked = !ParamToolStripMenuItem.Checked;
        }

        private void шрифтToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (textBox1.SelectedText.Length != 0)
            {
                fontDialog.Font = textBox1.SelectionFont;
                if (fontDialog.ShowDialog() == DialogResult.OK)
                {
                    textBox1.SelectionFont = fontDialog.Font;
                }
            }
            else
            {
                fontDialog.Font = textBox1.Font;
                if (fontDialog.ShowDialog() == DialogResult.OK)
                {
                    textBox1.Font = fontDialog.Font;
                }
            }
        }

        private void вырезатьToolStripButton_Click(object sender, EventArgs e)
        {
            textBox1.Cut();
        }

        private void копироватьToolStripButton_Click(object sender, EventArgs e)
        {
            textBox1.Copy();
        }

        private void вставитьToolStripButton_Click(object sender, EventArgs e)
        {
            textBox1.Paste();
        }
    }
}