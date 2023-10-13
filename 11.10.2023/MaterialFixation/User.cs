using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaterialFixation
{
    public class User
    {

    }
    interface IUser
    {
        int Id {protected get; set; }
        string Name { protected get; set; }
        string Login { protected get; set; }
        string Password { protected get; set; }
    }

}
