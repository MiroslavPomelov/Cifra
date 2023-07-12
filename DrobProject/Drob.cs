using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrobProject
{
    internal class Drob
    {
        int chis;
        int znam;

        public Drob(int chis, int znam)
        {
            this.chis = chis;
            this.znam = znam;
        }

        public Drob(int chis)
        {
            this.chis = chis;
            this.znam = 1;
        }

        public void Print()
        {
            Console.WriteLine(chis+"/"+znam);
        }
        public Drob Add(Drob drob)
        {
            int c = this.chis*drob.znam+this.znam*drob.chis;
            int z = this.znam * drob.znam;
            return new Drob(c, z);
        }
    }
}
