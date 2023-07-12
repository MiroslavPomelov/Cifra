using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP
{
    internal class Rectangle
    {
        private double width;
        private double height;
        public double getWidth()
        {
            return width;
        }
        public double getHeight()
        {
            return height;
        }
        public void setWidth(double w)
        {
            if (w > 0) width = w;
        }
        public void setHeight(double h)
        {
            if (h > 0) height = h;
        }
        public double getArea()
        {
            return width * height;
        }
        public double getPerimetr()
        {
            if (width != 0 && height != 0)
            {

                return 2 * (width + height);
            }
            return 0;
        }
    }
}
