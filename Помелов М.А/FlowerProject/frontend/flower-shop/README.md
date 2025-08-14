# Flower Shop - Frontend

Это frontend приложение для цветочного магазина, построенное на [Next.js](https://nextjs.org) с использованием микросервисной архитектуры.

## Архитектура

Приложение использует микросервисную архитектуру с несколькими backend сервисами:

- **Auth Service** - аутентификация и авторизация
- **Users Service** - управление пользователями и профилями
- **Shop Service** - управление магазинами
- **Product Service** - управление товарами
- **Order Service** - управление заказами
- **Payment Service** - обработка платежей

## Особенности

- **Приоритет API над локальными данными**: Все данные загружаются с серверов через API
- **Межсервисное взаимодействие**: Frontend взаимодействует со всеми сервисами через единый API Service
- **JWT аутентификация**: Безопасная аутентификация пользователей
- **Responsive дизайн**: Адаптивный интерфейс для всех устройств
- **Цветочная тема**: Красивый UI в стиле цветочного магазина

## Getting Started

### Предварительные требования

1. Убедитесь, что все backend сервисы запущены
2. Проверьте, что переменная окружения `NEXT_PUBLIC_API_URL` настроена

### Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для production
npm run build

# Запуск production версии
npm start
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # Общие компоненты
│   ├── profile/           # Страница профиля
│   ├── cart/              # Корзина
│   ├── checkout/          # Оформление заказа
│   └── shop/              # Управление магазином
├── services/              # API сервисы
├── hooks/                 # React хуки
└── config/                # Конфигурация
```

## API интеграция

### Основные эндпоинты

- **Пользователи**: `/users/{id}` (GET, PATCH)
- **Заказы**: `/order` (POST), `/order/user/{userId}` (GET)
- **Товары**: `/products` (GET), `/products/{id}` (GET, PATCH, DELETE)
- **Магазины**: `/shops` (GET, POST), `/shops/{id}` (GET, PATCH, DELETE)

### Пример использования API

```typescript
import { apiService } from '../services/api';

// Получение профиля пользователя
const profile = await apiService.getUserProfile(userId, token);

// Создание заказа
const order = await apiService.createOrder(orderData, token);

// Получение товаров
const products = await apiService.getProducts();
```

## Межсервисное взаимодействие

Подробная информация о том, как работает межсервисное взаимодействие, находится в файле [INTERSERVICE_INTEGRATION_README.md](./INTERSERVICE_INTEGRATION_README.md).

## Разработка

### Добавление новых API методов

1. Добавьте метод в `src/services/api.ts`
2. Обновите интерфейсы в том же файле
3. Добавьте конфигурацию в `src/config/api.ts`
4. Протестируйте через соответствующий компонент

### Добавление новых страниц

1. Создайте папку в `src/app/`
2. Добавьте `page.tsx` с основным компонентом
3. Создайте необходимые компоненты в `components/`
4. Добавьте навигацию в основной layout

## Тестирование

```bash
# Запуск тестов
npm test

# Запуск тестов в режиме watch
npm run test:watch

# Проверка линтера
npm run lint
```

## Развертывание

### Vercel (рекомендуется)

Самый простой способ развернуть Next.js приложение - использовать [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Docker

```bash
# Сборка образа
docker build -t flower-shop-frontend .

# Запуск контейнера
docker run -p 3000:3000 flower-shop-frontend
```

## Troubleshooting

### Частые проблемы

1. **401 Unauthorized**: Проверьте JWT токен и его валидность
2. **API недоступен**: Убедитесь, что все backend сервисы запущены
3. **CORS ошибки**: Проверьте настройки CORS в backend сервисах

### Логи

- Frontend: Browser Console
- API вызовы: Network tab в DevTools
- Backend: Docker logs для каждого сервиса

## Документация

- [Next.js Documentation](https://nextjs.org/docs)
- [Chakra UI](https://chakra-ui.com/) - UI компоненты
- [Framer Motion](https://www.framer.com/motion/) - анимации
- [Axios](https://axios-http.com/) - HTTP клиент

## Лицензия

MIT License
