

namespace Theme_35_Lesson_4_OOPTasks
{
    public class Fruit : InterFruit
    {
        public int? Tasty { get; set; }
        public decimal Price { get; set; }
        public string Name { get => "Apple";}

        public Fruit(int? tasty, decimal price)
        {
            Tasty = tasty;
            Price = price;
        }
    }
}
