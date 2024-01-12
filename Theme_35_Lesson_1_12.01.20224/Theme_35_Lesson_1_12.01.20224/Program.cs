namespace Theme_35_Lesson_1_12._01._20224
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Product> products = new List<Product>()
            {
                new Product(0, "Телевизор", "Мощный телек", 1500.0, 25),
                new Product(1, "Пылесос", "Мощный пылесос", 200.0, 20),
                new Product(2, "Утюг", "Паровой", 15000.0, 16),
                new Product(3, "Холодильник", "Большой", 12900.0, 40),
                new Product(4, "Шуруповерт", "Не для гвоздей", 35000.0, 125),
            };

            //IEnumerable<Product> items = products.Where(p => p.Price < 1000.0); // Для выборки данных по условию лямбда

            //foreach (var item in items)
            //{
            //    Console.WriteLine(item.Name);
            //}

            // Отложенный линк запрос, выполняется при обращении к коллекции
            //IEnumerable<string> result = from good in products
            //                             where good.Price < 1000.0
            //                             select good.Name;

            // Запрос на линк
            IEnumerable<Product> LinqResult = from good in products
                                         where good.Price < 1000.0
                                         select good;

            // Запрос на линк методах расширения
            IEnumerable<string> extensionMethodResult = products.Where(good => good.Price < 1000.0).Select(good => good.Name)!;

        }
    }
}