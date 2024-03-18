

namespace Observer
{
    internal class Coocker : IObserver
    {
        private IObservable _orders;

        public Coocker(string name, IObservable orders)
        {
            _orders = orders;
            Name = name;
        }

        public string Name { get; set; }
        public void Update(object ob)
        {
            throw new NotImplementedException();
        }
    }
}
