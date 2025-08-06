# Руководство по развертыванию Flower Shop

## Обзор архитектуры

Проект состоит из микросервисной архитектуры с API Gateway в качестве центральной точки входа.

### Сервисы

1. **API Gateway** (порт 80) - центральная точка входа
2. **Auth Service** (порт 3002) - аутентификация и авторизация
3. **Users Service** (порт 3001) - управление пользователями
4. **Shop Service** (порт 3003) - управление магазинами
5. **Product Service** (порт 3004) - управление товарами
6. **Payment Service** (порт 3005) - обработка платежей
7. **Order Service** (порт 3006) - управление заказами

## Развертывание

### Предварительные требования

- Docker
- Docker Compose
- Node.js 18+ (для разработки)

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd FlowerProject
```

### 2. Развертывание backend

```bash
cd backend
docker-compose up -d
```

Это запустит все сервисы:
- API Gateway на http://localhost:80
- Все микросервисы на соответствующих портах

### 3. Развертывание frontend

```bash
cd frontend/flower-shop
npm install
npm run dev
```

Frontend будет доступен на http://localhost:3000

## API Endpoints

### Аутентификация

Все запросы к API должны использовать API Gateway на порту 80:

```bash
# Регистрация
POST http://localhost:80/auth/registration

# Вход
POST http://localhost:80/auth/login

# Верификация
POST http://localhost:80/auth/verify

# Проверка токена
POST http://localhost:80/auth/validatetoken
```

### Пользователи

```bash
# Получить всех пользователей
GET http://localhost:80/users

# Получить пользователя по ID
GET http://localhost:80/users/:id

# Создать пользователя
POST http://localhost:80/users

# Обновить пользователя
PATCH http://localhost:80/users/:id

# Удалить пользователя
DELETE http://localhost:80/users/:id
```

### Магазины

```bash
# Получить все магазины
GET http://localhost:80/shops

# Получить магазин по ID
GET http://localhost:80/shops/:id

# Создать магазин
POST http://localhost:80/shops

# Обновить магазин
PATCH http://localhost:80/shops/:id

# Удалить магазин
DELETE http://localhost:80/shops/:id
```

### Товары

```bash
# Получить все товары
GET http://localhost:80/products

# Получить товар по ID
GET http://localhost:80/products/:id

# Создать товар
POST http://localhost:80/products

# Обновить товар
PATCH http://localhost:80/products/:id

# Удалить товар
DELETE http://localhost:80/products/:id
```

### Платежи

```bash
# Обработать платеж
POST http://localhost:80/payment/process

# Получить статус платежа
GET http://localhost:80/payment/status/:id
```

### Заказы

```bash
# Получить все заказы
GET http://localhost:80/order

# Получить заказ по ID
GET http://localhost:80/order/:id

# Создать заказ
POST http://localhost:80/order

# Обновить заказ
PATCH http://localhost:80/order/:id

# Удалить заказ
DELETE http://localhost:80/order/:id
```

## Аутентификация

Для защищенных endpoints требуется JWT токен в заголовке:

```bash
Authorization: Bearer <your-jwt-token>
```

## Мониторинг

### Health Check

```bash
GET http://localhost:80/health
```

### Логи

Просмотр логов API Gateway:

```bash
docker-compose logs api-gateway
```

Просмотр логов конкретного сервиса:

```bash
docker-compose logs auth-service
docker-compose logs users-service
docker-compose logs shop-service
docker-compose logs product-service
docker-compose logs payment-service
docker-compose logs order-service
```

## Переменные окружения

### API Gateway

```env
ENV_TOKEN=ya29.asdgv_sadashldkjhasdiufrekjhkjhdaksjhduHOIUhiluGHiglUUU
NODE_ENV=development
PORT=3000
```

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:80
```

## Устранение неполадок

### 1. Сервис недоступен

Проверьте статус сервисов:

```bash
docker-compose ps
```

### 2. Проблемы с подключением к базе данных

Проверьте логи базы данных:

```bash
docker-compose logs usersdb
docker-compose logs shopdb
docker-compose logs productdb
docker-compose logs paymentdb
docker-compose logs orderdb
```

### 3. Проблемы с Redis

Проверьте статус Redis:

```bash
docker-compose logs redis
```

### 4. Перезапуск сервисов

```bash
# Перезапуск всех сервисов
docker-compose restart

# Перезапуск конкретного сервиса
docker-compose restart api-gateway
docker-compose restart auth-service
```

## Разработка

### Локальная разработка

Для разработки отдельных сервисов:

```bash
# Auth Service
cd backend/auth-service
npm install
npm run start:dev

# Users Service
cd backend/users-service
npm install
npm run start:dev

# Frontend
cd frontend/flower-shop
npm install
npm run dev
```

### Тестирование API

Используйте Postman или curl для тестирования API:

```bash
# Тест health check
curl http://localhost:80/health

# Тест регистрации
curl -X POST http://localhost:80/auth/registration \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "birthDate": "1990-01-01",
    "phone": "+79001234567",
    "city": "Москва",
    "personalData": true
  }'
```

## Безопасность

1. Все пароли хешируются с использованием bcrypt
2. JWT токены имеют ограниченное время жизни
3. API Gateway проверяет токены для защищенных endpoints
4. Все запросы логируются для аудита 