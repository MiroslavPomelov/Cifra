import React, { useState, useRef, useEffect } from 'react';

const API_URL = 'http://localhost/auth'; // api-gateway адрес

export default function AuthForm() {
  const [mode, setMode] = useState('login'); // 'login' или 'register'
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
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimeout = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingMode, setPendingMode] = useState(null);

  useEffect(() => {
    if (message) {
      setShowToast(true);
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => {
        setShowToast(false);
        setTimeout(() => setMessage(''), 400); // дождаться анимации
      }, 2500);
    }
    return () => {
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
    };
  }, [message]);

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
    try {
      const url = mode === 'login' ? `${API_URL}/login` : `${API_URL}/registration`;
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : {
            email: form.email,
            password: form.password,
            firstName: form.firstName,
            lastName: form.lastName,
            birthDate: form.birthDate,
            city: form.city,
            phone: form.phone,
            personalData: form.personalData
          };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      console.log('Ответ сервера:', data); // Для отладки
      if (res.ok) {
        setMessage(data.message || 'Успешно!');
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
        }
      } else {
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
        // Перевод типовых ошибок на русский
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
        };
        if (translations[errorMsg]) {
          errorMsg = translations[errorMsg];
        }
        setMessage(errorMsg);
      }
    } catch (err) {
      setMessage('Ошибка сети');
    }
  };

  const handleSwitchMode = () => {
    setIsTransitioning(true);
    setPendingMode(mode === 'login' ? 'registration' : 'login');
    setTimeout(() => {
      setMode(mode === 'login' ? 'registration' : 'login');
      setIsTransitioning(false);
      setPendingMode(null);
    }, 400); // длительность анимации
  };

  return (
    <>
      {/* Toast Notification */}
      <div
        className={`fixed left-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl text-white text-base font-medium transition-all duration-400 ease-in-out
          ${showToast ? 'top-8 opacity-100' : 'top-0 opacity-0'}
          ${message.includes('Ошибка') ? 'bg-gradient-to-r from-rose-500 to-pink-400/90' : 'bg-gradient-to-r from-green-400 to-emerald-500/90'}
          backdrop-blur-md bg-opacity-80 border border-white/30`}
        style={{ transform: 'translateX(-50%)', pointerEvents: 'none', minWidth: 220, maxWidth: 340 }}
      >
        {message}
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-green-100 py-12 px-2">
        <div className="max-w-md w-full p-8 rounded-3xl shadow-2xl border border-white/30 bg-white/60 backdrop-blur-lg bg-clip-padding relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-200/40 rounded-full blur-2xl z-0 animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-200/40 rounded-full blur-2xl z-0 animate-pulse" />
          <div className="relative z-10 flex flex-col justify-center transition-all duration-400 overflow-hidden min-h-[480px]">
            {/* Анимированная смена форм */}
            <div className="w-full">
              {/* login form */}
              {(mode === 'login' && !isTransitioning) || (pendingMode === 'login' && isTransitioning) ? (
                <div
                  className={`transition-all duration-400 ease-in-out
                    ${isTransitioning && pendingMode === 'registration' ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}
                  `}
                >
                  <h2 className="text-3xl font-extrabold mb-8 text-center text-rose-700 drop-shadow-lg">Вход</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-white/40 rounded-lg bg-white/60 backdrop-blur placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white/80 transition"
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
                        className="w-full px-4 py-2 border border-white/40 rounded-lg bg-white/60 backdrop-blur placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white/80 transition"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-gradient-to-r from-rose-400 via-pink-400 to-green-300 hover:from-rose-500 hover:to-green-400 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide mt-2"
                    >
                      Войти
                    </button>
                  </form>
                </div>
              ) : null}
              {/* registration form */}
              {(mode === 'registration' && !isTransitioning) || (pendingMode === 'registration' && isTransitioning) ? (
                <div
                  className={`transition-all duration-400 ease-in-out
                    ${isTransitioning && pendingMode === 'login' ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}
                  `}
                >
                  <h2 className="text-3xl font-extrabold mb-8 text-center text-rose-700 drop-shadow-lg">Регистрация</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-white/40 rounded-lg bg-white/60 backdrop-blur placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white/80 transition"
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
                        className="w-full px-4 py-2 border border-white/40 rounded-lg bg-white/60 backdrop-blur placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white/80 transition"
                      />
                    </div>
                    <div>
                      <input
                        name="firstName"
                        placeholder="Имя"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-white/40 rounded-lg bg-white/60 backdrop-blur placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white/80 transition"
                      />
                    </div>
                    <div>
                      <input
                        name="lastName"
                        placeholder="Фамилия"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-white/40 rounded-lg bg-white/60 backdrop-blur placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white/80 transition"
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
                        className="w-full px-4 py-2 border border-white/40 rounded-lg bg-white/60 backdrop-blur placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white/80 transition"
                      />
                    </div>
                    <div>
                      <input
                        name="city"
                        placeholder="Город"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-white/40 rounded-lg bg-white/60 backdrop-blur placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white/80 transition"
                      />
                    </div>
                    <div>
                      <input
                        name="phone"
                        placeholder="Телефон"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-white/40 rounded-lg bg-white/60 backdrop-blur placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white/80 transition"
                      />
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        id="personalData"
                        name="personalData"
                        type="checkbox"
                        checked={form.personalData}
                        onChange={e => setForm({ ...form, personalData: e.target.checked })}
                        className="mr-2 h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                      />
                      <label htmlFor="personalData" className="text-gray-700 text-sm select-none">
                        Я согласен на обработку персональных данных
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-gradient-to-r from-rose-400 via-pink-400 to-green-300 hover:from-rose-500 hover:to-green-400 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide mt-2"
                    >
                      Зарегистрироваться
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
            <button
              onClick={handleSwitchMode}
              className="w-full mt-6 text-rose-600 hover:underline focus:outline-none text-base font-medium relative z-10"
            >
              {mode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 