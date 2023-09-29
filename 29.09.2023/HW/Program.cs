namespace HW
{
    internal class Program
    {
        static void Main(string[] args)
        {
            BaseClass bc = new BaseClass();

            bc.field = 76665;

            Console.WriteLine(bc[1]);
        }
    }

    class BaseClass
    {
        public int field;

        public virtual int this[int number]
        {
            get
            {
                int summCounter = 0;
                int temp = field;

                for (int i = 0; field > 0; i++)
                {
                    temp /= 10;
                    summCounter++;
                }

                int[] arr = new int[summCounter]; //Заполнение массива в обратном порядке
                temp = field;

                for (int i = 0; i < temp; i++)
                {
                    arr[i] = temp % 10;
                    temp /= 10;
                }
                Array.Reverse(arr); 
                return arr[number];
            }
        }
    }
}