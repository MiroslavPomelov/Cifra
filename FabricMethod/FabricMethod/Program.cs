namespace FabricMethod
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Factory factory = new BakeryPie("Пиржок", "обычный", "100", "вкусный");
            Product pieDeafault = factory.CreateProduct();

            factory = new BakeryPie("Пиржок", "Необычный", "200", "очень вкусный");
            Product pie = factory.CreateProduct();

            factory = new BakeryCheburek("Чебурек", "Нормальный", "150", 20);
            Product cheburek = factory.CreateProduct();

            Product[] products =
            {
                pieDeafault, pie, cheburek
            };

            foreach (Product product in products)
            {
                product.DisplayInfo();
            }
        }
    }

    public abstract class Product
    {
        protected readonly string _name;
        protected readonly string _description;
        protected readonly string _price;

        protected Product(string name, string description, string price)
        {
            _name = name;
            _description = description;
            _price = price;
        }

        public abstract void DisplayInfo();
    }

    public class Pie : Product
    {
        private readonly string _tasty;
        public Pie(string name, string description, string price, string tasty) : base(name, description, price)
        {
            _tasty = tasty;
        }

        public override void DisplayInfo()
        {
            Console.WriteLine(
                $"Название: {_name}\n" +
                $"Описание: {_description}\n" +
                $"Цена: {_price}\n" +
                $"Вкусность: {_tasty}\n"
                );
        }
    }

    public class Bulka : Product
    {

        private readonly int _weight;

        public Bulka(string name, string description, string price, int weight) : base(name, description, price)
        {
            _weight = weight;
        }

        public override void DisplayInfo()
        {
            Console.WriteLine(
                $"Название: {_name}\n" +
                $"Описание: {_description}\n" +
                $"Цена: {_price}\n" +
                $"Вec: {_weight}\n"
                );
        }
    }

    public class Cheburek : Product
    {
        private readonly int _meat;
        public Cheburek(string name, string description, string price, int meat) : base(name, description, price)
        {
            _meat = meat;
        }

        public override void DisplayInfo()
        {
            Console.WriteLine(
                $"Название: {_name}\n" +
                $"Описание: {_description}\n" +
                $"Цена: {_price}\n" +
                $"мясность: {_meat}\n"
                );
        }
    }

    public abstract class Factory
    {
        public abstract Product CreateProduct();
    }

    public class BakeryPie : Factory
    {

        protected readonly string _name;
        protected readonly string _description;
        protected readonly string _price;
        private readonly string _tasty;

        public BakeryPie(string name, string description, string price, string tasty)
        {
            _name = name;
            _description = description;
            _price = price;
            _tasty = tasty;
        }

        public override Product CreateProduct()
        {
            return new Pie(_name, _description, _price, _tasty);
        }
    }

    public class BakeryBulka : Factory
    {

        protected readonly string _name;
        protected readonly string _description;
        protected readonly string _price;
        private readonly int _weight;

        public BakeryBulka(string name, string description, string price, int weight)
        {
            _name = name;
            _description = description;
            _price = price;
            _weight = weight;
        }

        public override Product CreateProduct()
        {
            return new Bulka(_name, _description, _price, _weight);
        }
    }

    public class BakeryCheburek : Factory
    {

        protected readonly string _name;
        protected readonly string _description;
        protected readonly string _price;
        private readonly int _meat;

        public BakeryCheburek(string name, string description, string price, int meat)
        {
            _name = name;
            _description = description;
            _price = price;
            _meat = meat;
        }

        public override Product CreateProduct()
        {
            return new Cheburek(_name, _description, _price, _meat);
        }
    }
}