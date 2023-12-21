using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Theme_32_Lesson_4_Practice
{
    public class Passenger
    {
        public int PassengerId { get; set; }
        public int Survived { get; set; }
        public int Pclass { get; set; }

        public string Name { get; set; }
        public string Sex { get; set; }
        public int Age { get; set; }
        public int SibSp { get; set; }
        public int Parch { get; set; }
        public string Ticket { get; set; }
        public double Fare { get; set; }
        public string Cabin { get; set; }
        public string Embarked { get; set; }
    }
}
