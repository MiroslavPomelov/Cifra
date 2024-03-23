
namespace StructPattern15._03._2024
{
    public class Baby : Human
    {
        public override string Name => "Младенец";

        public override void DisplayInfo()
        {
            Console.WriteLine($"Я {Name}");
        }

    }
}
