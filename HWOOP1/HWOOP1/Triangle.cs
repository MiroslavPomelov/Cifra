using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP1
{
    internal class Triangle
    {
        private double katet1;
        private double katet2;
        private double hypotenysa;
        public double getKatet1()
        {
            return katet1;
        }
        public double getKatet2()
        {
            return katet2;
        }
        public double getHypotenysa()
        {
            return hypotenysa;
        }
        public void setKatet1(double k1)
        {
            if (k1 > 0) katet1 = k1;
        }
        public void setKatet2(double k2)
        {
            if (k2 > 0) katet2 = k2;
        }
        public void setHypotenysa(double h)
        {
            if (h > 0) hypotenysa = h;
        }
        public double getArea()
        {
            double p = (katet1 + katet2 + hypotenysa) / 2;
            return Math.Sqrt(p * (p - katet1) * (p - katet2) * (p - hypotenysa));
        }
        public double getPerimetr()
        {
            if (katet1 != 0 && katet2 != 0 && hypotenysa != 0)
                return katet1 + katet2 + hypotenysa;
            return 0;
        }
        public string getMeridian()
        {
            Console.WriteLine("Введите \"х\" и \"y\" координаты вершины А: ");
            int ax = int.Parse(Console.ReadLine());
            int ay = int.Parse(Console.ReadLine());
            Console.WriteLine("Введите \"х\" и \"y\" координаты вершины B: ");
            int bx = int.Parse(Console.ReadLine());
            int by = int.Parse(Console.ReadLine());
            Console.WriteLine("Введите \"х\" и \"y\" координаты вершины C: ");
            int cx = int.Parse(Console.ReadLine());
            int cy = int.Parse(Console.ReadLine());
            int x0 = (ax + bx + cx) / 3;
            int y0 = (ay + by + cy) / 3;
            return $"({x0}, {y0})";
        }
    }
}
