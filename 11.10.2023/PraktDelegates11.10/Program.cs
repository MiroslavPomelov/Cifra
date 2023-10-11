namespace PraktDelegates11._10
{
    internal class Program
    {
        delegate int MyDelegate<T>(T value, T value2);
        delegate bool MyDelegate1<T>(int boolValue);
        delegate bool MyDelegate2<T>(int boolValueFact);
        static void Main(string[] args)
        {
            MyDelegate<int> print = delegate (int value, int value2)
            {
                return (value * value2);
            };

            MyDelegate1<bool> printBool = delegate (int boolValue)
            {
                if (boolValue % 2 == 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            };

            MyDelegate2<bool> printBoolFact = delegate (int boolValueFact)
            {
               return boolValueFact == 0;
            };
        }
    }


}