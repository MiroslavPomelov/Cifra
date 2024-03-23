using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPF_Prakt_2.Models;

namespace WPF_Prakt_2.Services
{
    public class ProductListCreator
    {
        public static List<Product> GetProducts()
        {
            return new List<Product>()
            {
                new (1,"Телефон", "Мощный телефон для игр",5000, 2),
                new (2,"Планешет", "Выбор дизайнеров",15000, 1),
                new (3,"Ноутбук", "Ноутбук для работы",30000, 3),
                new (4,"Монитор", "Разрешение 4К",12000, 4),
                new (5,"Клавиатура", "Механическая белая",2500, 5),
                new (6,"Мышь", "С подстветкой",1800, 6),
                new (7,"Принтер", "Цветной лазерный",8000, 7),
                new (8,"Колонки", "Чистый, хороший звук",4000, 8),
                new (9,"Флешка", "Объем 10 Петабайт",2000, 9)
            };
        }
    }
}
