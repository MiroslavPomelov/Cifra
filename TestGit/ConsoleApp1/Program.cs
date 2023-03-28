using System.Text;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string _line;
            float _value=0f;
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
                else if (letter == '.' || letter == ',')
                {
                    _valueStringBuilder.Append(',');
                }
            }

            if (_valueStringBuilder.Length == 0)
            {
                Console.WriteLine("net chisla");
            }
            else
            {
                _value = float.Parse(_valueStringBuilder.ToString());
            }

            //вывод
            Console.WriteLine("number = " +_value);
        }
    }
}
