using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DGW_Excel_Operations
{
    public class Student
    {
        public int Number { get; set; }
        public string? Name { get; set; }
        public string? SurName { get; set; }
        public int Age { get; set; }
        public string? Facult { get; set; }
        public string? Kurs { get; set; }
        public string? Group { get; set; }

        public Student(int number, string? name, string? surName, int age, string? facult, string? kurs, string? group)
        {
            Number = number;
            Name = name;
            SurName = surName;
            Age = age;
            Facult = facult;
            Kurs = kurs;
            Group = group;
        }
    }
}
