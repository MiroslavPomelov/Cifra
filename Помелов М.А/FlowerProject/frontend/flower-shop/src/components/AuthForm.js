import React, { useState, useRef, useEffect } from 'react';

const API_URL = 'http://localhost/auth'; // api-gateway адрес

export default function AuthForm() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    city: '',
    phone: '',
    personalData: false
  });
  const [code, setCode] = useState('');
  const [step, setStep] = useState('form');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimeout = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingMode, setPendingMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (message) {
      setShowToast(true);
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => {
        setShowToast(false);
        setTimeout(() => setMessage(''), 400);
      }, 2500);
    }
    return () => {
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
    };
  }, [message]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    if (mode === 'registration') {
      if (!form.email || !form.password || !form.firstName || !form.lastName || !form.birthDate || !form.city || !form.phone || !form.personalData) {
        setMessage('Пожалуйста, заполните все поля и дайте согласие на обработку персональных данных');
        return;
      }
    }
    setIsLoading(true);
    try {
      if (mode === 'login') {
        const res = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password })
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(data.message || 'Успешно!');
          if (data.accessToken) {
            localStorage.setItem('token', data.accessToken);
          }
        } else {
          setMessage(translateError(data));
        }
      } else {
        const res = await fetch(`${API_URL}/registration`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            firstName: form.firstName,
            lastName: form.lastName,
            birthDate: form.birthDate,
            city: form.city,
            phone: form.phone,
            personalData: form.personalData
          })
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(data.message || 'Код отправлен на email');
          setStep('code');
        } else {
          setMessage(translateError(data));
        }
      }
    } catch (err) {
      setMessage('Ошибка сети');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async e => {
    e.preventDefault();
    setMessage('');
    if (!code) {
      setMessage('Введите код подтверждения');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          code
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Регистрация завершена!');
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
        }
        setStep('success');
      } else {
        setMessage(translateError(data));
      }
    } catch (err) {
      setMessage('Ошибка сети');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchMode = () => {
    setIsTransitioning(true);
    setPendingMode(mode === 'login' ? 'registration' : 'login');
    setTimeout(() => {
      setMode(mode === 'login' ? 'registration' : 'login');
      setStep('form');
      setIsTransitioning(false);
      setPendingMode(null);
      setForm({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        city: '',
        phone: '',
        personalData: false
      });
      setCode('');
      setMessage('');
    }, 400);
  };

  const handleBackToForm = () => {
    setStep('form');
    setCode('');
    setMessage('');
  };

  function translateError(data) {
    let errorMsg = 'Ошибка';
    if (Array.isArray(data.message)) {
      errorMsg = data.message[0];
    } else if (typeof data.message === 'string') {
      errorMsg = data.message;
    } else if (data.error) {
      errorMsg = data.error;
    } else if (data.data && Array.isArray(data.data.message)) {
      errorMsg = data.data.message[0];
    } else if (data.data && typeof data.data.message === 'string') {
      errorMsg = data.data.message;
    } else if (data.data && data.data.error) {
      errorMsg = data.data.error;
    }
    const translations = {
      'User with this email already exists': 'Пользователь с таким email уже существует',
      'Email must be a valid email address': 'Email должен быть валидным email адресом',
      'Email is required': 'Email обязателен',
      'Password must be a string': 'Пароль должен быть строкой',
      'Password is required': 'Пароль обязателен',
      'Password must be at least 6 characters': 'Пароль должен содержать минимум 6 символов',
      'Password must not exceed 100 characters': 'Пароль не должен превышать 100 символов',
      'First name must be a string': 'Имя должно быть строкой',
      'First name is required': 'Имя обязательно',
      'First name must not exceed 50 characters': 'Имя не должно превышать 50 символов',
      'Last name must be a string': 'Фамилия должна быть строкой',
      'Last name is required': 'Фамилия обязательна',
      'Last name must not exceed 50 characters': 'Фамилия не должна превышать 50 символов',
      'Birth date must be a valid date': 'Дата рождения должна быть валидной датой',
      'Birth date is required': 'Дата рождения обязательна',
      'Invalid date format': 'Неверный формат даты',
      'Phone must be a valid Russian phone number': 'Телефон должен быть валидным российским номером',
      'Phone is required': 'Телефон обязателен',
      'City must be a string': 'Город должен быть строкой',
      'City is required': 'Город обязателен',
      'City must not exceed 30 characters': 'Город не должен превышать 30 символов',
      'Consent to personal data processing must be a boolean value': 'Согласие с обработкой персональных данных должно быть булевым значением',
      'Consent to personal data processing is required': 'Необходимо согласие с обработкой персональных данных',
      'Invalid credentials': 'Неверный логин или пароль',
      'User not found': 'Пользователь не найден',
      'Proxy error': 'Ошибка проксирования',
      'Bad Request': 'Некорректный запрос',
      'Неверный код': 'Неверный код',
      'Invalid input data': 'Некорректные данные',
      'Registration successful!': 'Регистрация завершена!',
      'Код для подтверждения отправлен на email': 'Код для подтверждения отправлен на email',
    };
    if (translations[errorMsg]) {
      errorMsg = translations[errorMsg];
    }
    return errorMsg;
  }

  // --- СТИЛЬ С ПЕРЕКЛЮЧЕНИЕМ ТЕМЫ ---
  return (
    <>
      {/* Toast Notification */}
      <div
        className={`fixed left-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl text-white text-base font-medium transition-all duration-400 ease-in-out
          ${showToast ? 'top-8 opacity-100' : 'top-0 opacity-0'}
          ${message.includes('Ошибка')
            ? theme === 'dark'
              ? 'bg-gradient-to-r from-pink-600 via-fuchsia-600 to-blue-600/90'
              : 'bg-gradient-to-r from-rose-400 via-pink-400 to-emerald-400/90'
            : theme === 'dark'
              ? 'bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500/90'
              : 'bg-gradient-to-r from-emerald-400 via-pink-400 to-orange-300/90'}
          backdrop-blur-md bg-opacity-80 border border-white/30`}
        style={{ transform: 'translateX(-50%)', pointerEvents: 'none', minWidth: 220, maxWidth: 340 }}
      >
        {message}
      </div>
      <div className={
        theme === 'dark'
          ? 'min-h-screen flex items-center justify-center py-12 px-2 bg-gradient-to-br from-[#0f1020] via-[#181a2a] to-[#1a1b2b]'
          : 'min-h-screen flex items-center justify-center py-12 px-2 bg-gradient-to-br from-pink-100 via-orange-50 to-green-100'
      }>
        <div className={
          theme === 'dark'
            ? 'max-w-md w-full p-10 rounded-3xl shadow-2xl border border-fuchsia-400/30 bg-gradient-to-br from-[#181a2a]/80 to-[#23244a]/80 backdrop-blur-2xl bg-clip-padding relative overflow-hidden'
            : 'max-w-md w-full p-10 rounded-3xl shadow-2xl border border-pink-200/60 bg-white/80 backdrop-blur-xl bg-clip-padding relative overflow-hidden'
        }>
          {/* Theme toggle button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`absolute top-4 right-4 z-20 p-2 rounded-full border border-gray-300 shadow-md transition-colors duration-200 focus:outline-none ${theme === 'dark' ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
            aria-label="Переключить тему"
            type="button"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m8.485-8.485h-1.5m-15 0H3m15.364-6.364l-1.06 1.06m-10.607 10.607l-1.06 1.06m12.727 0l-1.06-1.06m-10.607-10.607l-1.06-1.06M12 6.75A5.25 5.25 0 1 1 6.75 12 5.25 5.25 0 0 1 12 6.75z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.652-7.64 6.398-9.09a.75.75 0 0 1 .908.325.75.75 0 0 1-.082.957A7.501 7.501 0 0 0 12 19.5a7.48 7.48 0 0 0 6.558-3.924.75.75 0 0 1 .957-.082.75.75 0 0 1 .325.908z" />
              </svg>
            )}
          </button>
          <div className={
            theme === 'dark'
              ? 'absolute inset-0 pointer-events-none rounded-3xl border-2 border-transparent bg-gradient-to-br from-fuchsia-500/30 via-blue-500/20 to-pink-500/20 blur-[2px]'
              : 'absolute inset-0 pointer-events-none rounded-3xl border-2 border-transparent bg-gradient-to-br from-pink-200/30 via-orange-100/20 to-green-200/20 blur-[2px]'
          } />
          <div className="relative z-10 flex flex-col justify-center transition-all duration-400 overflow-hidden min-h-[480px]">
            <div className="w-full">
              {(mode === 'login' && !isTransitioning) || (pendingMode === 'login' && isTransitioning) ? (
                <div className={`transition-all duration-400 ease-in-out ${isTransitioning && pendingMode === 'registration' ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}`}>
                  <h2 className={
                    theme === 'dark'
                      ? 'text-4xl font-extrabold mb-10 text-center text-white drop-shadow-[0_2px_16px_rgba(180,100,255,0.4)] tracking-tight'
                      : 'text-4xl font-extrabold mb-10 text-center text-rose-500 drop-shadow-[0_2px_16px_rgba(255,100,180,0.12)] tracking-tight font-sans'
                  }>Вход</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={
                          theme === 'dark'
                            ? 'w-full px-5 py-3 border border-fuchsia-400/30 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 focus:bg-white/10 transition shadow-md'
                            : 'w-full px-5 py-3 border border-pink-200 rounded-xl bg-white/80 text-gray-700 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 focus:bg-white transition shadow-sm font-sans'
                        }
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <input
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className={
                          theme === 'dark'
                            ? 'w-full px-5 py-3 border border-fuchsia-400/30 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 focus:bg-white/10 transition shadow-md'
                            : 'w-full px-5 py-3 border border-pink-200 rounded-xl bg-white/80 text-gray-700 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 focus:bg-white transition shadow-sm font-sans'
                        }
                        disabled={isLoading}
                      />
                    </div>
                    <button
                      type="submit"
                      className={
                        theme === 'dark'
                          ? 'w-full py-3 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-pink-500 hover:from-fuchsia-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide mt-2 drop-shadow-[0_2px_16px_rgba(180,100,255,0.3)]'
                          : 'w-full py-3 bg-gradient-to-r from-pink-400 via-orange-300 to-emerald-300 hover:from-pink-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide mt-2 drop-shadow-[0_2px_16px_rgba(255,100,180,0.10)] font-sans'
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? 'Вход...' : 'Войти'}
                    </button>
                  </form>
                </div>
              ) : null}
              {(mode === 'registration' && step === 'form' && !isTransitioning) || (pendingMode === 'registration' && isTransitioning) ? (
                <div className={`transition-all duration-400 ease-in-out ${isTransitioning && pendingMode === 'login' ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}`}>
                  <h2 className={
                    theme === 'dark'
                      ? 'text-4xl font-extrabold mb-10 text-center text-white drop-shadow-[0_2px_16px_rgba(180,100,255,0.4)] tracking-tight'
                      : 'text-4xl font-extrabold mb-10 text-center text-emerald-500 drop-shadow-[0_2px_16px_rgba(100,200,150,0.12)] tracking-tight font-sans'
                  }>Регистрация</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={
                          theme === 'dark'
                            ? 'w-full px-5 py-3 border border-fuchsia-400/30 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 focus:bg-white/10 transition shadow-md'
                            : 'w-full px-5 py-3 border border-pink-200 rounded-xl bg-white/80 text-gray-700 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 focus:bg-white transition shadow-sm font-sans'
                        }
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <input
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className={
                          theme === 'dark'
                            ? 'w-full px-5 py-3 border border-fuchsia-400/30 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 focus:bg-white/10 transition shadow-md'
                            : 'w-full px-5 py-3 border border-pink-200 rounded-xl bg-white/80 text-gray-700 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 focus:bg-white transition shadow-sm font-sans'
                        }
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <input
                        name="firstName"
                        placeholder="Имя"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className={
                          theme === 'dark'
                            ? 'w-full px-5 py-3 border border-fuchsia-400/30 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 focus:bg-white/10 transition shadow-md'
                            : 'w-full px-5 py-3 border border-emerald-200 rounded-xl bg-white/80 text-gray-700 placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 focus:bg-white transition shadow-sm font-sans'
                        }
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <input
                        name="lastName"
                        placeholder="Фамилия"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className={
                          theme === 'dark'
                            ? 'w-full px-5 py-3 border border-fuchsia-400/30 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 focus:bg-white/10 transition shadow-md'
                            : 'w-full px-5 py-3 border border-emerald-200 rounded-xl bg-white/80 text-gray-700 placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 focus:bg-white transition shadow-sm font-sans'
                        }
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <input
                        name="birthDate"
                        type="date"
                        placeholder="Дата рождения"
                        value={form.birthDate}
                        onChange={handleChange}
                        required
                        className={
                          theme === 'dark'
                            ? 'w-full px-5 py-3 border border-fuchsia-400/30 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 focus:bg-white/10 transition shadow-md'
                            : 'w-full px-5 py-3 border border-orange-200 rounded-xl bg-white/80 text-gray-700 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 focus:bg-white transition shadow-sm font-sans'
                        }
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <input
                        name="city"
                        placeholder="Город"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className={
                          theme === 'dark'
                            ? 'w-full px-5 py-3 border border-fuchsia-400/30 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 focus:bg-white/10 transition shadow-md'
                            : 'w-full px-5 py-3 border border-emerald-200 rounded-xl bg-white/80 text-gray-700 placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 focus:bg-white transition shadow-sm font-sans'
                        }
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <input
                        name="phone"
                        placeholder="Телефон"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className={
                          theme === 'dark'
                            ? 'w-full px-5 py-3 border border-fuchsia-400/30 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 focus:bg-white/10 transition shadow-md'
                            : 'w-full px-5 py-3 border border-orange-200 rounded-xl bg-white/80 text-gray-700 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 focus:bg-white transition shadow-sm font-sans'
                        }
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        id="personalData"
                        name="personalData"
                        type="checkbox"
                        checked={form.personalData}
                        onChange={e => setForm({ ...form, personalData: e.target.checked })}
                        className={
                          theme === 'dark'
                            ? 'mr-2 h-5 w-5 focus:ring-fuchsia-400 border-fuchsia-400/30 rounded bg-white/5 text-fuchsia-400'
                            : 'mr-2 h-5 w-5 focus:ring-pink-400 border-pink-300 rounded bg-white text-pink-400'
                        }
                        disabled={isLoading}
                      />
                      <label htmlFor="personalData" className={theme === 'dark' ? 'text-gray-200 text-sm select-none' : 'text-gray-600 text-sm select-none font-sans'}>
                        Я согласен на обработку персональных данных
                      </label>
                    </div>
                    <button
                      type="submit"
                      className={
                        theme === 'dark'
                          ? 'w-full py-3 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-pink-500 hover:from-fuchsia-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide mt-2 drop-shadow-[0_2px_16px_rgba(180,100,255,0.3)]'
                          : 'w-full py-3 bg-gradient-to-r from-pink-400 via-orange-300 to-emerald-300 hover:from-pink-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide mt-2 drop-shadow-[0_2px_16px_rgba(255,100,180,0.10)] font-sans'
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? 'Отправка...' : 'Зарегистрироваться'}
                    </button>
                  </form>
                </div>
              ) : null}
              {mode === 'registration' && step === 'code' ? (
                <div className="transition-all duration-400 ease-in-out">
                  <h2 className={
                    theme === 'dark'
                      ? 'text-3xl font-bold mb-8 text-center text-white drop-shadow-[0_2px_16px_rgba(180,100,255,0.4)]'
                      : 'text-3xl font-bold mb-8 text-center text-pink-500 drop-shadow-[0_2px_16px_rgba(255,100,180,0.12)] font-sans'
                  }>Подтвердите Email</h2>
                  <p className={theme === 'dark' ? 'mb-6 text-center text-gray-200' : 'mb-6 text-center text-gray-600 font-sans'}>
                    Введите код, отправленный на <b className={theme === 'dark' ? 'text-fuchsia-300' : 'text-pink-400'}>{form.email}</b>
                  </p>
                  <form onSubmit={handleVerify} className="space-y-6">
                    <div>
                      <input
                        name="code"
                        placeholder="Код подтверждения"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        required
                        className={
                          theme === 'dark'
                            ? 'w-full px-5 py-3 border border-fuchsia-400/30 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 focus:bg-white/10 transition shadow-md'
                            : 'w-full px-5 py-3 border border-pink-200 rounded-xl bg-white/80 text-gray-700 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 focus:bg-white transition shadow-sm font-sans'
                        }
                        disabled={isLoading}
                      />
                    </div>
                    <button
                      type="submit"
                      className={
                        theme === 'dark'
                          ? 'w-full py-3 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-pink-500 hover:from-fuchsia-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide mt-2 drop-shadow-[0_2px_16px_rgba(180,100,255,0.3)]'
                          : 'w-full py-3 bg-gradient-to-r from-pink-400 via-orange-300 to-emerald-300 hover:from-pink-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide mt-2 drop-shadow-[0_2px_16px_rgba(255,100,180,0.10)] font-sans'
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? 'Проверка...' : 'Подтвердить'}
                    </button>
                  </form>
                  <button
                    onClick={handleBackToForm}
                    className={theme === 'dark' ? 'w-full mt-6 text-fuchsia-300 hover:underline focus:outline-none text-base font-medium' : 'w-full mt-6 text-pink-400 hover:underline focus:outline-none text-base font-medium font-sans'}
                    disabled={isLoading}
                  >
                    Назад к регистрации
                  </button>
                </div>
              ) : null}
              {mode === 'registration' && step === 'success' ? (
                <div className="transition-all duration-400 ease-in-out text-center">
                  <h2 className={
                    theme === 'dark'
                      ? 'text-3xl font-bold mb-8 text-white drop-shadow-[0_2px_16px_rgba(180,100,255,0.4)]'
                      : 'text-3xl font-bold mb-8 text-pink-500 drop-shadow-[0_2px_16px_rgba(255,100,180,0.12)] font-sans'
                  }>Регистрация завершена!</h2>
                  <p className={theme === 'dark' ? 'mb-6 text-gray-200' : 'mb-6 text-gray-600 font-sans'}>Ваш аккаунт успешно создан. Теперь вы можете войти.</p>
                  <button
                    onClick={handleSwitchMode}
                    className={
                      theme === 'dark'
                        ? 'w-full py-3 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-pink-500 hover:from-fuchsia-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide mt-2 drop-shadow-[0_2px_16px_rgba(180,100,255,0.3)]'
                        : 'w-full py-3 bg-gradient-to-r from-pink-400 via-orange-300 to-emerald-300 hover:from-pink-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide mt-2 drop-shadow-[0_2px_16px_rgba(255,100,180,0.10)] font-sans'
                    }
                  >
                    Войти
                  </button>
                </div>
              ) : null}
            </div>
            {step === 'form' && (
              <button
                onClick={handleSwitchMode}
                className={theme === 'dark' ? 'w-full mt-8 text-fuchsia-300 hover:underline focus:outline-none text-base font-medium relative z-10' : 'w-full mt-8 text-pink-400 hover:underline focus:outline-none text-base font-medium relative z-10 font-sans'}
              >
                {(() => {
                  const nextMode = isTransitioning ? pendingMode : mode;
                  return nextMode === 'login'
                    ? 'Нет аккаунта? Зарегистрироваться'
                    : 'Уже есть аккаунт? Войти';
                })()}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 