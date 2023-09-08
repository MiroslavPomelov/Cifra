using HWOOP2new;
internal class Program
{
    private static void Main(string[] args)
    {
        Massive massive = new Massive();

        massive = new Massive(20);

        massive.GenerateRandom();
        massive.Print();
        massive.RandomSort();
        massive.Print();
        massive.Sort();
        massive.FindDiffrents();
    }
}