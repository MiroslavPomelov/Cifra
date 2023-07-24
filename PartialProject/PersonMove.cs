using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartialProject
{
    public partial class Person
    {
        private int age;
        public partial void Read();

        public Person(string name)
        {
            this.name = name;
            this.age = 0;
        }

        public void Move()
        {
            Console.WriteLine("I am moving");
        }
    }
}
