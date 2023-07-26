using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP8
{
    internal class Facultet
    {
        public string? FacultetName { get; set; }
        public Exam Exam { get; set; }

        public Facultet(string? facultetName, Exam exam)
        {
            FacultetName = facultetName;
            Exam = exam;
        }


        //public void ClaimAbiturient()
        //{
        //    if (MarkExam > 2)
        //    {
        //        Console.WriteLine($"{Abiturient} зачислен");
        //    }
        //    else
        //    {
        //        Console.WriteLine($"{Abiturient} не зачислен");
        //    }
        //}
    }
}
