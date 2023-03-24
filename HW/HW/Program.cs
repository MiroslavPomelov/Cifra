namespace HW
{
    internal class Program
    {
        static void Main(string[] args)
        {
            char[] _separators = new char[] { ' ', ',', '.' };
            string _UserValue;
            bool word = true;

            CheckIntegerValue("Введите что либо: ");
            LetterCount("Длинна слова:");
            WordCount("Количество слов:");

            //Проверка целого или вещественного числа
            void CheckIntegerValue(string message)
            {
                Console.WriteLine(message);
                _UserValue = Console.ReadLine().Replace(".", ",");
                float UserValue;

                if (float.TryParse(_UserValue, out UserValue))
                {

                    if (UserValue % 1 == 0 || UserValue == 0)
                    {
                        Console.Write("Целое число");
                    }
                    else
                    {
                        Console.Write("Вещественное число");
                    }
                    word = false;
                }
            }

            void LetterCount(string message)
            {
                if (word)
                {
                    Console.WriteLine();
                    Console.WriteLine($"{message} {_UserValue.Length}");
                }
            }

            void WordCount(string message)
            {
                Console.WriteLine();
                string[] words = _UserValue.ToString().Split(_separators, StringSplitOptions.RemoveEmptyEntries);
                Console.WriteLine($"{message} {words.Length}");
            }
        }
    }
}