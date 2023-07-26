using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IndexOf10
{
    internal class ZelChislo
    {
        public int Chislo { get; set; }
        public virtual int this[int i]
        {
            get
            {
                string temp = Chislo.ToString();
                if (i < temp.Length)
                {
                    return int.Parse(temp[i].ToString());
                }
                else throw new Exception("Такого индекса в числе нет");
            }
        }
    }
}
