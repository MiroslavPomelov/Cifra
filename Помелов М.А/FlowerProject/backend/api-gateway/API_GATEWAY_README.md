# API Gateway Documentation

## Обзор

API Gateway является центральной точкой входа для всех клиентских запросов к микросервисам. Он проксирует запросы к соответствующим сервисам и обеспечивает единую точку аутентификации.

## Архитектура

### Сервисы

| Сервис | Внутренний URL | Внешний URL | Порт | Требует Auth |
|--------|----------------|-------------|------|---------------|
| users | http://users-service:3000 | http://localhost:80 | 3001 | ✅ |
| auth | http://auth-service:3000 | http://localhost:80 | 3002 | ❌ |
| shops | http://shop-service:3000 | http://localhost:80 | 3003 | ✅ |
| products | http://product-service:3000 | http://localhost:80 | 3004 | ✅ |
| payment | http://payment-service:3000 | http://localhost:80 | 3005 | ❌ |
| order | http://order-service:3000 | http://localhost:80 | 3006 | ✅ |

## API Endpoints

### Health Check
```
GET /health
```
Возвращает статус всех сервисов.

### Auth Service
```
POST /auth/registration
POST /auth/login
POST /auth/verify
POST /auth/validatetoken
```

### Users Service
```
GET /users
GET /users/:id
POST /users
PATCH /users/:id
DELETE /users/:id
GET /users/:id/with-favourites
```

### Shops Service
```
GET /shops
GET /shops/:id
POST /shops
PATCH /shops/:id
DELETE /shops/:id
```

### Products Service
```
GET /products
GET /products/:id
POST /products
PATCH /products/:id
DELETE /products/:id
```

### Payment Service
```
POST /payment/process
GET /payment/status/:id
```

### Order Service
```
GET /order
GET /order/:id
POST /order
PATCH /order/:id
DELETE /order/:id
```

## Аутентификация

API Gateway использует JWT токены для аутентификации. Токен должен быть передан в заголовке `Authorization`:

```
Authorization: Bearer <token>
```

## Заголовки

API Gateway добавляет следующие заголовки к запросам:

- `Content-Type: application/json`
- `envservicetoken: <ENV_TOKEN>`
- `X-Gateway-Service: <service-name>`
- `X-Gateway-Timestamp: <timestamp>`

## Обработка ошибок

### 401 Unauthorized
- Токен отсутствует или недействителен
- Сервис требует аутентификации

### 503 Service Unavailable
- Сервис недоступен
- Нет ответа от сервиса

### 500 Internal Server Error
- Ошибка в API Gateway
- Ошибка настройки запроса

## Примеры использования

### Регистрация пользователя
```bash
curl -X POST http://localhost:80/auth/registration \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "Иван",
    "lastName": "Иванов",
    "birthDate": "1990-01-01",
    "phone": "+79001234567",
    "city": "Москва",
    "personalData": true
  }'
```

### Вход в систему
```bash
curl -X POST http://localhost:80/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Получение пользователей (с токеном)
```bash
curl -X GET http://localhost:80/users \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Логирование

API Gateway ведет подробные логи всех запросов и ответов. Логи включают:

- Метод и URL запроса
- Статус ответа
- Ошибки и исключения
- Время выполнения

## Мониторинг

### Health Check
```
GET /health
```

Ответ:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "services": [
    {
      "name": "users",
      "config": {
        "name": "users-service",
        "internalUrl": "http://users-service:3000",
        "externalUrl": "http://localhost:80",
        "port": 3001,
        "requiresAuth": true
      }
    }
  ]
}
```

## Развертывание

API Gateway развертывается через Docker Compose:

```bash
cd backend
docker-compose up -d api-gateway
```

## Конфигурация

Основные переменные окружения:

- `ENV_TOKEN` - токен для внутренней аутентификации между сервисами
- `NODE_ENV` - окружение (development/production)
- `PORT` - порт для API Gateway (по умолчанию 3000) 