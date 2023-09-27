using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prakt2
{
    public static class ExtensionMethods
    {
        public static string GetMeanMark(this List<(string, int, double)> students)
        {
            object[,] marks = new object[students.Count, 2];
            double[] array = new double[students.Count];


            for (int i = 0; i < students.Count; i++)
            {
                marks[i, 0] = students[i].Item1;
                marks[i, 1] = students[i].Item3;
            }


            for (int i = 0; i < students.Count; i++)
            {
                array[i] = (double)marks[i, 1];
            }

            int indexOfMaxValue = Array.IndexOf(array, array.Max());
            return marks[indexOfMaxValue, 0].ToString();
        }

        public static double GetAverageAge(this List<(string, int, double)> students)
        {
            double[] ages = new double[students.Count];
            for (int i = 0; i < students.Count; i++)
            {
                ages[i] = students[i].Item2;
            }
            return ages.Sum() / students.Count;
        }
    }
}
