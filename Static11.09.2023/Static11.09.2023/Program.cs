namespace Static11._09._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            House cottage = new House();
            House.square = 50;
            House.height = 10;
            House.windowQuantity = 6;


            Console.WriteLine(cottage.Volume());


            //Console.WriteLine("Коттедж \nПлощадь: {0}\nВыстоа: {1}\nКоличество окон:{2}", cottage.square, cottage.height, cottage.windowQuantity);
            //Console.WriteLine();
            //Console.WriteLine("Таунхаус \nПлощадь: {0}\nВыстоа: {1}\nКоличество окон:{2}", townHouse.square, townHouse.height, townHouse.windowQuantity);
        }
    }

   static class House
    {
        public static int square;
        public static int height;
        public static int windowQuantity;

        public static int Volume()
        {
            return height * square;
        }

        public static void BuildingNumber()
        {

        }
    }
}