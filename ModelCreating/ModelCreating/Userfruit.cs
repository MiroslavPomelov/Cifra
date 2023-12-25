using System;
using System.Collections.Generic;

namespace ModelCreating
{
    public partial class Userfruit
    {
        public int Userfruitid { get; set; }
        public int? Userid { get; set; }
        public int? Fruitid { get; set; }

        public virtual Fruit? Fruit { get; set; }
        public virtual User? User { get; set; }
    }
}
