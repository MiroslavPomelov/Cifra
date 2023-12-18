using System;
using System.Collections.Generic;

namespace Theme_32_Lesson_3_DataBaseOperating
{
    public partial class Passenger
    {
        public long PassengerId { get; set; }
        public long Survived { get; set; }
        public long Pclass { get; set; }
        public string? Name { get; set; }
        public string? Sex { get; set; }
        public string? Age { get; set; }
        public long SibSp { get; set; }
        public string? Parch { get; set; }
        public string? Ticket { get; set; }
        public double Fare { get; set; }
        public string? Cabin { get; set; }
        public string? Embarked { get; set; }


    }
}
