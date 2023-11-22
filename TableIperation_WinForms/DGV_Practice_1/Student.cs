using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DGV_Practice_1
{
    public class Student
    {
        public string Name { get; set; }

        public string SurName { get; set; }
        public int Age { get; set; }

        public Student(string name, string surName, int age)
        {
            Name = name;
            SurName = surName;
            Age = age;
        }
    }
}
