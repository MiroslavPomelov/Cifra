using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Points
{
    internal class Point
    {
        public static int Count { get; set; }
        public static List<Point> OurPoints = new List<Point>();
        public double X { get; set; } = 0;
        public double Y { get; set; } = 0;
        public static double LengthPoints()
        {
            double length = 0;
            if (true)
            {

                for (int i = 1; i < OurPoints.Count; i++)
                {
                    length += Math.Sqrt((OurPoints[i].X - OurPoints[i - 1].X) * (OurPoints[i].X - OurPoints[i - 1].X) + (OurPoints[i].Y - OurPoints[i - 1].Y) * (OurPoints[i].Y - OurPoints[i - 1].Y));
                }
                return length;
            }
        }

    }
}
