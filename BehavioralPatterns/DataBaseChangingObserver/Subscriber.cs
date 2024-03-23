namespace DataBaseChangingObserver
{
    public class Subscriber
    {
        private readonly string _name;

        public Subscriber(string name)
        {
            _name = name;
        }

        public void OnDataChanged(object sender, EventArgs e)
        {
            Console.WriteLine($"Подписчик {_name} уведомлен: Данные в базе были изменены.");
        }
    }
}
