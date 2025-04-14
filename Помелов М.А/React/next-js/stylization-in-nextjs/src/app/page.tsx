"use client"
import React from "react";
import styles from "./styles/styles.module.css";
import Button from "./components/ui/button/button";
import ProductCard from "./components/ui/ProductCard";
import Header from "./components/ui/header/header";
import CardContainet from "./components/ui/cardContainer/cardContainer";
import Pagenav from "./pagenav/Pagenav";


export default function Home() {

  const listOfProducts = [
    {
      id: 1,
      title: "Смартфон Galaxy S21",
      description: "Смартфон с 6.2-дюймовым экраном и тройной камерой.",
      price: 150,
      src: 'dizayn-stil-ideya-komfort.webp'
    },
    {
      id: 2,
      title: "Ноутбук Dell XPS 13",
      description: "Мощный ноутбук с процессором Intel Core i7.",
      price: 300,
      src: 'dizayn-stil-ideya-komfort.webp'
    },
    {
      id: 3,
      title: "Наушники Sony WH-1000XM4",
      description: "Беспроводные наушники с активным шумоподавлением.",
      price: 450,
      src: 'dizayn-stil-ideya-komfort.webp'
    },
    {
      id: 4,
      title: "Планшет Apple iPad Air",
      description: "Планшет с Retina дисплеем и поддержкой Apple Pencil.",
      price: 600,
      src: 'dizayn-stil-ideya-komfort.webp'
    },
    {
      id: 5,
      title: "Камера Canon EOS R5",
      description: "Профессиональная беззеркальная камера с 45 МП.",
      price: 750,
      src: 'dizayn-stil-ideya-komfort.webp'
    },
    {
      id: 6,
      title: "Часы Garmin Fenix 6",
      description: "Спортивные часы с GPS и функцией мониторинга здоровья.",
      price: 900,
      src: 'dizayn-stil-ideya-komfort.webp'
    },
    {
      id: 7,
      title: "Электрическая зубная щетка Oral-B",
      description: "Электрическая зубная щетка с датчиком давления.",
      price: 1050,
      src: 'dizayn-stil-ideya-komfort.webp'
    },
    {
      id: 8,
      title: "Геймпад Xbox Wireless",
      description: "Беспроводной геймпад для консоли Xbox.",
      price: 1200,
      src: 'dizayn-stil-ideya-komfort.webp'
    },
    {
      id: 9,
      title: "Монитор LG UltraWide 29",
      description: "Широкоформатный монитор для продуктивной работы.",
      price: 1350,
      src: 'dizayn-stil-ideya-komfort.webp'
    },
    {
      id: 10,
      title: "Клавиатура Logitech MX Keys",
      description: "Клавиатура с подсветкой и бесшумными клавишами.",
      price: 1000,
      src: "''dizayn-stil-ideya-komfort.webp''0"
    },
    {
      id: 11,
      title: "Мышь Razer DeathAdder V2",
      description: "Игровая мышь с высокой чувствительностью.",
      price: 1150,
      src: "''dizayn-stil-ideya-komfort.webp''1"
    },
    {
      id: 12,
      title: "Внешний жесткий диск Seagate",
      description: "Внешний жесткий диск на 1 ТБ для хранения данных.",
      price: 1300,
      src: "''dizayn-stil-ideya-komfort.webp''2"
    },
    {
      id: 13,
      title: "Умная колонка Amazon Echo",
      description: "Умная колонка с поддержкой Alexa и Bluetooth.",
      price: 1450,
      src: "''dizayn-stil-ideya-komfort.webp''3"
    },
    {
      id: 14,
      title: "Кофеварка De'Longhi Magnifica",
      description: "Кофеварка с функцией приготовления капучино.",
      price: 1600,
      src: "''dizayn-stil-ideya-komfort.webp''4"
    },
    {
      id: 15,
      title: "Холодильник Samsung Family Hub",
      description: "Холодильник с сенсорным экраном и Wi-Fi.",
      price: 1750,
      src: "''dizayn-stil-ideya-komfort.webp''5"
    },
    {
      id: 16,
      title: "Пылесос Dyson V11",
      description: "Беспроводной пылесос с длительным временем работы.",
      price: 1900,
      src: "''dizayn-stil-ideya-komfort.webp''6"
    },
    {
      id: 17,
      title: "Стиральная машина Bosch Serie 4",
      description: "Стиральная машина с функцией сушения.",
      price: 2050,
      src: "''dizayn-stil-ideya-komfort.webp''7"
    },
    {
      id: 18,
      title: "Микроволновая печь Panasonic",
      description: "Микроволновая печь с инверторным управлением.",
      price: 2200,
      src: "''dizayn-stil-ideya-komfort.webp''8"
    },
    {
      id: 19,
      title: "Фитнес-браслет Xiaomi Mi Band 6",
      description: "Фитнес-браслет с мониторингом активности и сна.",
      price: 2350,
      src: "''dizayn-stil-ideya-komfort.webp''9"
    },
    {
      id: 20,
      title: "Техника для стирки LG TWINWash",
      description: "Умная техника для стирки с двумя барабанами.",
      price: 2000,
      src: "''dizayn-stil-ideya-komfort.webp''0"
    },
    {
      id: 21,
      title: "Проектор Epson Home Cinema",
      description: "Проектор с высокой яркостью и разрешением Full HD.",
      price: 2150,
      src: "''dizayn-stil-ideya-komfort.webp''1"
    },
    {
      id: 22,
      title: "Кинотеатр на дому Samsung",
      description: "Кинотеатр на дому с системой объемного звука.",
      price: 2300,
      src: "''dizayn-stil-ideya-komfort.webp''2"
    },
    {
      id: 23,
      title: "Виртуальная реальность Oculus Quest 2",
      description: "Виртуальные очки для игр и развлечений.",
      price: 2450,
      src: "''dizayn-stil-ideya-komfort.webp''3"
    },
    {
      id: 24,
      title: "Гироскутер Xiaomi",
      description: "Гироскутер с управлением через приложение.",
      price: 2600,
      src: "''dizayn-stil-ideya-komfort.webp''4"
    },
    {
      id: 25,
      title: "Электросамокат Ninebot",
      description: "Электросамокат с максимальной скоростью 25 км/ч.",
      price: 2750,
      src: "''dizayn-stil-ideya-komfort.webp''5"
    },
    {
      id: 26,
      title: "Рюкзак The North Face",
      description: "Удобный рюкзак для путешествий и повседневного использования.",
      price: 2900,
      src: "''dizayn-stil-ideya-komfort.webp''6"
    },
    {
      id: 27,
      title: "Спортивная обувь Adidas Ultraboost",
      description: "Легкие спортивные кроссовки для бега.",
      price: 3050,
      src: "''dizayn-stil-ideya-komfort.webp''7"
    },
    {
      id: 28,
      title: "Футболка Nike Dri-FIT",
      description: "Футболка из дышащего материала для тренировок.",
      price: 3200,
      src: "''dizayn-stil-ideya-komfort.webp''8"
    },
    {
      id: 29,
      title: "Джинсы Levi's 501",
      description: "Классические джинсы с прямым кроем.",
      price: 3350,
      src: "''dizayn-stil-ideya-komfort.webp''9"
    },
    {
      id: 30,
      title: "Сумка Michael Kors",
      description: "Стильная сумка для документов и ноутбука.",
      price: 3000,
      src: "''dizayn-stil-ideya-komfort.webp''0"
    },
    {
      id: 31,
      title: "Пальто Calvin Klein",
      description: "Элегантное пальто для холодной погоды.",
      price: 3150,
      src: "''dizayn-stil-ideya-komfort.webp''1"
    },
    {
      id: 32,
      title: "Шарф Burberry",
      description: "Шарф из натуральной шерсти.",
      price: 3300,
      src: "''dizayn-stil-ideya-komfort.webp''2"
    },
    {
      id: 33,
      title: "Парфюм Chanel No. 5",
      description: "Популярный парфюм с цветочными нотами.",
      price: 3450,
      src: "''dizayn-stil-ideya-komfort.webp''3"
    },
    {
      id: 34,
      title: "Косметика L'Oreal",
      description: "Косметика для ухода за кожей с витаминами.",
      price: 3600,
      src: "''dizayn-stil-ideya-komfort.webp''4"
    },
    {
      id: 35,
      title: "Шампунь Pantene Pro-V",
      description: "Шампунь для нормальных и сухих волос.",
      price: 3750,
      src: "''dizayn-stil-ideya-komfort.webp''5"
    },
    {
      id: 36,
      title: "Крем для лица Nivea",
      description: "Крем для лица с защитой от солнца.",
      price: 3900,
      src: "''dizayn-stil-ideya-komfort.webp''6"
    },
    {
      id: 37,
      title: "Зубная паста Sensodyne",
      description: "Зубная паста для чувствительных зубов.",
      price: 4050,
      src: "''dizayn-stil-ideya-komfort.webp''7"
    },
    {
      id: 38,
      title: "Сыр моцарелла Galbani",
      description: "Сыр моцарелла для пиццы и салатов.",
      price: 4200,
      src: "''dizayn-stil-ideya-komfort.webp''8"
    },
    {
      id: 39,
      title: "Кофе Lavazza",
      description: "Кофе в зернах с ярким вкусом и ароматом.",
      price: 4350,
      src: "''dizayn-stil-ideya-komfort.webp''9"
    },
    {
      id: 40,
      title: "Шоколад Milka",
      description: "Шоколад с нежной текстурой.",
      price: 4000,
      src: "''dizayn-stil-ideya-komfort.webp''0"
    },
    {
      id: 41,
      title: "Чай Lipton",
      description: "Чай с натуральными ароматами.",
      price: 4150,
      src: "''dizayn-stil-ideya-komfort.webp''1"
    },
    {
      id: 42,
      title: "Орехи Mix Nuts",
      description: "Смесь орехов для закусок.",
      price: 4300,
      src: "''dizayn-stil-ideya-komfort.webp''2"
    },
    {
      id: 43,
      title: "Сухофрукты Sun-Maid",
      description: "Сухофрукты для здорового перекуса.",
      price: 4450,
      src: "''dizayn-stil-ideya-komfort.webp''3"
    },
    {
      id: 44,
      title: "Вино Cabernet Sauvignon",
      description: "Вино с ярким вкусом и ароматом.",
      price: 4600,
      src: "''dizayn-stil-ideya-komfort.webp''4"
    },
    {
      id: 45,
      title: "Пиво Heineken",
      description: "Пиво с легким хмелевым вкусом.",
      price: 4750,
      src: "''dizayn-stil-ideya-komfort.webp''5"
    },
    {
      id: 46,
      title: "Соки Tropicana",
      description: "Соки из свежих фруктов.",
      price: 4900,
      src: "''dizayn-stil-ideya-komfort.webp''6"
    },
    {
      id: 47,
      title: "Энергетик Red Bull",
      description: "Энергетик для бодрости и энергии.",
      price: 5050,
      src: "''dizayn-stil-ideya-komfort.webp''7"
    },
    {
      id: 48,
      title: "Вода San Pellegrino",
      description: "Минеральная вода с газом.",
      price: 5200,
      src: "''dizayn-stil-ideya-komfort.webp''8"
    },
    {
      id: 49,
      title: "Печенье Oreo",
      description: "Песочное печенье с кремовой начинкой.",
      price: 5350,
      src: "''dizayn-stil-ideya-komfort.webp''9"
    },
    {
      id: 50,
      title: "Конфеты Kinder",
      description: "Конфеты с шоколадной оболочкой.",
      price: 5000,
      src: "''dizayn-stil-ideya-komfort.webp''0"
    }
  ];

  const lastPage = Math.floor(listOfProducts.length / 7);

  return (
    <div>
      <CardContainet>

        <Header>List of Products</Header>

        {listOfProducts.map((item) => (
          <ProductCard src={item.src} title={item.title} price={item.price} description={item.description}/>
        ))}
      </CardContainet>

      <Pagenav length={lastPage}></Pagenav>

    </div>
  );
}
