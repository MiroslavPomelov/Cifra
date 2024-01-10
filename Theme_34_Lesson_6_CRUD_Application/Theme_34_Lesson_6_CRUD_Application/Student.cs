

namespace Theme_34_Lesson_6_CRUD_Application
{
    public class Student
    {
        public int Id { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string Age { get; set; }

        public Student()
        {

        }

        public Student(string? firstname, string? lastname, string age)
        {
            Firstname = firstname;
            Lastname = lastname;
            Age = age;
        }

        public string Display(Student student)
        {
            string stroke = $"Имя: {student.Firstname}, Фамилия: {student.Lastname}, Возраст: {student.Age}";
            return stroke;
        }
    }





}
