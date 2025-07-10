import React from 'react';

const products = [
  {
    id: 1,
    name: 'Букет "Весенний рассвет"',
    price: 2200,
    image: 'https://img.freepik.com/free-photo/beautiful-bouquet-flowers_23-2148864972.jpg?w=400',
  },
  {
    id: 2,
    name: 'Букет "Розовое настроение"',
    price: 1800,
    image: 'https://img.freepik.com/free-photo/beautiful-bouquet-flowers_23-2148864972.jpg?w=400',
  },
  {
    id: 3,
    name: 'Букет "Летний сад"',
    price: 2500,
    image: 'https://img.freepik.com/free-photo/beautiful-bouquet-flowers_23-2148864972.jpg?w=400',
  },
  {
    id: 4,
    name: 'Букет "Белая нежность"',
    price: 2100,
    image: 'https://img.freepik.com/free-photo/beautiful-bouquet-flowers_23-2148864972.jpg?w=400',
  },
];

export default function Catalog() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-extrabold text-pink-500 mb-10 text-center">Каталог букетов</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition hover:scale-105 hover:shadow-2xl">
            <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded-xl mb-4" />
            <h2 className="text-lg font-bold text-gray-800 mb-2 text-center">{product.name}</h2>
            <div className="text-pink-500 font-semibold text-xl mb-4">{product.price} ₽</div>
            <button className="px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-xl font-semibold transition">В корзину</button>
          </div>
        ))}
      </div>
    </section>
  );
} 