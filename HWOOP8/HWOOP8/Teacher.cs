using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP8
{
    internal class Teacher
    {
        public string? Name { get; set; }
        public Mark MarkExam { get; private set; }
        public Abiturient Abiturient { get; set; }

        public Teacher(string? name, Mark markExam)
        {
            Name = name;
            MarkExam = markExam;
        }
        public void Print()
        {
            Console.WriteLine($"Оценка за экзамен {Abiturient}: {MarkExam}");
        }
    }
}
