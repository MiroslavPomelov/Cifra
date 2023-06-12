using System.Drawing.Text;

namespace FileForm
{
    public partial class Form1 : Form
    {
        int pbw, pbh, pbX, pbY;
        string fpath;
        public Form1()
        {
            InitializeComponent();
            pbw = pbImage.Width;
            pbh = pbImage.Height;
            pbX = pbImage.Location.X;
            pbY = pbImage.Location.Y;
            lbFiles.Sorted = true;
            DirectoryInfo di = new DirectoryInfo(Environment.GetFolderPath(Environment.SpecialFolder.MyPictures));
            fpath = di.FullName;
            lbPath.Text = fpath;
            FillListBox(fpath);
        }
        private bool FillListBox(string path)
        {
            DirectoryInfo di = new DirectoryInfo(path);
            FileInfo[] fi = di.GetFiles("*.jpg");
            lbFiles.Items.Clear();
            foreach (FileInfo fc in fi)
            {
                lbFiles.Items.Add(fc.Name);
            }
            lbPath.Text = path;
            if (fi.Length == 0)
            {
                return false;
            }
            else
            {
                lbFiles.SelectedIndex = 0;
                LoadImage(lbFiles.SelectedItem.ToString()!);
                return true;
            }

        }
        private void LoadImage(string path)
        {
            double mh, mw;
            pbImage.Visible = false;
            pbImage.Left = pbX;
            pbImage.SizeMode = PictureBoxSizeMode.AutoSize;
            pbImage.Image = new Bitmap(fpath + @"\" + lbFiles.SelectedItem.ToString());


            pbImage.Visible = true;
        }
    }
}