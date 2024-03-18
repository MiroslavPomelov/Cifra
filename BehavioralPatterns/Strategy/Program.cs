using Strategy.Operators;

namespace Strategy
{
    internal class Program
    {
        static void Main(string[] args)
        {
            AdminPanel administratorMySQL = new("Евгений", "qwerty", new MySQLOperator());
            var dataMySQL = administratorMySQL.Read();

            AdminPanel administratorSQLite = new("Михаил", "ytrewq", new SQLiteOperator());
            var dataSQLite = administratorSQLite.Read();

            Printer(administratorMySQL, dataMySQL);
            Printer(administratorSQLite, dataSQLite);
        }

        public static void Printer(AdminPanel admin, List<User> users)
        {
            Console.WriteLine($"Данные админа {admin.AdminName}");
            foreach (var user in users)
            {
                Console.WriteLine(user.Name);
            }
            Console.WriteLine('\n');
        }
    }

    interface IReaderData
    {
        List<User> ReadData();
    }
}