import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import Profile from './components/Profile';
import AuthForm from './components/AuthForm';

function AppContent() {
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  // Если на /auth и нет backgroundLocation — показываем только модалку
  if (location.pathname === '/auth' && !backgroundLocation) {
    return <AuthModal onlyModal />;
  }

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<AuthFormPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {backgroundLocation && location.pathname === '/auth' && <AuthModal />}
      </div>
    </>
  );
}

function AuthModal({ onlyModal }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-auto shadow-xl">
        {!onlyModal && (
          <button
            onClick={() => navigate(-1)}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-pink-100 text-pink-500 shadow focus:outline-none"
            aria-label="Закрыть"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <AuthForm />
      </div>
    </div>
  );
}

function AuthFormPage() {
  // Для прямого перехода на /auth без backgroundLocation (не используется, но оставим для совместимости)
  return null;
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
