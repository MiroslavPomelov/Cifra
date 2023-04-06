namespace sharp2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] _array = new int[10];
            int[] _array2 = new int[5];
            int[] _array3 = new int[5];

            _array = FillArray(_array.Length);
            _array2 = FillArray(_array2.Length);
            _array3 = FillArray(_array3.Length);

            Console.WriteLine(Join(" - ", _array));
            Console.WriteLine(Join(" - ", _array2));
            Console.WriteLine(Join(" - ", _array3));
            Console.WriteLine("Сумма 1 массива: "+ ArraySum(_array));
            Console.WriteLine("Сумма 2 массива: " + ArraySum(_array2));
            Console.WriteLine("Сумма 3 массива: " + ArraySum(_array3));
            Console.ReadLine();
            //PROGRAMM END

            int ArraySum(int[] array)
            {
                int result = 0;
                foreach (var item in array)
                {
                    result += item;
                }
                return result;
            }

            int[] FillArray(int arrayLength)
            {
                int[] array = new int[10];
                for (int i = 0; i < _array.Length; i++)
                {
                    array[i] = new Random().Next(0, 100);
                }
                return array;
            }

            string Join(string separate, int[] array)
            {
                string result = "";
                foreach (int item in array)
                {
                    result += item + separate;
                }
                return result;
            }
        }
    }
}