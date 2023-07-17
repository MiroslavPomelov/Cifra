using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace destruct
{
    internal class TwoVariables
    {
        private int? a;
        private int? b;
        public TwoVariables(int a, int b)
        {
            this.a = a;
            this.b = b;
        }
        ~TwoVariables()
        {
            System.Diagnostics.Trace.WriteLine("Объект удален");
        }
    }
}
