using System;
using System.Collections.Generic;

namespace ModelCreating
{
    public partial class Fruit
    {
        public Fruit()
        {
            Userfruits = new HashSet<Userfruit>();
        }

        public int Fruitid { get; set; }
        public string? Fruitname { get; set; }
        public string? Variety { get; set; }
        public string? Color { get; set; }
        public string? Taste { get; set; }

        public virtual ICollection<Userfruit> Userfruits { get; set; }
    }
}
