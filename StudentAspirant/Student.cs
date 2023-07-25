using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentAspirant
{
    internal class Student
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Group { get; set; }
        public double AverageMark { get; set; }
        public int getScholarship()
        {
            if (AverageMark == 5)
            {
                return 5000;
            }
            return 3000;
        }
    }
}
