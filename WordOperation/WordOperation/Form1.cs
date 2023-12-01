using Word = Microsoft.Office.Interop.Word;

namespace WordOperation
{
    public partial class Form1 : Form
    {
        public static Word.Application wordApp;
        public static Word.Document doc;
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            wordApp = new Word.Application();
            //doc = wordApp.Documents.Add();
        }

        private void Form1_FormClosed(object sender, FormClosedEventArgs e)
        {
            doc.Close();
            wordApp.Quit();
        }

        private void saveBTN_Click(object sender, EventArgs e)
        {
            doc.Save();
        }

        private void addParagraphBTN_Click(object sender, EventArgs e)
        {
            Word.Paragraph newParagraph = doc.Paragraphs.Add();
            newParagraph.Range.Font.Name = fontStyleTB.SelectedIndex switch
            {
                0 => fontStyleTB.Text,
                1 => fontStyleTB.Text,
                2 => fontStyleTB.Text
            };
            newParagraph.Range.Font.Size = int.Parse(textSizeTB.Text);
            if (extBoldnessCB.Checked)
            {
                newParagraph.Range.Font.Bold = 1;
            }
            newParagraph.Range.Font.Color = fontColorCB.SelectedIndex switch
            {
                0 => Word.WdColor.wdColorBlack,
                1 => Word.WdColor.wdColorBlue,
                2 => Word.WdColor.wdColorGreen,
                3 => Word.WdColor.wdColorRed
            };

            newParagraph.Range.Text = paragraphTB.Text + "\n";
        }

        private void OpenBTN_Click(object sender, EventArgs e)
        {
            openFileDialog1.ShowDialog();
            filePathTB.Text = openFileDialog1.FileName;

            doc = wordApp.Documents.Open(filePathTB.Text);
        }
    }

}