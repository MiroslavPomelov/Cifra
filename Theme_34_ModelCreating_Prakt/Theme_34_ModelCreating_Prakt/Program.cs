using System.Collections.Generic;
using Theme_34_ModelCreating_Prakt.Entities;

namespace Theme_34_ModelCreating_Prakt
{
    internal class Program
    {
        static void Main(string[] args)
        {

            Category food = new Category("Еда", "Съедобная");
            Category tools = new Category("Инструменты", "Монтажные");

            List<Product> foodCat = new List<Product>()
            {
                new Product("Яблоко", "Зеленое", 25, food),
                new Product("Груша", "Светло зеленая", 20, food),
                new Product("Тыква", "Оранжевая", 40, food),
                new Product("Банан", "Желтый", 18, food),
                new Product("Слива", "Синяя", 15, food),
            };

            List<Product> toolsCat = new List<Product>()
            {
                new Product("Молоток", "Желензный", 125, tools),
                new Product("Пила", "Бензиновая", 220, tools),
            };

            User firstUser = new User("Miroslav", "Kaliningrad", "123456", null!);
            User secondUser = new User("Alex", "Moscow", "654321", null!);

            List<Order> firstOrder = new List<Order>(){
                new Order(new DateTime(2023, 12, 25), Status.Ok, firstUser, foodCat)
            };
            List<Order> secondOrder = new List<Order>() {
                new Order(new DateTime(2023, 12, 26), Status.Failed, secondUser, toolsCat)
            };

            firstUser.Orders = firstOrder;
            secondUser.Orders = secondOrder;

            using (InternetShopDbContext dBContext = new InternetShopDbContext())
            {
                //dBContext.Categories.Add(food);
                //dBContext.Categories.Add(tools);

                //foreach (Product products in foodCat)
                //{
                //    dBContext.Products.Add(products);
                //}

                //foreach (Product products in toolsCat)
                //{
                //    dBContext.Products.Add(products);
                //}

                //dBContext.Users.Add(firstUser);
                //dBContext.Users.Add(secondUser);

                foreach (var item in firstOrder)
                {

                    dBContext.Orders.Add(item);
                }
                foreach (var item in secondOrder)
                {

                    dBContext.Orders.Add(item);
                }

                dBContext.SaveChanges();
            }
        }
    }
}