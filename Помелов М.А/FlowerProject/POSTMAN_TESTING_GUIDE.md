# Postman Testing Guide для Auth-Service

## Настройка Postman

### 1. Создание Environment
1. Откройте Postman
2. Нажмите на шестеренку (⚙️) в правом верхнем углу
3. Создайте новое Environment с именем "FlowerProject Auth"
4. Добавьте переменные:
   - `base_url`: `http://localhost:3000`
   - `token`: (оставьте пустым, будет заполнено автоматически)

### 2. Создание Collection
1. Создайте новую Collection "Auth Service Tests"
2. Добавьте все запросы в эту коллекцию

## Тестирование эндпоинтов

### 1. Регистрация пользователя (POST /auth/registration)

**URL:** `{{base_url}}/auth/registration`

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

**Ожидаемый ответ (200):**
```json
{
  "message": "Registration successful!",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Тест для автоматического сохранения токена:**
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.accessToken) {
        pm.environment.set("token", response.accessToken);
    }
}
```

### 2. Вход пользователя (POST /auth/login)

**URL:** `{{base_url}}/auth/login`

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

**Ожидаемый ответ (200):**
```json
{
  "message": "Authorization successful!",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Тест для автоматического сохранения токена:**
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.accessToken) {
        pm.environment.set("token", response.accessToken);
    }
}
```

### 3. Получение профиля (GET /auth/profile)

**URL:** `{{base_url}}/auth/profile`

**Headers:**
```
Authorization: Bearer {{token}}
```

**Ожидаемый ответ (200):**
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

## Тестирование ошибок

### 1. Регистрация с существующим email

**Body:**
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

**Ожидаемый ответ (400):**
```json
{
  "statusCode": 400,
  "message": "User with this email already exists",
  "error": "Bad Request"
}
```

### 2. Вход с неверными данными

**Body:**
```json
{
  "email": "wrong@example.com",
  "password": "wrongpassword"
}
```

**Ожидаемый ответ (401):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### 3. Доступ к профилю без токена

**Headers:** (пустые)

**Ожидаемый ответ (401):**
```json
{
  "statusCode": 401,
  "message": "Access token is required",
  "error": "Unauthorized"
}
```

### 4. Доступ к профилю с неверным токеном

**Headers:**
```
Authorization: Bearer invalid_token_here
```

**Ожидаемый ответ (401):**
```json
{
  "statusCode": 401,
  "message": "Invalid token",
  "error": "Unauthorized"
}
```

## Тестирование валидации

### 1. Неверный формат email

**Body:**
```json
{
  "email": "invalid-email",
  "password": "password123",
  "firstName": "Иван",
  "lastName": "Иванов",
  "birthDate": "1990-01-01",
  "phone": "+79001234567",
  "city": "Москва",
  "personalData": true
}
```

### 2. Короткий пароль

**Body:**
```json
{
  "email": "test@example.com",
  "password": "123",
  "firstName": "Иван",
  "lastName": "Иванов",
  "birthDate": "1990-01-01",
  "phone": "+79001234567",
  "city": "Москва",
  "personalData": true
}
```

### 3. Неверный формат телефона

**Body:**
```json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Иван",
  "lastName": "Иванов",
  "birthDate": "1990-01-01",
  "phone": "1234567890",
  "city": "Москва",
  "personalData": true
}
```

### 4. Отсутствие согласия с обработкой данных

**Body:**
```json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Иван",
  "lastName": "Иванов",
  "birthDate": "1990-01-01",
  "phone": "+79001234567",
  "city": "Москва",
  "personalData": false
}
```

## Автоматизированные тесты

### Создание тестового скрипта

Добавьте следующий скрипт в Pre-request Script для автоматической очистки токена:

```javascript
// Очищаем токен перед каждым запросом (кроме login и registration)
if (pm.request.url.path[1] !== 'login' && pm.request.url.path[1] !== 'registration') {
    pm.environment.set("token", "");
}
```

### Тесты для проверки структуры ответа

**Для login/registration:**
```javascript
pm.test("Response has correct structure", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('message');
    pm.expect(response).to.have.property('accessToken');
    pm.expect(response.accessToken).to.be.a('string');
    pm.expect(response.accessToken.length).to.be.greaterThan(0);
});
```

**Для profile:**
```javascript
pm.test("Profile response has correct structure", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('message');
    pm.expect(response).to.have.property('user');
    pm.expect(response.user).to.have.property('id');
    pm.expect(response.user).to.have.property('email');
    pm.expect(response.user).to.have.property('firstName');
    pm.expect(response.user).to.have.property('lastName');
});
```

## Последовательность тестирования

1. **Регистрация нового пользователя**
2. **Вход с созданными данными**
3. **Получение профиля с токеном**
4. **Тестирование ошибок валидации**
5. **Тестирование ошибок аутентификации**

## Проверка работоспособности сервиса

### Health Check
**URL:** `{{base_url}}/health`

**Ожидаемый ответ (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Советы по тестированию

1. **Используйте разные email адреса** для каждого теста регистрации
2. **Проверяйте все поля валидации** отдельно
3. **Тестируйте граничные значения** (минимальная/максимальная длина)
4. **Проверяйте обработку специальных символов** в полях
5. **Тестируйте истечение токена** (подождите 1 час или измените время в коде)

## Устранение неполадок

### Сервис не отвечает
1. Проверьте, что Docker контейнеры запущены
2. Проверьте логи: `docker-compose logs auth-service`
3. Убедитесь, что порт 3000 не занят

### Ошибки валидации
1. Проверьте формат даты (YYYY-MM-DD)
2. Убедитесь, что телефон в формате +7XXXXXXXXXX
3. Проверьте, что personalData = true

### Ошибки аутентификации
1. Убедитесь, что users-service запущен
2. Проверьте переменные окружения
3. Проверьте логи auth-service и users-service 