using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Strategy.Operators
{
    internal class MySQLOperator : IReaderData
    {
        public List<User> ReadData()
        {
            List<User> temp;
            using (var db = new MySQLDataContext())
            {
                temp = db.Users.ToList();
            }
            return temp;
        }
    }
}
