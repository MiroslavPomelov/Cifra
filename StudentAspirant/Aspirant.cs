using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentAspirant
{
    internal class Aspirant : Student
    {
        public string? ScientistPurpose { get; set; }
        public new int getScholarship()
        {
            if (AverageMark == 5)
            {
                return 25000;
            }
            return 15000;
        }
    }
}
