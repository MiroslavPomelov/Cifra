import React from 'react';

export default function Profile() {
  // Примерные данные пользователя
  const user = {
    name: 'Мария Петрова',
    email: 'maria@example.com',
    city: 'Москва',
    phone: '+7 999 123-45-67',
  };

  return (
    <section className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-extrabold text-pink-500 mb-10 text-center">Профиль</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-pink-200 flex items-center justify-center text-3xl font-bold text-pink-500 mb-6">
          {user.name[0]}
        </div>
        <div className="w-full space-y-4 mb-8">
          <div className="flex justify-between text-lg"><span className="text-gray-500">Имя:</span><span className="font-semibold">{user.name}</span></div>
          <div className="flex justify-between text-lg"><span className="text-gray-500">Email:</span><span className="font-semibold">{user.email}</span></div>
          <div className="flex justify-between text-lg"><span className="text-gray-500">Город:</span><span className="font-semibold">{user.city}</span></div>
          <div className="flex justify-between text-lg"><span className="text-gray-500">Телефон:</span><span className="font-semibold">{user.phone}</span></div>
        </div>
        <button className="w-full py-3 bg-pink-400 hover:bg-pink-500 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-200">Выйти</button>
      </div>
    </section>
  );
} 