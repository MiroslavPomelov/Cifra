using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP8
{
    internal class Abiturient
    {
        public string? FIO { get; set; }
        public Facultet Facultet { get; set; }


        public Abiturient(string? fIO, Facultet facultet)
        {
            FIO = fIO;
            Facultet = facultet;
        }
    }
}
