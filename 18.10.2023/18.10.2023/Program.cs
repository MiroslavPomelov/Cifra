namespace _18._10._2023
{
    internal class Program
    {
        /// <summary>
        /// События - реакция на внешние действие (уведомление)
        /// Делегат - учатсник общего кода
        /// </summary>
        /// 
        public static event MyDelegate MyEvent;
        static void Main(string[] args)
        {
            MyEvent += Displayer;

            if (true)
            {
                MyEvent();
            }
        }
        public static void Displayer()
        {
            Console.WriteLine("Отработал");
        }
    }

    public delegate void MyDelegate();

}