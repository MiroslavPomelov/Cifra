using System.Xml.Serialization;

namespace XMLPrakt
{

    internal class Program
    {
        static void Main(string[] args)
        {
            Goods goods = new Goods();
            List<Goods> goodsList = new List<Goods>();

            Console.WriteLine("1 - Добавить, 2 - Удалить, 3 - Сохранить, 4 - Загрузить список, 5 - Выйти");
            int choice = int.Parse(Console.ReadLine());

            while (choice != 5)
            {
                switch (choice)
                {
                    case 1:
                        goodsList.Add(new Goods(Console.ReadLine(), Console.ReadLine(), decimal.Parse(Console.ReadLine())));
                        break;
                    case 2:
                        Console.WriteLine("Введите индекс: ");
                        int index = int.Parse(Console.ReadLine());
                        goodsList.RemoveAt(index);
                        break;
                    case 3:
                        XMLWorker.Serialize(goodsList);
                        break;
                    case 4:
                        XMLWorker.Deserialize();
                        break;
                    case 5:
                        break;
                }
                choice = int.Parse(Console.ReadLine());
            }
        }
    }
}