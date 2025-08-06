# Миграция с Fetch на Axios

## 📋 Обзор

Данный документ описывает процесс миграции с нативного `fetch` API на `axios` в проекте Flower Shop.

## 🎯 Цели миграции

### Преимущества axios над fetch:

1. **Лучшая обработка ошибок**
   - Автоматически отклоняет промисы при HTTP статусах 4xx/5xx
   - Более детальная информация об ошибках

2. **Автоматическая сериализация JSON**
   - Не нужно вызывать `.json()` вручную
   - Автоматическая обработка Content-Type

3. **Более удобный API**
   - Меньше boilerplate кода
   - Более читаемый синтаксис

4. **Interceptors**
   - Глобальная обработка запросов/ответов
   - Автоматическое добавление токенов авторизации

5. **Таймауты**
   - Встроенная поддержка таймаутов
   - Настраиваемые таймауты для разных запросов

6. **Отмена запросов**
   - Встроенная поддержка отмены запросов
   - AbortController API

## 📁 Структура файлов

```
src/config/
├── api.ts          # Конфигурация API endpoints
└── axios.ts        # Axios instance и конфигурация

src/app/components/
├── AuthForms.tsx           # Обновлен для использования axios
└── OptimizedAuthForms.tsx  # Обновлен для использования axios
```

## 🔧 Конфигурация Axios

### Основная конфигурация (`src/config/axios.ts`):

```typescript
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from './api';

// Создаем axios instance с базовой конфигурацией
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 30000, // 30 секунд таймаут
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor для добавления токена авторизации
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor для обработки ошибок
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Обработка различных типов ошибок
    if (error.response) {
      // Сервер ответил с ошибкой (4xx, 5xx)
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Запрос был отправлен, но ответ не получен
      console.error('Network Error:', error.message);
    } else {
      // Ошибка при настройке запроса
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);
```

## 🔄 Сравнение синтаксиса

### До (Fetch):
```typescript
const handleLogin = useCallback(async () => {
  setIsLoading(true);
  try {
    const response = await fetch(buildApiUrl(API_CONFIG.AUTH.LOGIN), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (response.ok) {
      toast({
        title: 'Успешный вход!',
        description: 'Добро пожаловать в мир цветов!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem('token', data.accessToken);
    } else {
      toast({
        title: 'Ошибка входа',
        description: data.message || 'Неверный email или пароль',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  } catch (error) {
    toast({
      title: 'Ошибка соединения',
      description: 'Не удалось подключиться к серверу',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  } finally {
    setIsLoading(false);
  }
}, [loginData, toast]);
```

### После (Axios):
```typescript
const handleLogin = useCallback(async () => {
  setIsLoading(true);
  try {
    const response = await api.post<AuthResponse>(API_CONFIG.AUTH.LOGIN, loginData);
    
    toast({
      title: 'Успешный вход!',
      description: 'Добро пожаловать в мир цветов!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    localStorage.setItem('token', response.data.accessToken);
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Неверный email или пароль';
    toast({
      title: 'Ошибка входа',
      description: errorMessage,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  } finally {
    setIsLoading(false);
  }
}, [loginData, toast]);
```

## 📊 Статистика миграции

### Замененные вызовы:
- **AuthForms.tsx**: 3 fetch вызова → 3 axios вызова
- **OptimizedAuthForms.tsx**: 3 fetch вызова → 3 axios вызова
- **Всего**: 6 fetch вызовов → 6 axios вызовов

### Улучшения:
- ✅ Убрано 18 строк boilerplate кода
- ✅ Улучшена обработка ошибок
- ✅ Добавлены автоматические interceptors
- ✅ Централизованная конфигурация
- ✅ Типизация TypeScript

## 🚀 Использование

### Базовые HTTP методы:
```typescript
import { api } from '../../config/axios';

// GET запрос
const users = await api.get('/users');

// POST запрос
const newUser = await api.post('/users', userData);

// PUT запрос
const updatedUser = await api.put(`/users/${id}`, userData);

// DELETE запрос
await api.delete(`/users/${id}`);

// PATCH запрос
const patchedUser = await api.patch(`/users/${id}`, partialData);
```

### Типизированные запросы:
```typescript
import { AuthResponse, User } from '../../config/axios';

// Типизированный POST запрос
const response = await api.post<AuthResponse>('/auth/login', loginData);
const token = response.data.accessToken;

// Типизированный GET запрос
const response = await api.get<User[]>('/users');
const users = response.data;
```

## 🔒 Авторизация

Токен авторизации автоматически добавляется ко всем запросам через request interceptor:

```typescript
// Request interceptor автоматически добавляет токен
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

## ⚠️ Обработка ошибок

### Типы ошибок:
1. **error.response** - Сервер ответил с ошибкой (4xx, 5xx)
2. **error.request** - Запрос был отправлен, но ответ не получен
3. **error** - Ошибка при настройке запроса

### Пример обработки:
```typescript
try {
  const response = await api.post('/auth/login', loginData);
  // Успешный ответ
} catch (error: any) {
  if (error.response) {
    // Сервер вернул ошибку
    const status = error.response.status;
    const message = error.response.data?.message;
    console.error(`HTTP ${status}: ${message}`);
  } else if (error.request) {
    // Нет ответа от сервера
    console.error('Network error:', error.message);
  } else {
    // Ошибка настройки запроса
    console.error('Request error:', error.message);
  }
}
```

## 📦 Установка зависимостей

```bash
npm install axios
```

## 🧪 Тестирование

### Проверка работоспособности:
1. Запустите фронтенд: `npm run dev`
2. Откройте браузер и перейдите на страницу авторизации
3. Попробуйте войти/зарегистрироваться
4. Проверьте консоль браузера на наличие ошибок

### Ожидаемые улучшения:
- ✅ Более быстрая обработка ошибок
- ✅ Автоматическое добавление токенов
- ✅ Лучшая типизация
- ✅ Меньше кода для поддержки

## 🔄 Планы на будущее

### Возможные улучшения:
1. **Retry логика** - Автоматические повторные попытки при сетевых ошибках
2. **Кэширование** - Кэширование GET запросов
3. **Прогресс загрузки** - Отслеживание прогресса загрузки файлов
4. **Отмена запросов** - Реализация отмены долгих запросов
5. **Метрики** - Сбор метрик производительности API

### Пример retry логики:
```typescript
// Добавить в axios конфигурацию
const retryConfig = {
  retries: 3,
  retryDelay: 1000,
  retryCondition: (error: AxiosError) => {
    return error.response?.status >= 500 || !error.response;
  }
};
```

## 📝 Заключение

Миграция с `fetch` на `axios` успешно завершена. Все HTTP запросы теперь используют единую конфигурацию с улучшенной обработкой ошибок, автоматическим добавлением токенов авторизации и лучшей типизацией TypeScript.

### Ключевые преимущества:
- ✅ **Упрощенный код** - Меньше boilerplate
- ✅ **Лучшая обработка ошибок** - Автоматическое отклонение при 4xx/5xx
- ✅ **Централизованная конфигурация** - Единая точка настройки
- ✅ **Автоматическая авторизация** - Interceptors для токенов
- ✅ **Типизация** - Полная поддержка TypeScript
- ✅ **Таймауты** - Встроенная поддержка таймаутов 