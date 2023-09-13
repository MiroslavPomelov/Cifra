namespace SandBox_POB2213
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string name = null!;

            name ??= string.Empty; //Сокращенная запись null
            //?. - проверка на нул предшествующего вызова (все что после знака не работает)
            //??= - проверка с переопределением

            Console.WriteLine(name.Length);
        }

        public static int GetQuantity(string parameter)
        {
            string result = parameter ?? string.Empty; //?? - Если нулл то пустая строка иначе result = parameter.
            return result.Length;
        }
    }

    //sealed - запрет на наследование класса.
}