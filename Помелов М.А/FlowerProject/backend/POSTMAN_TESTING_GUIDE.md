# Руководство по тестированию API через Postman

## Архитектура проекта

### Микросервисы
Проект построен на микросервисной архитектуре со следующими сервисами:

- **API Gateway** (порт 80) - единая точка входа для всех запросов
- **Auth Service** (порт 3002) - аутентификация и авторизация
- **Users Service** (порт 3001) - управление пользователями
- **Shop Service** (порт 3003) - управление магазинами
- **Product Service** (порт 3004) - управление продуктами
- **Order Service** (порт 3006) - управление заказами (.NET Core)
- **Payment Service** (порт 3005) - обработка платежей (.NET Core)

### Redis Кэширование
Все сервисы используют Redis для кэширования данных:

- **Auth Service**: кэширование кодов верификации email
- **Users Service**: кэширование списков пользователей и отдельных пользователей
- **Shop Service**: кэширование списков магазинов и отдельных магазинов
- **Product Service**: кэширование списков продуктов и отдельных продуктов
- **Order Service**: кэширование списков заказов, отдельных заказов и статистики
- **Payment Service**: кэширование списков платежей, отдельных платежей и статистики

### Базы данных
- **PostgreSQL**: основная база данных для всех сервисов
- **Redis**: кэширование и сессии

## Настройка Postman

### 1. Создание коллекции
1. Откройте Postman
2. Создайте новую коллекцию "FlowerProject API"
3. Добавьте переменную окружения `base_url` со значением `http://localhost:80`

## Аутентификация

### 1. Регистрация пользователя
**POST** `{{base_url}}/auth/registration`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Иван",
  "lastName": "Иванов",
  "birthDate": "1990-01-01",
  "phone": "+79001234567",
  "city": "Москва",
  "personalData": true
}
```

**Ожидаемый ответ:**
```json
{
  "message": "Registration successful!",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "firstName": "Иван",
    "lastName": "Иванов",
    "birthDate": "1990-01-01T00:00:00.000Z",
    "phone": "+79001234567",
    "city": "Москва",
    "personalData": true,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Вход в систему
**POST** `{{base_url}}/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Ожидаемый ответ:**
```json
{
  "message": "Authorization successful!",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "firstName": "Иван",
    "lastName": "Иванов",
    "birthDate": "1990-01-01T00:00:00.000Z",
    "phone": "+79001234567",
    "city": "Москва",
    "personalData": true,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Сохранение токена
После успешной регистрации или входа:
1. Скопируйте значение `accessToken` из ответа
2. В коллекции создайте переменную `auth_token`
3. Установите значение `auth_token` равным скопированному токену

**Автоматическое сохранение токена в Postman:**
Добавьте следующий тест в раздел "Tests" для запросов регистрации и входа:

```javascript
// Автоматическое сохранение токена
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.accessToken) {
        pm.collectionVariables.set("auth_token", response.accessToken);
        console.log("Токен сохранен:", response.accessToken);
    }
}
```

## Тестирование маршрутов Auth Service

### 4. Валидация токена
**POST** `{{base_url}}/auth/validatetoken`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ (валидный токен):**
```json
{
  "valid": true,
  "user": {
    "sub": 1,
    "email": "test@example.com",
    "firstName": "Иван",
    "lastName": "Иванов"
  }
}
```

**Ожидаемый ответ (невалидный токен):**
```json
{
  "valid": false,
  "error": "Invalid token"
}
```

**Ожидаемый ответ (отсутствует токен):**
```json
{
  "valid": false,
  "error": "Access token is required"
}
```

### 5. Получение профиля (защищенный маршрут)
**GET** `{{base_url}}/auth/profile`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:**
```json
{
  "message": "Profile accessed successfully",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "firstName": "Иван",
    "lastName": "Иванов"
  }
}
```

## Тестирование маршрутов Users Service

### 6. Получение всех пользователей
**GET** `{{base_url}}/users`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:**
```json
[
  {
    "id": 1,
    "email": "test@example.com",
    "firstName": "Иван",
    "lastName": "Иванов",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 7. Получение пользователя по ID
**GET** `{{base_url}}/users/1`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:**
```json
{
  "id": 1,
  "email": "test@example.com",
  "firstName": "Иван",
  "lastName": "Иванов",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 8. Обновление пользователя
**PATCH** `{{base_url}}/users/1`

**Headers:**
```
Authorization: Bearer {{auth_token}}
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "firstName": "Петр",
  "lastName": "Петров"
}
```

**Ожидаемый ответ:**
```json
{
  "id": 1,
  "email": "test@example.com",
  "firstName": "Петр",
  "lastName": "Петров",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 9. Активация пользователя
**PATCH** `{{base_url}}/users/1/activate`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:**
```json
{
  "id": 1,
  "email": "test@example.com",
  "firstName": "Петр",
  "lastName": "Петров",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 10. Деактивация пользователя
**PATCH** `{{base_url}}/users/1/deactivate`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:**
```json
{
  "id": 1,
  "email": "test@example.com",
  "firstName": "Петр",
  "lastName": "Петров",
  "isActive": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 11. Получение пользователя с избранными товарами
**GET** `{{base_url}}/users/1/with-favourites`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:**
```json
{
  "id": 1,
  "email": "test@example.com",
  "firstName": "Петр",
  "lastName": "Петров",
  "isActive": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "favouriteProducts": []
}
```

## Тестирование маршрутов избранных товаров

### 12. Добавление товара в избранное
**POST** `{{base_url}}/users/1/favourites`

**Headers:**
```
Authorization: Bearer {{auth_token}}
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "productId": 123,
  "productName": "Роза красная",
  "productPrice": 299.99,
  "productImage": "https://example.com/rose.jpg"
}
```

**Ожидаемый ответ:**
```json
{
  "id": 1,
  "userId": 1,
  "productId": 123,
  "productName": "Роза красная",
  "productPrice": 299.99,
  "productImage": "https://example.com/rose.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 13. Получение всех избранных товаров пользователя
**GET** `{{base_url}}/users/1/favourites`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "productId": 123,
    "productName": "Роза красная",
    "productPrice": 299.99,
    "productImage": "https://example.com/rose.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 14. Получение избранного товара по ID
**GET** `{{base_url}}/users/1/favourites/1`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:**
```json
{
  "id": 1,
  "userId": 1,
  "productId": 123,
  "productName": "Роза красная",
  "productPrice": 299.99,
  "productImage": "https://example.com/rose.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 15. Проверка, добавлен ли товар в избранное
**GET** `{{base_url}}/users/1/favourites/check/123`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:**
```json
{
  "isFavourite": true,
  "favouriteProduct": {
    "id": 1,
    "userId": 1,
    "productId": 123,
    "productName": "Роза красная",
    "productPrice": 299.99,
    "productImage": "https://example.com/rose.jpg"
  }
}
```

### 16. Обновление избранного товара
**PATCH** `{{base_url}}/users/1/favourites/1`

**Headers:**
```
Authorization: Bearer {{auth_token}}
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "productName": "Роза красная премиум",
  "productPrice": 399.99
}
```

**Ожидаемый ответ:**
```json
{
  "id": 1,
  "userId": 1,
  "productId": 123,
  "productName": "Роза красная премиум",
  "productPrice": 399.99,
  "productImage": "https://example.com/rose.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 17. Удаление избранного товара по ID
**DELETE** `{{base_url}}/users/1/favourites/1`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:** 204 No Content

### 18. Удаление избранного товара по productId
**DELETE** `{{base_url}}/users/1/favourites/product/123`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:** 204 No Content

## Тестирование ошибок

### 19. Попытка доступа без токена
**GET** `{{base_url}}/users`

**Headers:** (без Authorization)

**Ожидаемый ответ:**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 20. Попытка доступа с неверным токеном
**GET** `{{base_url}}/users`

**Headers:**
```
Authorization: Bearer invalid_token_here
```

**Ожидаемый ответ:**
```json
{
  "statusCode": 401,
  "message": "Invalid token"
}
```

### 21. Попытка доступа к несуществующему пользователю
**GET** `{{base_url}}/users/999`

**Headers:**
```
Authorization: Bearer {{auth_token}}
```

**Ожидаемый ответ:**
```json
{
  "statusCode": 404,
  "message": "User not found"
}
```

## Автоматизация тестирования

### Создание тестов в Postman

Для каждого запроса можно добавить автоматические тесты:

```javascript
// Проверка статуса ответа
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Проверка структуры ответа
pm.test("Response has correct structure", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('email');
});

// Автоматическое сохранение токена
if (pm.response.json().accessToken) {
    pm.collectionVariables.set("auth_token", pm.response.json().accessToken);
}
```

### Запуск коллекции

1. В Postman выберите коллекцию "FlowerProject API"
2. Нажмите "Run collection"
3. Выберите порядок выполнения запросов
4. Запустите тесты

## Примечания

- Все запросы к `/users/*` требуют валидный JWT токен
- Запросы к `/auth/*` (кроме login и registration) также требуют токен
- Токен автоматически передается через API Gateway к соответствующим сервисам
- При ошибках проверяйте логи контейнеров: `docker-compose logs api-gateway auth-service users-service`

## Типизация API

### Почему мы исправили `Promise<any>`

Изначально метод `validateToken` возвращал `Promise<any>`, что является плохой практикой в TypeScript по следующим причинам:

1. **Отсутствие типизации** - `any` отключает проверку типов, что может привести к ошибкам во время выполнения
2. **Сложность поддержки** - разработчики не знают, какую структуру данных ожидать
3. **Проблемы с IDE** - отсутствует автодополнение и подсказки

### Что мы исправили

1. **Создали интерфейсы:**
   ```typescript
   interface JwtPayload {
     sub: number;
     email: string;
     firstName: string;
     lastName: string;
     iat: number;
     exp: number;
   }

   interface TokenValidationResult {
     valid: boolean;
     user?: {
       sub: number;
       email: string;
       firstName: string;
       lastName: string;
     };
     error?: string;
   }
   ```

2. **Изменили возвращаемый тип:**
   ```typescript
   // Было:
   async validateToken(token: string): Promise<any>

   // Стало:
   async validateToken(token: string): Promise<TokenValidationResult>
   ```

3. **Улучшили обработку ошибок** - теперь метод возвращает структурированный ответ вместо выброса исключений

4. **Обновили API Gateway** для работы с новым форматом ответа

### Преимущества новой типизации

- **Типобезопасность** - TypeScript проверяет правильность использования данных
- **Лучшая документация** - интерфейсы служат документацией API
- **Упрощение тестирования** - четко определенная структура ответов
- **Улучшение разработки** - IDE предоставляет автодополнение и подсказки 

## Тестирование маршрутов Shop Service через Auth Service

### 1. Регистрация магазина (отправка кода на email)
**POST** `{{base_url}}/auth/shop/registration`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "shop@example.com",
  "password": "shopPassword123",
  "name": "Магазин Роз",
  "address": "г. Москва, ул. Цветочная, 1"
}
```

**Ожидаемый ответ:**
```json
{
  "message": "Verification code has been sent to your email"
}
```

---

### 2. Подтверждение регистрации магазина (верификация кода)
**POST** `{{base_url}}/auth/shops/verify`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "shop@example.com",
  "password": "shopPassword123",
  "name": "Магазин Роз",
  "address": "г. Москва, ул. Цветочная, 1",
  "code": "123456"
}
```
> **code** — это код, который пришёл на email.

**Ожидаемый ответ:**
```json
{
  "message": "Shop registration successful!",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "shop": {
    "id": 1,
    "email": "shop@example.com",
    "name": "Магазин Роз",
    "address": "г. Москва, ул. Цветочная, 1"
  }
}
```

---

### 3. Вход магазина (логин)
**POST** `{{base_url}}/auth/shops/login`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "shop@example.com",
  "password": "shopPassword123"
}
```

**Ожидаемый ответ:**
```json
{
  "message": "Shop login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "shop": {
    "id": 1,
    "email": "shop@example.com",
    "name": "Магазин Роз",
    "address": "г. Москва, ул. Цветочная, 1"
  }
}
```

---

### 4. Использование токена магазина

- После успешной регистрации (verify) или логина (login) скопируйте `accessToken` из ответа.
- Сохраните его в переменную Postman, например, `shop_token`.
- Для защищённых маршрутов магазина используйте заголовок:
  ```
  Authorization: Bearer {{shop_token}}
  ```

---

**Примечание:**
- Регистрация магазина — двухэтапная: сначала отправка кода, потом подтверждение.
- Токен магазина валиден для всех защищённых маршрутов, где требуется роль "shop". 

# Тестирование маршрутов Product Service через API Gateway

## Переменные
- `base_url` — http://localhost:3001 (порт gateway)
- `shop_token` — JWT магазина (см. регистрацию/логин магазина выше)
- `envservicetoken` — межсервисный токен (см. dev.env gateway)

## 1. Получить все продукты
**GET** `{{base_url}}/products`

**Ожидаемый ответ:**
```json
[
  {
    "id": 1,
    "name": "Розы 25 шт.",
    "description": "Красивый букет роз",
    "price": 2500,
    "imageUrl": "https://example.com/rose.jpg",
    "shopId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 2. Получить продукт по id
**GET** `{{base_url}}/products/1`

**Ожидаемый ответ:**
```json
{
  "id": 1,
  "name": "Розы 25 шт.",
  "description": "Красивый букет роз",
  "price": 2500,
  "imageUrl": "https://example.com/rose.jpg",
  "shopId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 3. Получить все продукты магазина
**GET** `{{base_url}}/products/shop/1`

**Ожидаемый ответ:**
```json
[
  {
    "id": 1,
    "name": "Розы 25 шт.",
    "description": "Красивый букет роз",
    "price": 2500,
    "imageUrl": "https://example.com/rose.jpg",
    "shopId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 4. Получить продукты по массиву id (межсервисный)
**POST** `{{base_url}}/products/by-ids`

**Headers:**
```
envservicetoken: {{envservicetoken}}
Content-Type: application/json
```
**Body (raw JSON):**
```json
{
  "ids": [1,2,3]
}
```
**Ожидаемый ответ:**
```json
[
  { "id": 1, "name": "Розы 25 шт.", ... },
  { "id": 2, "name": "Тюльпаны", ... }
]
```

## 5. Создать продукт (только для магазина)
**POST** `{{base_url}}/products`

**Headers:**
```
Authorization: Bearer {{shop_token}}
Content-Type: application/json
```
**Body (raw JSON):**
```json
{
  "name": "Тюльпаны",
  "description": "Весенний букет",
  "price": 1200,
  "imageUrl": "https://example.com/tulip.jpg"
}
```
**Ожидаемый ответ:**
```json
{
  "id": 2,
  "name": "Тюльпаны",
  "description": "Весенний букет",
  "price": 1200,
  "imageUrl": "https://example.com/tulip.jpg",
  "shopId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 6. Обновить продукт (только для магазина)
**PUT** `{{base_url}}/products/2`

**Headers:**
```
Authorization: Bearer {{shop_token}}
Content-Type: application/json
```
**Body (raw JSON):**
```json
{
  "name": "Тюльпаны 51 шт.",
  "price": 2500
}
```
**Ожидаемый ответ:**
```json
{
  "id": 2,
  "name": "Тюльпаны 51 шт.",
  "description": "Весенний букет",
  "price": 2500,
  "imageUrl": "https://example.com/tulip.jpg",
  "shopId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 7. Удалить продукт (только для магазина)
**DELETE** `{{base_url}}/products/2`

**Headers:**
```
Authorization: Bearer {{shop_token}}
```
**Ожидаемый ответ:**
```json
{
  "message": "Product deleted successfully"
}
```

## 8. Ошибки и автоматизация
- Для неавторизованных/чужих магазинов — 403 Forbidden
- Для несуществующего продукта — 404 Not Found
- Для невалидных данных — 400 Bad Request

## 9. Автоматизация сохранения shop_token
Добавьте в раздел "Tests" для логина/регистрации магазина:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.accessToken) {
        pm.collectionVariables.set("shop_token", response.accessToken);
        console.log("Shop токен сохранен:", response.accessToken);
    }
}
```

## 10. Пример структуры запроса в Postman
- Method: POST
- URL: {{base_url}}/products
- Headers:
    - Content-Type: application/json
    - Authorization: Bearer {{shop_token}}
- Body (raw, JSON):
```json
{
  "name": "Тюльпаны",
  "description": "Весенний букет",
  "price": 1200,
  "imageUrl": "https://example.com/tulip.jpg"
}
```

## Примечания
- Все методы доступны только через gateway
- Для защищённых методов используйте shop_token
- Для межсервисных — envservicetoken
- Для тестирования используйте Postman или curl с нужными заголовками 

# Важно для product-service

**Для всех защищённых методов product-service (создание, обновление, удаление продукта) используйте только JWT токен магазина!**

- Токен пользователя (без поля "role": "shop") не подойдёт — будет 401 Unauthorized.
- Получить shop-токен можно через регистрацию или логин магазина (см. ниже).
- Проверьте payload токена на jwt.io — там должно быть:
  ```json
  {
    "sub": <shopId>,
    "email": "shop@example.com",
    "role": "shop",
    ...
  }
  ```

## Пример получения shop-токена

### 1. Логин магазина
```
POST {{base_url}}/auth/shops/login
Headers:
  Content-Type: application/json
Body (raw, JSON):
{
  "email": "shop@example.com",
  "password": "shopPassword123"
}
```
**В ответе будет:**
```json
{
  "message": "Shop login successful",
  "accessToken": "...",
  "shop": { ... }
}
```

### 2. Используйте этот токен для product-service
```
Authorization: Bearer {{shop_token}}
```

---

# Пример запроса на добавление продукта (product-service)

```
POST {{base_url}}/products
Headers:
  Content-Type: application/json
  Authorization: Bearer {{shop_token}}
Body (raw, JSON):
{
  "name": "Тюльпаны",
  "description": "Весенний букет",
  "price": 1200,
  "imageUrl": "https://example.com/tulip.jpg"
}
```

---

# Остальные примеры для product-service см. ниже по тексту (раздел "Тестирование маршрутов Product Service через API Gateway") 

# Тестирование маршрутов Payment Service через Postman

## Переменные
- `base_url` — http://localhost:80 (порт gateway)
- `shop_token` — JWT магазина (см. регистрацию/логин магазина выше)

## 1. Проверка здоровья сервиса
**GET** `{{base_url}}/payment/health`

**Headers:**
```
Content-Type: application/json
```

**Ожидаемый ответ:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 2. Валидация данных карты
**POST** `{{base_url}}/payment/validate-card`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "cardNumber": "4111111111111111",
  "cvc": "123",
  "expiry": "12/25",
  "cardHolder": "IVAN IVANOV"
}
```

**Ожидаемый ответ (успешная валидация):**
```json
{
  "isValid": true,
  "errors": [],
  "cardType": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Ожидаемый ответ (ошибка валидации):**
```json
{
  "isValid": false,
  "errors": [
    "Неверная длина номера карты",
    "Неверный формат срока действия (MM/YY)"
  ],
  "cardType": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 3. Создать платёж с данными карты
**POST** `{{base_url}}/payment`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "amount": 2500.50,
  "orderId": "ORDER-123",
  "cardNumber": "4111111111111111",
  "cardHolder": "IVAN IVANOV",
  "expiry": "12/25",
  "cvc": "123",
  "currency": "RUB",
  "description": "Оплата букета Розы 25 шт.",
  "email": "customer@example.com"
}
```

**Ожидаемый ответ (успешный платеж):**
```json
{
  "success": true,
  "message": "Оплата прошла успешно!",
  "paymentId": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Ожидаемый ответ (неуспешный платеж):**
```json
{
  "success": false,
  "message": "Ошибка обработки платежа",
  "paymentId": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 4. Получить все платежи
**GET** `{{base_url}}/payment`

**Headers:**
```
Content-Type: application/json
```

**Ожидаемый ответ:**
```json
[
  {
    "success": true,
    "paymentId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "completed",
    "message": "Payment completed successfully",
    "amount": 2500.50,
    "currency": "RUB",
    "description": "Оплата букета Розы 25 шт.",
    "email": "customer@example.com",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
]
```

## 5. Получить платеж по ID
**GET** `{{base_url}}/payment/{paymentId}`

**Headers:**
```
Content-Type: application/json
```

**Пример запроса:**
```
GET {{base_url}}/payment/550e8400-e29b-41d4-a716-446655440000
```

**Ожидаемый ответ:**
```json
{
  "success": true,
  "paymentId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "completed",
  "message": "Payment completed successfully",
  "amount": 2500.50,
  "currency": "RUB",
  "description": "Оплата букета Розы 25 шт.",
  "email": "customer@example.com",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 6. Получить статистику платежей
**GET** `{{base_url}}/payment/statistics`

**Headers:**
```
Content-Type: application/json
```

**Ожидаемый ответ:**
```json
{
  "totalPayments": 10,
  "successfulPayments": 9,
  "failedPayments": 1,
  "successRate": 90.0,
  "totalAmount": 15000.50,
  "averageAmount": 1666.72,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 7. Удалить платеж (административная функция)
**DELETE** `{{base_url}}/payment/{paymentId}`

**Headers:**
```
Content-Type: application/json
```

**Пример запроса:**
```
DELETE {{base_url}}/payment/550e8400-e29b-41d4-a716-446655440000
```

**Ожидаемый ответ:**
```json
{
  "message": "Платеж успешно удален"
}
```

## 8. Примеры ошибок

### Неверный номер карты
**POST** `{{base_url}}/payment`
```json
{
  "amount": 100,
  "orderId": "ORDER-123",
  "cardNumber": "123",
  "cardHolder": "IVAN IVANOV",
  "expiry": "12/25",
  "cvc": "123"
}
```

**Ответ:**
```json
{
  "success": false,
  "message": "Неверный номер карты",
  "paymentId": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Неверный CVC
**POST** `{{base_url}}/payment`
```json
{
  "amount": 100,
  "orderId": "ORDER-123",
  "cardNumber": "4111111111111111",
  "cardHolder": "IVAN IVANOV",
  "expiry": "12/25",
  "cvc": "12"
}
```

**Ответ:**
```json
{
  "success": false,
  "message": "Неверный CVC код",
  "paymentId": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Просроченная карта
**POST** `{{base_url}}/payment`
```json
{
  "amount": 100,
  "orderId": "ORDER-123",
  "cardNumber": "4111111111111111",
  "cardHolder": "IVAN IVANOV",
  "expiry": "12/20",
  "cvc": "123"
}
```

**Ответ:**
```json
{
  "success": false,
  "message": "Неверный срок действия карты",
  "paymentId": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 9. Правила валидации

### Номер карты
- Должен содержать от 13 до 19 цифр
- Обязательное поле

### CVC код
- Должен содержать 3-4 цифры
- Обязательное поле

### Срок действия
- Формат: MM/YY (например, 12/25)
- Месяц: 01-12
- Год: не должен быть в прошлом
- Обязательное поле

### Сумма
- Должна быть больше нуля
- Поддерживает десятичные значения

### Дополнительные поля
- `currency` - валюта (по умолчанию "RUB")
- `description` - описание платежа
- `email` - email клиента

## 10. Примечания
- Все методы доступны через API Gateway
- Сервис симулирует обработку платежей (90% успешных, 10% неуспешных)
- Статусы платежей: "completed", "pending", "failed", "processing"
- Для тестирования используйте Postman или curl с нужными заголовками

---

**Пример полного запроса на создание платежа:**
```
POST {{base_url}}/payment
Headers:
  Content-Type: application/json
Body (raw, JSON):
{
  "amount": 2500.50,
  "orderId": "ORDER-123",
  "cardNumber": "4111111111111111",
  "cardHolder": "IVAN IVANOV",
  "expiry": "12/25",
  "cvc": "123",
  "currency": "RUB",
  "description": "Оплата букета Розы 25 шт.",
  "email": "customer@example.com"
}
``` 

---

# Тестирование маршрутов Order Service через Postman

## Переменные
- `base_url` — http://localhost:80 (порт gateway)
- `auth_token` — JWT пользователя (см. регистрацию/логин пользователя выше)

## 1. Проверка здоровья сервиса
**GET** `{{base_url}}/order/health`

**Headers:**
```
Content-Type: application/json
```

**Ожидаемый ответ:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 2. Получить все заказы
**GET** `{{base_url}}/order`

**Headers:**
```
Content-Type: application/json
```

**Ожидаемый ответ:**
```json
[
  {
    "orderId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": 1,
    "shopId": 1,
    "totalAmount": 4500.00,
    "status": "pending",
    "customerName": "Иван Иванов",
    "customerEmail": "ivan@example.com",
    "customerPhone": "+7 (999) 123-45-67",
    "deliveryAddress": "ул. Пушкина, д. 10, кв. 5, Москва",
    "deliveryNotes": "Доставить до 18:00",
    "estimatedDeliveryDate": "2024-01-15T18:00:00.000Z",
    "actualDeliveryDate": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "orderItems": [
      {
        "orderItemId": "660e8400-e29b-41d4-a716-446655440001",
        "productId": 1,
        "productName": "Букет \"Весенний рассвет\"",
        "productDescription": "Красивый весенний букет из тюльпанов и нарциссов",
        "unitPrice": 2200.00,
        "quantity": 1,
        "totalPrice": 2200.00,
        "productImage": "https://example.com/spring-bouquet.jpg"
      }
    ]
  }
]
```

## 3. Получить заказ по ID
**GET** `{{base_url}}/order/{{orderId}}`

**Headers:**
```
Content-Type: application/json
```

**Ожидаемый ответ:**
```json
{
  "orderId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": 1,
  "shopId": 1,
  "totalAmount": 4500.00,
  "status": "pending",
  "customerName": "Иван Иванов",
  "customerEmail": "ivan@example.com",
  "customerPhone": "+7 (999) 123-45-67",
  "deliveryAddress": "ул. Пушкина, д. 10, кв. 5, Москва",
  "deliveryNotes": "Доставить до 18:00",
  "estimatedDeliveryDate": "2024-01-15T18:00:00.000Z",
  "actualDeliveryDate": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "orderItems": [
    {
      "orderItemId": "660e8400-e29b-41d4-a716-446655440001",
      "productId": 1,
      "productName": "Букет \"Весенний рассвет\"",
      "productDescription": "Красивый весенний букет из тюльпанов и нарциссов",
      "unitPrice": 2200.00,
      "quantity": 1,
      "totalPrice": 2200.00,
      "productImage": "https://example.com/spring-bouquet.jpg"
    }
  ]
}
```

## 4. Получить заказы пользователя
**GET** `{{base_url}}/order/user/1`

**Headers:**
```
Content-Type: application/json
```

**Ожидаемый ответ:**
```json
[
  {
    "orderId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": 1,
    "shopId": 1,
    "totalAmount": 4500.00,
    "status": "pending",
    "customerName": "Иван Иванов",
    "customerEmail": "ivan@example.com",
    "customerPhone": "+7 (999) 123-45-67",
    "deliveryAddress": "ул. Пушкина, д. 10, кв. 5, Москва",
    "deliveryNotes": "Доставить до 18:00",
    "estimatedDeliveryDate": "2024-01-15T18:00:00.000Z",
    "actualDeliveryDate": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "orderItems": [
      {
        "orderItemId": "660e8400-e29b-41d4-a716-446655440001",
        "productId": 1,
        "productName": "Букет \"Весенний рассвет\"",
        "productDescription": "Красивый весенний букет из тюльпанов и нарциссов",
        "unitPrice": 2200.00,
        "quantity": 1,
        "totalPrice": 2200.00,
        "productImage": "https://example.com/spring-bouquet.jpg"
      }
    ]
  }
]
```

## 5. Получить заказы магазина
**GET** `{{base_url}}/order/shop/1`

**Headers:**
```
Content-Type: application/json
```

**Ожидаемый ответ:**
```json
[
  {
    "orderId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": 1,
    "shopId": 1,
    "totalAmount": 4500.00,
    "status": "pending",
    "customerName": "Иван Иванов",
    "customerEmail": "ivan@example.com",
    "customerPhone": "+7 (999) 123-45-67",
    "deliveryAddress": "ул. Пушкина, д. 10, кв. 5, Москва",
    "deliveryNotes": "Доставить до 18:00",
    "estimatedDeliveryDate": "2024-01-15T18:00:00.000Z",
    "actualDeliveryDate": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "orderItems": [
      {
        "orderItemId": "660e8400-e29b-41d4-a716-446655440001",
        "productId": 1,
        "productName": "Букет \"Весенний рассвет\"",
        "productDescription": "Красивый весенний букет из тюльпанов и нарциссов",
        "unitPrice": 2200.00,
        "quantity": 1,
        "totalPrice": 2200.00,
        "productImage": "https://example.com/spring-bouquet.jpg"
      }
    ]
  }
]
```

## 6. Создать новый заказ
**POST** `{{base_url}}/order`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "userId": 1,
  "shopId": 1,
  "totalAmount": 4500.00,
  "deliveryAddress": "ул. Пушкина, д. 10, кв. 5, Москва",
  "customerName": "Иван Иванов",
  "customerPhone": "+7 (999) 123-45-67",
  "customerEmail": "ivan@example.com",
  "deliveryNotes": "Доставить до 18:00",
  "estimatedDeliveryDate": "2024-01-15T18:00:00.000Z",
  "orderItems": [
    {
      "productId": 1,
      "productName": "Букет \"Весенний рассвет\"",
      "productDescription": "Красивый весенний букет из тюльпанов и нарциссов",
      "unitPrice": 2200.00,
      "quantity": 1,
      "productImage": "https://example.com/spring-bouquet.jpg"
    },
    {
      "productId": 2,
      "productName": "Букет \"Розовое настроение\"",
      "productDescription": "Романтичный букет из роз",
      "unitPrice": 1800.00,
      "quantity": 1,
      "productImage": "https://example.com/rose-bouquet.jpg"
    }
  ]
}
```

**Ожидаемый ответ:**
```json
{
  "orderId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": 1,
  "shopId": 1,
  "totalAmount": 4500.00,
  "status": "pending",
  "customerName": "Иван Иванов",
  "customerEmail": "ivan@example.com",
  "customerPhone": "+7 (999) 123-45-67",
  "deliveryAddress": "ул. Пушкина, д. 10, кв. 5, Москва",
  "deliveryNotes": "Доставить до 18:00",
  "estimatedDeliveryDate": "2024-01-15T18:00:00.000Z",
  "actualDeliveryDate": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "orderItems": [
    {
      "orderItemId": "660e8400-e29b-41d4-a716-446655440001",
      "productId": 1,
      "productName": "Букет \"Весенний рассвет\"",
      "productDescription": "Красивый весенний букет из тюльпанов и нарциссов",
      "unitPrice": 2200.00,
      "quantity": 1,
      "totalPrice": 2200.00,
      "productImage": "https://example.com/spring-bouquet.jpg"
    },
    {
      "orderItemId": "660e8400-e29b-41d4-a716-446655440002",
      "productId": 2,
      "productName": "Букет \"Розовое настроение\"",
      "productDescription": "Романтичный букет из роз",
      "unitPrice": 1800.00,
      "quantity": 1,
      "totalPrice": 1800.00,
      "productImage": "https://example.com/rose-bouquet.jpg"
    }
  ]
}
```

## 7. Обновить статус заказа
**PUT** `{{base_url}}/order/{{orderId}}/status`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "status": "confirmed"
}
```

**Ожидаемый ответ:**
```json
{
  "message": "Статус заказа успешно обновлен",
  "status": "confirmed"
}
```

## 8. Удалить заказ
**DELETE** `{{base_url}}/order/{{orderId}}`

**Headers:**
```
Content-Type: application/json
```

**Ожидаемый ответ:**
```json
{
  "message": "Заказ успешно удален"
}
```

## 9. Получить статистику заказов
**GET** `{{base_url}}/order/statistics`

**Headers:**
```
Content-Type: application/json
```

**Ожидаемый ответ:**
```json
{
  "totalOrders": 10,
  "pendingOrders": 3,
  "confirmedOrders": 2,
  "processingOrders": 2,
  "shippedOrders": 1,
  "deliveredOrders": 1,
  "cancelledOrders": 1,
  "totalRevenue": 15000.50,
  "averageOrderValue": 1666.72,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 10. Статусы заказов

- `pending` - ожидает подтверждения
- `confirmed` - подтвержден
- `processing` - в обработке
- `shipped` - отправлен
- `delivered` - доставлен
- `cancelled` - отменен

## 11. Примеры ошибок

### Неверный формат ID заказа
**GET** `{{base_url}}/order/invalid-id`

**Ответ:**
```json
{
  "message": "Неверный формат ID заказа"
}
```

### Заказ не найден
**GET** `{{base_url}}/order/550e8400-e29b-41d4-a716-446655440999`

**Ответ:**
```json
{
  "message": "Заказ не найден"
}
```

### Неверный статус заказа
**PUT** `{{base_url}}/order/{{orderId}}/status`
```json
{
  "status": "invalid_status"
}
```

**Ответ:**
```json
{
  "message": "Неверный статус заказа"
}
```

### Нельзя удалить заказ в текущем статусе
**DELETE** `{{base_url}}/order/{{orderId}}`

**Ответ (если заказ не в статусе pending или cancelled):**
```json
{
  "message": "Нельзя удалить заказ в текущем статусе"
}
```

## 12. Автоматизация в Postman

### Сохранение orderId после создания заказа
Добавьте в раздел "Tests" для создания заказа:
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    if (response.orderId) {
        pm.collectionVariables.set("orderId", response.orderId);
        console.log("Order ID сохранен:", response.orderId);
    }
}
```

### Проверка статуса ответа
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has correct structure", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('orderId');
    pm.expect(jsonData).to.have.property('status');
});
```

## 13. Интеграция с другими сервисами

Order Service может интегрироваться с:
- **Users Service** - для получения информации о пользователях
- **Product Service** - для получения информации о продуктах
- **Shop Service** - для получения информации о магазинах
- **Payment Service** - для обработки платежей

## 14. Примечания
- Все методы доступны через API Gateway
- Заказы создаются со статусом "pending" по умолчанию
- При статусе "delivered" автоматически устанавливается actualDeliveryDate
- Удаление возможно только для заказов в статусе "pending" или "cancelled"
- Для тестирования используйте Postman или curl с нужными заголовками

---

**Пример полного запроса на создание заказа:**
```
POST {{base_url}}/order
Headers:
  Content-Type: application/json
Body (raw, JSON):
{
  "userId": 1,
  "shopId": 1,
  "totalAmount": 4500.00,
  "deliveryAddress": "ул. Пушкина, д. 10, кв. 5, Москва",
  "customerName": "Иван Иванов",
  "customerPhone": "+7 (999) 123-45-67",
  "customerEmail": "ivan@example.com",
  "deliveryNotes": "Доставить до 18:00",
  "estimatedDeliveryDate": "2024-01-15T18:00:00.000Z",
  "orderItems": [
    {
      "productId": 1,
      "productName": "Букет \"Весенний рассвет\"",
      "productDescription": "Красивый весенний букет из тюльпанов и нарциссов",
      "unitPrice": 2200.00,
      "quantity": 1,
      "productImage": "https://example.com/spring-bouquet.jpg"
    }
  ]
}
```

## 15. Тестирование Redis Кэширования

### Проверка работы кэша

#### 1. Тест кэширования списков
1. Выполните запрос `GET {{base_url}}/users` (или любой другой список)
2. Запомните время ответа
3. Повторите запрос несколько раз
4. Время ответа должно быть значительно меньше при повторных запросах

#### 2. Тест кэширования отдельных элементов
1. Выполните запрос `GET {{base_url}}/users/1` (или любой другой элемент)
2. Запомните время ответа
3. Повторите запрос несколько раз
4. Время ответа должно быть значительно меньше при повторных запросах

#### 3. Тест инвалидации кэша
1. Выполните запрос `GET {{base_url}}/users` и запомните время
2. Создайте нового пользователя: `POST {{base_url}}/users`
3. Сразу выполните `GET {{base_url}}/users` снова
4. Время ответа должно быть больше (кэш инвалидирован)

### Мониторинг Redis

#### Подключение к Redis CLI
```bash
# Подключение к Redis контейнеру
docker exec -it redis redis-cli

# Просмотр всех ключей
KEYS *

# Просмотр ключей конкретного сервиса
KEYS users:*
KEYS products:*
KEYS orders:*
KEYS payments:*

# Просмотр TTL ключа
TTL users:all

# Просмотр значения ключа
GET users:all
```

#### Проверка статистики кэша
```bash
# Статистика Redis
INFO memory
INFO stats

# Количество ключей по паттернам
DBSIZE
KEYS * | wc -l
```

### Время жизни кэша (TTL)

#### NestJS сервисы:
- **Списки**: 5-10 минут
- **Отдельные элементы**: 10-15 минут
- **Статистика**: 15-30 минут

#### .NET сервисы:
- **Списки**: 5 минут
- **Отдельные элементы**: 10 минут
- **Статистика**: 15 минут

### Ключи кэша

#### Users Service:
- `users:all` - список всех пользователей
- `user:{id}` - отдельный пользователь
- `user:email:{email}` - пользователь по email

#### Product Service:
- `products:all` - список всех продуктов
- `product:{id}` - отдельный продукт
- `products:shop:{shopId}` - продукты магазина

#### Shop Service:
- `shops:all` - список всех магазинов
- `shop:{id}` - отдельный магазин
- `shop:email:{email}` - магазин по email

#### Order Service:
- `orders:all` - список всех заказов
- `order:{id}` - отдельный заказ
- `orders:statistics` - статистика заказов

#### Payment Service:
- `payments:all` - список всех платежей
- `payment:{id}` - отдельный платеж
- `payments:statistics` - статистика платежей

### Автоматическая инвалидация кэша

При выполнении операций создания, обновления или удаления данных автоматически инвалидируются соответствующие кэши:

- **Создание**: инвалидируется кэш списков и статистики
- **Обновление**: инвалидируется кэш списков, статистики и конкретного элемента
- **Удаление**: инвалидируется кэш списков, статистики и конкретного элемента

### Отладка кэширования

#### Включение логирования Redis
Добавьте в переменные окружения:
```
REDIS_LOG_LEVEL=debug
```

#### Проверка подключения к Redis
```bash
# Проверка доступности Redis
docker exec -it redis redis-cli ping

# Проверка подключения из сервиса
docker exec -it users-service wget -qO- http://redis:6379
```

### Производительность

#### Ожидаемые улучшения:
- **Первый запрос**: 100-500ms (загрузка из БД)
- **Повторные запросы**: 10-50ms (загрузка из кэша)
- **Улучшение производительности**: 80-90%

#### Мониторинг производительности:
```bash
# Время ответа API
curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:80/users"

# Создайте файл curl-format.txt:
#      time_namelookup:  %{time_namelookup}\n
#         time_connect:  %{time_connect}\n
#      time_appconnect:  %{time_appconnect}\n
#     time_pretransfer:  %{time_pretransfer}\n
#        time_redirect:  %{time_redirect}\n
#   time_starttransfer:  %{time_starttransfer}\n
#                      ----------\n
#           time_total:  %{time_total}\n
```