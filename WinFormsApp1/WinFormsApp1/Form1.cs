using System.Drawing.Text;
using System.Windows.Forms;

namespace WinFormsApp1
{
    struct Kurs
    {
        public DateOnly data { get; set; }
        public decimal kurs { get; set; }
    }
    public partial class Form1 : Form
    {
        private List<Kurs> kurses;
        public Form1()
        {
            InitializeComponent();
            kurses = new List<Kurs>();
            plKurs.Paint += new PaintEventHandler(drawDiagram!);
            //dgvKurs.DataSource = kurses;
            //dgvKurs.Columns[0].HeaderText = "Дата";
            //dgvKurs.Columns[1].HeaderText = "Курс";
        }

        private void btSave_Click(object sender, EventArgs e)
        {
            SaveFileDialog saveFileDialog = new SaveFileDialog();
            saveFileDialog.Filter = "*.dat|*.dat";
            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                using (BinaryWriter bw = new BinaryWriter(File.Create(saveFileDialog.FileName)))
                {
                    for (int i = 0; i < dgvKurs.RowCount - 1; i++)
                    {
                        string data = dgvKurs.Rows[i].Cells[0].Value.ToString()!;
                        decimal k = decimal.Parse(dgvKurs.Rows[i].Cells[1].Value.ToString()!);
                        bw.Write(data);
                        bw.Write(k);
                    }
                }
            }
        }

        private void btLoad_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "*.dat|*.dat";
            if (openFileDialog.ShowDialog() == DialogResult.OK)
            {
                using (BinaryReader reader = new BinaryReader(File.Open(openFileDialog.FileName, FileMode.Open)))
                {
                    dgvKurs.Rows.Clear();
                    kurses.Clear();
                    int i = 0;
                    while (reader.PeekChar() > -1)
                    {
                        Kurs kurs = new Kurs();
                        kurs.data = DateOnly.Parse(reader.ReadString());
                        kurs.kurs = reader.ReadDecimal();
                        kurses.Add(kurs);
                        dgvKurs.Rows.Add();
                        dgvKurs.Rows[i].Cells[0].Value = kurs.data;
                        dgvKurs.Rows[i].Cells[1].Value = kurs.kurs;
                        i++;
                    }
                }
                //plKurs.Paint += new PaintEventHandler(drawDiagram!);
                this.plKurs.Refresh();
            }
        }
        private void drawDiagram(object sender, PaintEventArgs args)
        {
            Graphics g = args.Graphics;
            Font dfont = new Font("Tahoma", 9);
            Font hfont = new Font("Tahoma", 14, FontStyle.Regular);
            string header = "Изменение курса";
            int wh = (int)g.MeasureString(header, hfont).Width;
            int x = (plKurs.Width - wh) / 2;
            g.DrawString(header, hfont, Brushes.DarkGreen, x, 5);
            if (kurses.Count != 0)
            {
                decimal max = kurses[0].kurs;
                decimal min = 0;
                for (int i = 0; i < kurses.Count; i++)
                {
                    if (kurses[i].kurs > max)
                    {
                        max = kurses[i].kurs;
                    }
                    //if (kurses[i].kurs < min)
                    //{
                    //    min = kurses[i].kurs;
                    //}
                }

                int x1, y1;
                int w, h;
                w = (plKurs.Width - 10 * 5 * (kurses.Count - 1)) / kurses.Count;
                x1 = 10;
                for (int i = 0; i < kurses.Count; i++)
                {
                    y1 = plKurs.Height - 10 - (int)((plKurs.Height - 100) * (kurses[i].kurs - min) / (max - min));
                    g.DrawString(kurses[i].kurs.ToString(), dfont, Brushes.Black, x1, y1 - 10);
                    h = plKurs.Height - y1 - 10 + 1;
                    g.FillRectangle(Brushes.ForestGreen, x1, y1, w, h);
                    g.DrawRectangle(Pens.Black, x1, y1, w, h);
                    x1 += w + 5;
                }
            }
        }

        private void Form1_SizeChanged(object sender, EventArgs e)
        {
            this.Refresh();
        }

        private void dgvKurs_CellValueChanged(object sender, DataGridViewCellEventArgs e)
        {
            if (dgvKurs.CurrentCell.Value.ToString() != 0)
            {
                Kurs kurs = new Kurs();
                kurs.data = DateOnly.Parse(dgvKurs.SelectedRows[1].Cells[1].Value.ToString()!);
                kurs.kurs = decimal.Parse(dgvKurs.SelectedRows[1].Cells[1].Value.ToString()!);
                this.plKurs.Refresh();
            }
        }
    }
}