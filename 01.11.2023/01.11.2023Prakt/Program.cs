using System.Runtime.CompilerServices;

namespace _01._11._2023Prakt
{
    internal class Program
    {
        static void Main(string[] args)
        {
            CustomArray myArr = new CustomArray(5);
            myArr[0] = 5.5;
        }

        public static void Shower(object? obj)
        {
            if (obj is CustomArray)
            {
                CustomArray customArray = (CustomArray)obj;
                for (int i = 0; i < customArray.Length; i++)
                {
                    Console.WriteLine(customArray[i]);
                }
            }
            else if (obj is string)
            {
                Console.WriteLine(obj);
            }
            else if (!(obj is int[]))
            {
                int[] array = (int[])obj;
                int temp = 0;
                foreach (int item in array)
                {
                    temp += item;
                    Console.WriteLine(item);
                }
            }
        }
    }

    class CustomArray
    {
        private double[] _data;
        public int Length { get { return _data.Length; } }

        public double this[int index]
        {
            get
            {
                return _data[index];
            }
            set
            {
                _data[index] = value;
            }
        }

        public CustomArray(int Length)
        {
            _data = new double[Length];
        }
    }
}