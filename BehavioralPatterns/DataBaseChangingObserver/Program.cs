namespace DataBaseChangingObserver
{
    class Program
    {
        public static async Task Main()
        {
            Operator oper = new Operator();
            Subscriber sub1 = new Subscriber("Подписчик 1");
            Subscriber sub2 = new Subscriber("Подписчик 2");

            // Подписываем подписчиков на событие изменения данных
            oper.DataChanged += sub1.OnDataChanged;
            oper.DataChanged += sub2.OnDataChanged;

            await oper.Operate();
        }
    }
}