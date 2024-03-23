using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Strategy
{
    internal class AdminPanel
    {
        private string _adminPassword;
        private string v1;
        private string v2;
        private Operators.MySQLOperator mySQLOperator;
        private Operators.SQLiteOperator sQLiteOperator;

        public string AdminName { get; set; }
        public IReaderData Reader { private get; set; }

        public AdminPanel(string adminName, string adminPassword, IReaderData reader)
        {
            AdminName = adminName;
            _adminPassword = adminPassword;
            Reader = reader;
        }

        public AdminPanel(string v1, string v2, Operators.MySQLOperator mySQLOperator)
        {
            this.v1 = v1;
            this.v2 = v2;
            this.mySQLOperator = mySQLOperator;
        }

        public AdminPanel(string v1, string v2, Operators.SQLiteOperator sQLiteOperator)
        {
            this.v1 = v1;
            this.v2 = v2;
            this.sQLiteOperator = sQLiteOperator;
        }

        public List<User> Read()
        {
            return Reader.ReadData();
        }
    }
}
