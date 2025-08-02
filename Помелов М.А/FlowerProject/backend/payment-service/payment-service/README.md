# Payment Service

Сервис для обработки платежей с поддержкой валидации данных карт и хранения в базе данных PostgreSQL.

## Возможности

- ✅ Валидация данных банковских карт
- ✅ Обработка платежей с симуляцией
- ✅ Хранение всех платежей в базе данных
- ✅ Получение статистики платежей
- ✅ Безопасное хранение (маскирование номеров карт, не сохранение CVC)
- ✅ Health check для Docker
- ✅ Полная интеграция с API Gateway

## API Endpoints

### Health Check
- `GET /payment/health` - проверка состояния сервиса

### Платежи
- `GET /payment` - получить все платежи
- `POST /payment` - создать новый платеж
- `GET /payment/{paymentId}` - получить платеж по ID
- `DELETE /payment/{paymentId}` - удалить платеж (административная функция)

### Валидация
- `POST /payment/validate-card` - валидация данных карты

### Статистика
- `GET /payment/statistics` - получить статистику платежей

## Структура базы данных

### Таблица Payments
- `PaymentId` (Guid) - уникальный идентификатор платежа
- `Amount` (decimal) - сумма платежа
- `Status` (string) - статус платежа (completed, failed, pending, processing)
- `CardNumber` (string) - замаскированный номер карты
- `CardHolder` (string) - имя держателя карты
- `Expiry` (string) - срок действия карты
- `Cvc` (string) - замаскированный CVC код
- `Currency` (string) - валюта платежа
- `Description` (string) - описание платежа
- `Email` (string) - email клиента
- `CreatedAt` (DateTime) - дата создания платежа

## Безопасность

- Номера карт маскируются при сохранении (формат: 1234****5678)
- CVC коды не сохраняются в базе данных
- Все валидации выполняются на сервере
- Поддержка различных типов карт (Visa, MasterCard, American Express, Discover)

## Запуск

### Локально
```bash
cd backend/payment-service/payment-service
dotnet run
```

### В Docker
```bash
cd backend
docker-compose up payment-service
```

## Тестирование

Используйте файл `test-payment.http` для тестирования всех endpoints через REST Client.

### Примеры запросов

#### Создание платежа
```bash
curl -X POST http://localhost:3005/payment \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 2500.50,
    "cardNumber": "4111111111111111",
    "cardHolder": "IVAN IVANOV",
    "expiry": "12/25",
    "cvc": "123",
    "currency": "RUB",
    "description": "Оплата букета Розы 25 шт.",
    "email": "customer@example.com"
  }'
```

#### Получение всех платежей
```bash
curl -X GET http://localhost:3005/payment
```

#### Получение статистики
```bash
curl -X GET http://localhost:3005/payment/statistics
```

## Конфигурация

### Переменные окружения
- `ConnectionStrings__PaymentDB` - строка подключения к PostgreSQL
- `ASPNETCORE_URLS` - URL для запуска приложения

### appsettings.json
```json
{
  "ConnectionStrings": {
    "PaymentDB": "Host=paymentdb;Port=5432;Database=paymentdb;Username=payment_user;Password=payment_password"
  }
}
```

## Интеграция

Сервис интегрирован с:
- API Gateway (проксирование запросов)
- PostgreSQL (хранение данных)
- Docker (контейнеризация)
- Health checks (мониторинг)

## Мониторинг

- Health check endpoint: `/payment/health`
- Статистика платежей: `/payment/statistics`
- Логирование всех операций
- Обработка ошибок с детальными сообщениями 