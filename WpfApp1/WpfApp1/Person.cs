using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WpfApp1
{
    public class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string Occupation { get; set; }

        public Person(string name, int age, string occupation)
        {
            Name = name;
            Age = age;
            Occupation = occupation;
        }
    }
}
