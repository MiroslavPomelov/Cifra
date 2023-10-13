namespace PraktDelegates11._10
{
    internal class Program
    {
        //delegate int MyDelegate<T>(T value, T value2);
        //delegate bool MyDelegate1<T>(int boolValue);
        //delegate bool MyDelegate2<T>(int boolValueFact);
        //delegate int MyDelegate4<T>(int[] array);
        //delegate void MyDelegate5<T>(int[] array);
        delegate int MyDelegate1<T>(int[] value);
        delegate void MyDelegate2<T>(List<DateTime> value);
        delegate void MyDelegate3<T>(string[] value);

        static void Main(string[] args)
        {

            //MyDelegate<int> print = delegate (int value, int value2)
            //{
            //    return (value * value2);
            //};

            //MyDelegate1<bool> printBool = delegate (int boolValue)
            //{
            //    if (boolValue % 2 == 0)
            //    {
            //        return true;
            //    }
            //    else
            //    {
            //        return false;
            //    }
            //};

            //MyDelegate2<bool> printBoolFact = delegate (int boolValueFact)
            //{
            //    return boolValueFact == 0;
            //};



            ///Prakt

            //Console.WriteLine("Макс число:");
            //MyDelegate4<int[]> arrSort = delegate (int[] array)
            //{
            //    Console.WriteLine(array.Max());
            //    return array.Max();
            //}; arrSort(new int[5] { 5, 4, 8, 11, 6 });


            //Console.WriteLine("Cортированый массив:");
            //MyDelegate5<int[]> arrSorted = delegate (int[] array)
            //{
            //    Array.Sort(array);
            //    for (int i = 0; i < array.Length; i++)
            //    {
            //        Console.WriteLine(array[i]);
            //    }
            //}; arrSorted(new int[5] { 5, 4, 8, 11, 6 });


            //Lambda
            int[] array = new int[5] { 5, 4, 8, 11, 6 };

            //MyDelegate1<int[]> myDelegate1 = x => Array.Sort(x);

            Action<int[]> printArr = x =>
            {
                Array.Sort(x);
                for (int i = 0; i < x.Length; i++)
                {
                    if (x[i] % 2 == 0)
                    {
                        Console.WriteLine(x[i]);
                    }
                }
            };
            printArr(array);

            //2

            List<DateTime> dateTimes = new List<DateTime>();

            dateTimes.Add(new DateTime(2019, 08, 12));
            dateTimes.Add(new DateTime(2020, 06, 20));
            dateTimes.Add(new DateTime(2023, 10, 28));
            dateTimes.Add(new DateTime(2024, 01, 30));

            Console.WriteLine("\nСортированные даты: ");
            MyDelegate2<List<DateTime>> myDelegate2 = x =>
            {
                dateTimes.Sort();
                for (int i = 0; i < dateTimes.Count; i++)
                {
                    if (DateTime.Now < dateTimes[i])
                    {
                        Console.WriteLine(dateTimes[i]);
                    }
                }
            }; myDelegate2(dateTimes);

            //3

            Console.WriteLine("\nCлова больше 5 букв: ");
            string[] stringArray = new string[] { "Hello", "World", "go", "Miroslav", "Tree" };

            MyDelegate3<string[]> myDelegate3 = x =>
            {
                for (int i = 0; i < stringArray.Length; i++)
                {
                    if (stringArray[i].Length >= 5)
                    {
                        Console.WriteLine(stringArray[i]);
                    }
                }
            }; myDelegate3(stringArray);
        }
    }


}