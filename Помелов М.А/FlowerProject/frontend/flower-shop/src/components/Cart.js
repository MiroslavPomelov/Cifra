import React from 'react';

const cartItems = [
  {
    id: 1,
    name: 'Букет "Весенний рассвет"',
    price: 2200,
    image: 'https://img.freepik.com/free-photo/beautiful-bouquet-flowers_23-2148864972.jpg?w=400',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Букет "Розовое настроение"',
    price: 1800,
    image: 'https://img.freepik.com/free-photo/beautiful-bouquet-flowers_23-2148864972.jpg?w=400',
    quantity: 2,
  },
];

export default function Cart() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-extrabold text-pink-500 mb-10 text-center">Корзина</h1>
      {cartItems.length === 0 ? (
        <div className="text-lg text-gray-500 text-center">Ваша корзина пуста</div>
      ) : (
        <div className="space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center bg-white rounded-2xl shadow p-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl mr-4" />
              <div className="flex-1">
                <div className="font-bold text-lg text-gray-800">{item.name}</div>
                <div className="text-pink-500 font-semibold">{item.price} ₽ × {item.quantity}</div>
              </div>
              <div className="font-bold text-xl text-gray-800">{item.price * item.quantity} ₽</div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-8 border-t pt-6">
            <div className="text-xl font-bold">Итого:</div>
            <div className="text-2xl font-extrabold text-pink-500">{total} ₽</div>
          </div>
          <button className="w-full py-4 bg-pink-400 hover:bg-pink-500 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-200 mt-4">Оформить заказ</button>
        </div>
      )}
    </section>
  );
} 