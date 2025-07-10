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
  const [isLoading, setIsLoading] = useState(false);

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
    setMode(mode === 'login' ? 'registration' : 'login');
    setStep('form');
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

  // --- СТИЛЬНОЕ МОДАЛЬНОЕ ОКНО ---
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl px-6 py-10 md:px-10 md:py-12 flex flex-col items-center animate-fade-in font-['Montserrat',sans-serif]">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#E94057] mb-8 text-center drop-shadow-[0_2px_16px_rgba(233,64,87,0.10)]">
        {mode === 'login' ? 'Вход' : step === 'code' ? 'Подтвердите Email' : 'Регистрация'}
      </h2>
      {message && (
        <div className={`mb-4 w-full text-center text-base font-medium rounded-xl px-4 py-2 transition-all duration-300 ${message.includes('Ошибка') ? 'bg-[#FFE0E6] text-[#E94057]' : 'bg-[#E0F7FA] text-[#22223B]'}`}>{message}</div>
      )}
      {mode === 'login' && step === 'form' && (
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-[#FDECEF] rounded-xl bg-[#FFF0F6] text-[#22223B] placeholder-[#E94057]/60 focus:outline-none focus:ring-2 focus:ring-[#E94057] focus:border-[#E94057] transition shadow-sm font-medium"
            disabled={isLoading}
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-[#FDECEF] rounded-xl bg-[#FFF0F6] text-[#22223B] placeholder-[#E94057]/60 focus:outline-none focus:ring-2 focus:ring-[#E94057] focus:border-[#E94057] transition shadow-sm font-medium"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#E94057] to-[#F27121] hover:from-[#F27121] hover:to-[#E94057] text-white font-bold rounded-full shadow-lg transition-all duration-200 text-lg tracking-wide mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      )}
      {mode === 'registration' && step === 'form' && (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              name="firstName"
              placeholder="Имя"
              value={form.firstName}
              onChange={handleChange}
              required
              className="flex-1 px-5 py-3 border border-[#FDECEF] rounded-xl bg-[#FFF0F6] text-[#22223B] placeholder-[#E94057]/60 focus:outline-none focus:ring-2 focus:ring-[#E94057] focus:border-[#E94057] transition shadow-sm font-medium"
              disabled={isLoading}
            />
            <input
              name="lastName"
              placeholder="Фамилия"
              value={form.lastName}
              onChange={handleChange}
              required
              className="flex-1 px-5 py-3 border border-[#FDECEF] rounded-xl bg-[#FFF0F6] text-[#22223B] placeholder-[#E94057]/60 focus:outline-none focus:ring-2 focus:ring-[#E94057] focus:border-[#E94057] transition shadow-sm font-medium"
              disabled={isLoading}
            />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-[#FDECEF] rounded-xl bg-[#FFF0F6] text-[#22223B] placeholder-[#E94057]/60 focus:outline-none focus:ring-2 focus:ring-[#E94057] focus:border-[#E94057] transition shadow-sm font-medium"
            disabled={isLoading}
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-[#FDECEF] rounded-xl bg-[#FFF0F6] text-[#22223B] placeholder-[#E94057]/60 focus:outline-none focus:ring-2 focus:ring-[#E94057] focus:border-[#E94057] transition shadow-sm font-medium"
            disabled={isLoading}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <input
              name="birthDate"
              type="date"
              placeholder="Дата рождения"
              value={form.birthDate}
              onChange={handleChange}
              required
              className="flex-1 px-5 py-3 border border-[#FDECEF] rounded-xl bg-[#FFF0F6] text-[#22223B] placeholder-[#E94057]/60 focus:outline-none focus:ring-2 focus:ring-[#E94057] focus:border-[#E94057] transition shadow-sm font-medium"
              disabled={isLoading}
            />
            <input
              name="city"
              placeholder="Город"
              value={form.city}
              onChange={handleChange}
              required
              className="flex-1 px-5 py-3 border border-[#FDECEF] rounded-xl bg-[#FFF0F6] text-[#22223B] placeholder-[#E94057]/60 focus:outline-none focus:ring-2 focus:ring-[#E94057] focus:border-[#E94057] transition shadow-sm font-medium"
              disabled={isLoading}
            />
          </div>
          <input
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-[#FDECEF] rounded-xl bg-[#FFF0F6] text-[#22223B] placeholder-[#E94057]/60 focus:outline-none focus:ring-2 focus:ring-[#E94057] focus:border-[#E94057] transition shadow-sm font-medium"
            disabled={isLoading}
          />
          <div className="flex items-center mt-2">
            <input
              id="personalData"
              name="personalData"
              type="checkbox"
              checked={form.personalData}
              onChange={e => setForm({ ...form, personalData: e.target.checked })}
              className="mr-2 h-5 w-5 focus:ring-[#E94057] border-[#FDECEF] rounded bg-[#FFF0F6] text-[#E94057]"
              disabled={isLoading}
            />
            <label htmlFor="personalData" className="text-[#22223B] text-sm select-none font-medium">
              Я согласен на обработку персональных данных
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#E94057] to-[#F27121] hover:from-[#F27121] hover:to-[#E94057] text-white font-bold rounded-full shadow-lg transition-all duration-200 text-lg tracking-wide mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Отправка...' : 'Зарегистрироваться'}
          </button>
        </form>
      )}
      {mode === 'registration' && step === 'code' && (
        <form onSubmit={handleVerify} className="w-full space-y-5">
          <input
            name="code"
            placeholder="Код подтверждения"
            value={code}
            onChange={e => setCode(e.target.value)}
            required
            className="w-full px-5 py-3 border border-[#FDECEF] rounded-xl bg-[#FFF0F6] text-[#22223B] placeholder-[#E94057]/60 focus:outline-none focus:ring-2 focus:ring-[#E94057] focus:border-[#E94057] transition shadow-sm font-medium"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#E94057] to-[#F27121] hover:from-[#F27121] hover:to-[#E94057] text-white font-bold rounded-full shadow-lg transition-all duration-200 text-lg tracking-wide mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Проверка...' : 'Подтвердить'}
          </button>
          <button
            type="button"
            onClick={handleBackToForm}
            className="w-full mt-2 text-[#E94057] hover:underline focus:outline-none text-base font-medium"
            disabled={isLoading}
          >
            Назад к регистрации
          </button>
        </form>
      )}
      {mode === 'registration' && step === 'success' && (
        <div className="transition-all duration-400 ease-in-out text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#E94057] drop-shadow-[0_2px_16px_rgba(233,64,87,0.10)]">
            Регистрация завершена!
          </h2>
          <p className="mb-6 text-[#22223B]">Ваш аккаунт успешно создан. Теперь вы можете войти.</p>
          <button
            onClick={handleSwitchMode}
            className="w-full py-3 bg-gradient-to-r from-[#E94057] to-[#F27121] hover:from-[#F27121] hover:to-[#E94057] text-white font-bold rounded-full shadow-lg transition-all duration-200 text-lg tracking-wide mt-2"
          >
            Войти
          </button>
        </div>
      )}
      {step === 'form' && (
        <button
          onClick={handleSwitchMode}
          className="w-full mt-8 text-[#E94057] hover:underline focus:outline-none text-base font-medium"
        >
          {mode === 'login'
            ? 'Нет аккаунта? Зарегистрироваться'
            : 'Уже есть аккаунт? Войти'}
        </button>
      )}
    </div>
  );
} 