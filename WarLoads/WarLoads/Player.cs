using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WarLoads
{
    public abstract class Player
    {
        public string Name { get; set; }
        public int HP { get; set; }
        public uint Level { get; set; }
        public int Strenght { get; set; }
        public int Speed { get; set; }
    }
}
