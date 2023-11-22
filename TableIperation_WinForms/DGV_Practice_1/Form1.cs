using Microsoft.VisualBasic.ApplicationServices;

namespace DGV_Practice_1
{
    public partial class Form1 : Form
    {
        private List<Student> _students = new List<Student>();
        public Form1()
        {
            InitializeComponent();
        }
        private void AddBTN_Click(object sender, EventArgs e)
        {
            AddStudent();
        }

        private void AddToListBTN_Click(object sender, EventArgs e)
        {
            UploadStudents();
        }

        private void UploadStudents()
        {
            foreach (Student student in _students)
            {
                DaraGridView.Rows.Add(student.Name, student.SurName, student.Age);
            }

            _students.Clear();
        }

        //private void DataGridDGV_KeyDown(object sender, KeyEventArgs e)
        //{
        //    if (e.KeyCode == Keys.Delete)
        //    {
        //        if (DaraGridView.SelectedCells.Count > 0)
        //        {
        //            DaraGridView.SelectedCells[0].Value = null;
        //        }
        //    }
        //}

        private void AddStudent()
        {
            _students.Add(new Student(StudentNameTB.Text, StudentSurnameTB.Text, int.Parse(StudentAgeTB.Text)));
        }

        private void DaraGridView_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Delete)
            {
                if (DaraGridView.SelectedCells.Count > 0)
                {
                    DaraGridView.SelectedCells[0].Value = null;
                }
            }

            if (e.KeyCode == Keys.Tab)
            {
                if (DaraGridView.SelectedCells.Count > 0)
                {
                    DaraGridView.Rows.RemoveAt(DaraGridView.SelectedCells[0].RowIndex);
                }
            }

        }
    }
}