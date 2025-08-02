# Order Service

Сервис управления заказами для цветочного магазина, написанный на C# с использованием ASP.NET Core 8.0 и Entity Framework Core.

## Описание

Order Service отвечает за:
- Создание и управление заказами
- Отслеживание статуса заказов
- Управление товарами в заказах
- Статистику по заказам
- Интеграцию с другими сервисами (users, products, shops)

## Технологии

- **.NET 8.0** - основная платформа
- **ASP.NET Core** - веб-фреймворк
- **Entity Framework Core** - ORM для работы с базой данных
- **PostgreSQL** - база данных
- **Docker** - контейнеризация

## Структура проекта

```
order-service/
├── Controllers/
│   └── OrderController.cs          # API контроллер
├── Data/
│   └── OrderDbContext.cs           # Контекст базы данных
├── Models/
│   ├── Order.cs                    # Модель заказа
│   ├── OrderItem.cs                # Модель товара заказа
│   └── ErrorViewModel.cs           # Модель ошибки
├── Program.cs                      # Точка входа
├── appsettings.json               # Конфигурация
├── Dockerfile                     # Docker образ
└── test-order.http               # Тестовые запросы
```

## API Endpoints

### Health Check
- `GET /order/health` - проверка состояния сервиса

### Заказы
- `GET /order` - получить все заказы
- `GET /order/{orderId}` - получить заказ по ID
- `GET /order/user/{userId}` - получить заказы пользователя
- `GET /order/shop/{shopId}` - получить заказы магазина
- `POST /order` - создать новый заказ
- `PUT /order/{orderId}/status` - обновить статус заказа
- `DELETE /order/{orderId}` - удалить заказ

### Статистика
- `GET /order/statistics` - получить статистику заказов

## Статусы заказов

- `pending` - ожидает подтверждения
- `confirmed` - подтвержден
- `processing` - в обработке
- `shipped` - отправлен
- `delivered` - доставлен
- `cancelled` - отменен

## Модели данных

### Order
- `OrderId` (Guid) - уникальный идентификатор заказа
- `UserId` (int) - ID пользователя
- `ShopId` (int) - ID магазина
- `TotalAmount` (decimal) - общая сумма заказа
- `Status` (string) - статус заказа
- `DeliveryAddress` (string) - адрес доставки
- `CustomerName` (string) - имя клиента
- `CustomerPhone` (string) - телефон клиента
- `CustomerEmail` (string) - email клиента
- `DeliveryNotes` (string?) - заметки к доставке
- `EstimatedDeliveryDate` (DateTime?) - предполагаемая дата доставки
- `ActualDeliveryDate` (DateTime?) - фактическая дата доставки
- `CreatedAt` (DateTime) - дата создания
- `UpdatedAt` (DateTime) - дата обновления

### OrderItem
- `OrderItemId` (Guid) - уникальный идентификатор товара заказа
- `OrderId` (Guid) - ID заказа
- `ProductId` (int) - ID продукта
- `ProductName` (string) - название продукта
- `ProductDescription` (string?) - описание продукта
- `UnitPrice` (decimal) - цена за единицу
- `Quantity` (int) - количество
- `TotalPrice` (decimal) - общая цена
- `ProductImage` (string?) - изображение продукта
- `CreatedAt` (DateTime) - дата создания

## Запуск

### Локально
```bash
cd order-service
dotnet restore
dotnet run
```

### В Docker
```bash
docker build -t order-service .
docker run -p 3000:3000 order-service
```

## База данных

Сервис использует PostgreSQL. Для инициализации базы данных выполните:

```sql
-- Создание базы данных
CREATE DATABASE orderdb;

-- Создание пользователя
CREATE USER order_user WITH PASSWORD 'order_password';

-- Предоставление прав
GRANT ALL PRIVILEGES ON DATABASE orderdb TO order_user;
```

## Тестирование

Используйте файл `test-order.http` для тестирования API endpoints в VS Code или других HTTP клиентах.

## Интеграция с другими сервисами

Order Service интегрируется со следующими сервисами:
- **Users Service** - для получения информации о пользователях
- **Product Service** - для получения информации о продуктах
- **Shop Service** - для получения информации о магазинах
- **Payment Service** - для обработки платежей

## Конфигурация

Основные настройки в `appsettings.json`:
- Порт сервиса: 3000
- База данных: PostgreSQL на localhost:5436
- База данных: orderdb
- Пользователь: order_user
- Пароль: order_password 