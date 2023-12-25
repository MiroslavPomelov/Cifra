using System;
using System.Collections.Generic;

namespace ModelCreating
{
    public partial class User
    {
        public User()
        {
            Userfruits = new HashSet<Userfruit>();
        }

        public int Userid { get; set; }
        public string? Username { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public int? Age { get; set; }
        public string? Email { get; set; }

        public virtual ICollection<Userfruit> Userfruits { get; set; }
    }
}
