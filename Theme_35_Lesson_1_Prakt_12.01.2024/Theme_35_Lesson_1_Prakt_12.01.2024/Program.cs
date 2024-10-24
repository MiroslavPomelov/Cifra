﻿using System.Linq;

namespace Theme_35_Lesson_1_Prakt_12._01._2024
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Product[] products = new Product[]
            //{
            //    new Product(0, "Телевизор", "Мощный телек", 1200),
            //    new Product(1, "Ноутбук", "Мощный пылесос", 900),
            //    new Product(2, "Кофе машина", "Паровой", 150),
            //    new Product(3, "Bluetooth наушники", "Большой", 80),
            //    new Product(4, "Фитнесс браслет", "Не для гвоздей", 50),
            //    new Product(5, "Внешний жесткий диск", "Мощный телек", 120),
            //    new Product(6, "Беспроводная мышь", "Мощный пылесос", 25),
            //    new Product(7, "Игровое кресло","asdas", 200),
            //    new Product(8, "Умные часы", "Большой", 180),
            //    new Product(9, "Игровая клавиатура", "Не для гвоздей", 100),
            //};

            //IEnumerable<string> result = products.Where(good => good.Price < 150).Select(good => good.Name)!;

            //foreach (var item in result)
            //{
            //    Console.WriteLine(item);
            //}

            var events = new List<Event>
            {
                new Event { Id = 1, Name = "Презентация новых продуктов",Date = DateTime.Now.AddDays(10),Priority = Priority.High },
                new Event { Id = 2, Name = "Обучающий вебинар по программированию", Date = DateTime.Now.AddMonths(1), Priority = Priority.Low },
                new Event { Id = 3, Name = "Выставка искусства", Date = DateTime.Now.AddDays(20), Priority = Priority.Low },
                new Event { Id = 4, Name = "Спортивный турнир по футболу", Date = DateTime.Now.AddDays(30), Priority = Priority.High },
                new Event { Id = 5, Name = "Фестиваль культурных традиция", Date = DateTime.Now.AddMonths(2), Priority = Priority.Medium },
                new Event { Id = 6, Name = "Научная коференция по биологии",Date = DateTime.Now.AddMonths(3),Priority = Priority.High },
                new Event { Id = 7, Name = "Празднования дня города", Date = DateTime.Now.AddMonths(4), Priority = Priority.Medium },
                new Event { Id = 8, Name = "Концерт мировых хитов", Date = DateTime.Now.AddDays(25), Priority = Priority.High },
                new Event { Id = 9, Name = "Выставка технологических новинок", Date = DateTime.Now.AddMonths(2), Priority = Priority.High },
                new Event { Id = 10, Name = "Обучающий семинар по управлению временем", Date = DateTime.Now.AddDays(12), Priority = Priority.High }
            };

            IEnumerable<string> concreteEvents = events.Where(good => good.Date < DateTime.Now.AddMonths(1) && good.Priority == Priority.High).Select(good => good.Name)!;

            // Фильтрация линк по нескольким критериям
            IEnumerable<Event> concreteLinqEvents = from i in events
                                                 where i.Date >= new DateTime(2024, 02, 01) 
                                                 where i.Priority == Priority.High
                                                 select i;

            foreach (var item in concreteLinqEvents)
            {
                Console.WriteLine(item.Name);
            }

            // Фильтрация линк на методах расширения
            IEnumerable<Event> concreteExtensionEvents = events.Where(e => e.Date >= new DateTime(2024, 02, 01)).Where(e => e.Priority == Priority.High).Select(e => e);
        }
    }
}