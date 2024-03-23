
namespace StructPattern15._03._2024
{
    public class ProgressDecorator : Human
    {
        private readonly Human _human;

        public ProgressDecorator(Human human)
        {
            _human = human;
        }

        public override void DisplayInfo()
        {
            _human.DisplayInfo();
            Go();
            Read();
            Speak();
            Write();
        }

        public void Go()
        {
            Console.WriteLine($"{_human.Name} хожу");
        }

        public void Read()
        {
            Console.WriteLine($"{_human.Name} читаю");
        }

        public void Speak()
        {
            Console.WriteLine($"{_human.Name} говорю");
        }

        public void Write()
        {
            Console.WriteLine($"{_human.Name} пишу");
        }
    }
}
