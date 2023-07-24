using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartialProject
{
    public partial class Person
    {
        private string name;
        public partial void Read()
        {
            Console.WriteLine("I am reading!"); ;
        }

        public Person(int age, string name)
        {
            this.age = age;
            this.name = name;
        }

        public Person(int age)
        {
            this.name = "";
            this.age = age;
        }

        public void Eat()
        {
            Console.WriteLine("I am eating!");
        }
    }
}
