import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-gradient-to-br from-[#FFF0F6] via-[#FDECEF] to-[#E0F7FA]">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-[#E94057] leading-tight drop-shadow-[0_2px_24px_rgba(233,64,87,0.18)] font-['Montserrat',sans-serif]">
          Цветы и букеты
        </h1>
        <p className="text-xl md:text-2xl text-[#22223B] mb-10 font-medium font-['Montserrat',sans-serif]">
          Доставка свежих букетов по городу — быстро, удобно, с любовью!
        </p>
        <Link to="/catalog" className="inline-block px-10 py-4 bg-gradient-to-r from-[#E94057] to-[#F27121] hover:from-[#F27121] hover:to-[#E94057] text-white text-xl font-bold rounded-full shadow-lg transition-all duration-200 font-['Montserrat',sans-serif]">
          Перейти в каталог
        </Link>
      </div>
      <div className="mt-16 w-full max-w-3xl flex justify-center">
        <div className="rounded-full bg-gradient-to-tr from-[#E94057]/30 via-[#F27121]/20 to-[#E94057]/10 p-2 shadow-2xl">
          <img src="https://img.freepik.com/free-photo/beautiful-bouquet-flowers_23-2148864972.jpg?w=600" alt="Букет" className="w-64 h-64 object-cover rounded-full shadow-xl border-8 border-white" />
        </div>
      </div>
    </section>
  );
} 