using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP8
{
    internal class Exam
    {
        public string? Subject { get; set; }
        public Mark MarkExam { get; set; }

        public Exam(string? subject)
        {
            Subject = subject;
        }

       
    }
}
