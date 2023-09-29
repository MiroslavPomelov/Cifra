namespace _29._09._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ArrayOfStrings[] arr = new ArrayOfStrings[2]
            {
              ArrayOfStrings arr = new ArrayOfStrings(1);
            ArrayOfStrings arr = new ArrayOfStrings(2);
        }
        arr[30] = "Hello";
        }
}

class ArrayOfStrings
{
    private string[] _array = new string[10];


    public ArrayOfStrings(int length)
    {
        _array = new string[length];
    }
    public string this[int index]
    {
        get
        {
            return _array[index];
        }
        set
        {
            if (index < 0 || index > _array.Length)
            {
                throw new IndexOutOfRangeException("Введен неверный индекс!");
            }
            _array[index] = value;
        }
    }
}
}