using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Train_ticket.Model.Data.DataBaseEntities;

namespace Train_ticket.Services
{
    public static class GetUser
    {
        public static User User { get; set; }

        public static void reterunUser(User user)
        {
            User = user;
        }

    }
}
