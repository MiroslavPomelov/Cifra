using StudentAspirant;

Student student = new Student()
{
    FirstName = "Ivan",
    LastName = "Ivanov",
    Group = "22ISP-2",
    AverageMark = 5
};
Console.WriteLine(student.getScholarship());

Aspirant aspirant = new Aspirant()
{
    FirstName = "Petr",
    LastName = "Petrov",
    Group = "20ISP-0",
    AverageMark = 5,
    ScientistPurpose = "Physics"
};
Console.WriteLine(aspirant.getScholarship());
Student[] students = new Student[2];
students[0] = student;
students[1] = aspirant;