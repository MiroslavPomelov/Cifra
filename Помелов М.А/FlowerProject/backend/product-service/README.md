# Product Service

Микросервис для управления букетами/цветами магазинов (CRUD, поиск, интеграция с users-service и shop-service).

## Основные возможности
- CRUD для продуктов (букетов/цветов)
- Привязка продукта к магазину (shopId)
- Публичный каталог и поиск
- Защищённые методы для магазинов (JWT)
- Межсервисная аутентификация (ENV_TOKEN)
- Интеграция через API Gateway

## Интеграция с API Gateway
Все запросы к продуктам должны идти через gateway по пути `/products`:
- Gateway автоматически проксирует запросы на product-service
- Для защищённых методов требуется JWT магазина (Bearer)
- Для межсервисных запросов — заголовок `envservicetoken`

## Переменные окружения (dev.env)
- ENV_TOKEN — токен для межсервисных запросов
- ENV_KEY — секрет для JWT
- DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME — параметры БД

## Примеры запросов через Gateway

### Публичные
#### Получить все продукты
```
GET http://localhost:3001/products
```
#### Получить продукт по id
```
GET http://localhost:3001/products/1
```
#### Получить все продукты магазина
```
GET http://localhost:3001/products/shop/2
```

### Межсервисные (например, для users-service)
#### Получить продукты по массиву id
```
POST http://localhost:3001/products/by-ids
Headers:
  envservicetoken: <ENV_TOKEN из dev.env gateway>
Body (JSON):
  { "ids": [1,2,3] }
```

### Для магазинов (JWT)
#### Создать продукт
```
POST http://localhost:3001/products
Headers:
  Authorization: Bearer <JWT магазина>
Body (JSON):
  {
    "name": "Розы 25 шт.",
    "description": "Красивый букет роз",
    "price": 2500,
    "imageUrl": "https://example.com/rose.jpg"
  }
```
#### Обновить продукт
```
PUT http://localhost:3001/products/1
Headers:
  Authorization: Bearer <JWT магазина>
Body (JSON):
  {
    "name": "Розы 51 шт.",
    "price": 5000
  }
```
#### Удалить продукт
```
DELETE http://localhost:3001/products/1
Headers:
  Authorization: Bearer <JWT магазина>
```

## Примеры для Postman
- В коллекции Postman используйте base URL: `http://localhost:3001` (порт gateway)
- Для защищённых методов добавляйте Header: `Authorization: Bearer <ваш JWT>`
- Для межсервисных — Header: `envservicetoken: <ENV_TOKEN>`
- Body — в формате JSON

### Пример структуры запроса в Postman
- Method: POST
- URL: http://localhost:3001/products
- Headers:
    - Content-Type: application/json
    - Authorization: Bearer <JWT>
- Body (raw, JSON):
```
{
  "name": "Тюльпаны",
  "description": "Весенний букет",
  "price": 1200,
  "imageUrl": "https://example.com/tulip.jpg"
}
```

## JWT для магазина
- В payload должен быть role: 'shop' и sub: <shopId>

## Примечания
- Все методы product-service доступны только через gateway
- Для интеграции с другими сервисами используйте только gateway
- Для тестирования используйте Postman или curl с нужными заголовками 