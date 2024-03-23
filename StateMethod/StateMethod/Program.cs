using System;

namespace StateMethod
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Order order = new Order();

            order.newOrder();
            order.newOrder();

            order.payedOrder();
            order.payedOrder();
        }
    }

    public interface IOrderState
    {
        void newOrder(Order order);
        void payedOrder(Order order);
    }

    public class newOrder : IOrderState
    {
        void IOrderState.newOrder(Order order)
        {
            Console.WriteLine("Новый заказ уже создан");
        }

        public void payedOrder(Order order)
        {
            Console.WriteLine("Заказ оплачен");
            order.SetState(new payedOrder());
        }
    }

    public class payedOrder : IOrderState
    {
        public void newOrder(Order order)
        {
            Console.WriteLine("Новый заказ создан");
        }

        void IOrderState.payedOrder(Order order)
        {
            Console.WriteLine("Заказ уже оплачен");
            order.SetState(new newOrder());
        }
    }

    public class Order
    {
        private IOrderState _state;

        public Order()
        {
            _state = new newOrder();
        }

        public void SetState(IOrderState state) => _state = state;

        public void newOrder() => _state.newOrder(this);
        public void payedOrder() => _state.payedOrder(this);
    }
}
