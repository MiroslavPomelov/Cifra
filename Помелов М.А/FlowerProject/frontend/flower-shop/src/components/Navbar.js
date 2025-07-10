import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/cart', label: 'Корзина' },
  { to: '/profile', label: 'Профиль' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAuthClick = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate('/auth', { state: { backgroundLocation: location } });
  };

  return (
    <nav className="w-full bg-white shadow-lg fixed top-0 left-0 z-40" style={{height: 72}}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-[72px]">
        <Link to="/" className="text-3xl font-extrabold font-['Montserrat',sans-serif] text-[#E94057] tracking-tight">FlowerShop</Link>
        <div className="hidden md:flex space-x-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-lg font-semibold font-['Montserrat',sans-serif] transition-colors duration-200 px-3 py-1 rounded-full hover:bg-[#FFF0F6] ${location.pathname === link.to ? 'text-[#E94057] bg-[#FFF0F6]' : 'text-[#22223B]'}`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleAuthClick}
            className="ml-6 px-6 py-2 bg-gradient-to-r from-[#E94057] to-[#F27121] hover:from-[#F27121] hover:to-[#E94057] text-white rounded-full font-bold shadow-lg transition-all duration-200 font-['Montserrat',sans-serif] text-lg"
          >
            Войти
          </button>
        </div>
        {/* Mobile burger */}
        <button className="md:hidden p-2 rounded focus:outline-none" onClick={() => setOpen(!open)}>
          <span className="block w-7 h-1 bg-[#E94057] mb-1 rounded"></span>
          <span className="block w-7 h-1 bg-[#E94057] mb-1 rounded"></span>
          <span className="block w-7 h-1 bg-[#E94057] rounded"></span>
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white shadow-xl rounded-b-2xl">
          <div className="flex flex-col items-center py-4 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-lg font-semibold font-['Montserrat',sans-serif] px-4 py-2 rounded-full hover:bg-[#FFF0F6] w-full text-center ${location.pathname === link.to ? 'text-[#E94057] bg-[#FFF0F6]' : 'text-[#22223B]'}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleAuthClick}
              className="mt-2 px-6 py-2 bg-gradient-to-r from-[#E94057] to-[#F27121] hover:from-[#F27121] hover:to-[#E94057] text-white rounded-full font-bold shadow-lg w-full text-center text-lg font-['Montserrat',sans-serif]"
            >
              Войти
            </button>
          </div>
        </div>
      )}
    </nav>
  );
} 