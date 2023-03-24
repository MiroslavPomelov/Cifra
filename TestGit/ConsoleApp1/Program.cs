using System.Text;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string _line;
            StringBuilder _valueStringBuilder = new StringBuilder();

            //ввод
            Console.Write("Vvedite znachenie: ");
           _line = Console.ReadLine();

            //обработка
            for (int i = 0; i < _line.Length; i++)
            {
                char letter = _line[i];
                if (char.IsDigit(letter))
                {
                    _valueStringBuilder.Append(letter);
                }
            }
        }
    }
}
