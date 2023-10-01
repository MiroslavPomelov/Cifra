namespace Prakt2
{
    internal class Program
    {
       public static List<(string, int, double)> students = new List<(string, int, double)>
            {
                ("Qwerty ssss", 22, 90.5),
                ("Cvasdasd asdsad", 35, 87.9),
                ("Abcdefg dasdasd", 23, 20.1)
            };

        static void Main(string[] args)
        {
            students.GetAverageAge();
        }
    }

}