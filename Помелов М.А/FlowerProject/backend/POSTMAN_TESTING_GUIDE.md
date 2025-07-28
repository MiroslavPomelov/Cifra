# Руководство по тестированию API через Postman

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

## 1. Создать платёж
**POST** `{{base_url}}/payment`

**Headers:**
```
Authorization: Bearer {{shop_token}}
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "orderId": 123,
  "amount": 2500,
  "currency": "RUB",
  "description": "Оплата букета Розы 25 шт."
}
```

**Ожидаемый ответ:**
```json
{
  "paymentId": 1,
  "orderId": 123,
  "amount": 2500,
  "currency": "RUB",
  "status": "created",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 2. Получить информацию о платеже по ID
**GET** `{{base_url}}/payment/1`

**Headers:**
```
Authorization: Bearer {{shop_token}}
```

**Ожидаемый ответ:**
```json
{
  "paymentId": 1,
  "orderId": 123,
  "amount": 2500,
  "currency": "RUB",
  "status": "created",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 3. Получить все платежи магазина
**GET** `{{base_url}}/payment/shop/1`

**Headers:**
```
Authorization: Bearer {{shop_token}}
```

**Ожидаемый ответ:**
```json
[
  {
    "paymentId": 1,
    "orderId": 123,
    "amount": 2500,
    "currency": "RUB",
    "status": "created",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  ...
]
```

## 4. Ошибки
- Если не передан токен или он невалиден — 401 Unauthorized
- Если платёж не найден — 404 Not Found
- Если невалидные данные — 400 Bad Request

## 5. Примечания
- Все методы доступны только через API Gateway
- Для защищённых методов используйте shop_token
- Для тестирования используйте Postman или curl с нужными заголовками

---

**Пример запроса на создание платежа:**
```
POST {{base_url}}/payment
Headers:
  Content-Type: application/json
  Authorization: Bearer {{shop_token}}
Body (raw, JSON):
{
  "orderId": 123,
  "amount": 2500,
  "currency": "RUB",
  "description": "Оплата букета Розы 25 шт."
}
``` 