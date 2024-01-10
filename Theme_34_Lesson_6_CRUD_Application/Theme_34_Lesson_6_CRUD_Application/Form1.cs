namespace Theme_34_Lesson_6_CRUD_Application
{
    public partial class Form1 : Form
    {
        List<Student> students = new List<Student>();
        public Form1()
        {
            InitializeComponent();
        }

        private void AddStudentBTN_Click(object sender, EventArgs e)
        {
            students.Add(new Student(FirstNameTB.Text, LastNameTB.Text, AgeTB.Text));
            using (SchoolDbContext sbContext = new SchoolDbContext())
            {
                foreach (var student in students)
                {
                    sbContext.Students.Add(student);
                    sbContext.SaveChanges();
                }
            }
        }

        private void AllStudentsBTN_Click(object sender, EventArgs e)
        {
            using (SchoolDbContext sbContext = new SchoolDbContext())
            {
                foreach (Student student in students)
                {
                    AllStudentsLB.Text = student.Display(student);
                }
            }
        }
    }
}