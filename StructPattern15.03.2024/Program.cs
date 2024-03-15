using StructPattern15._03._2024;

internal class Program
{
    private static void Main(string[] args)
    {
        Human baby1 = new Baby();

        baby1 = new ProgressDecorator(baby1);

        baby1.DisplayInfo();
    }
}