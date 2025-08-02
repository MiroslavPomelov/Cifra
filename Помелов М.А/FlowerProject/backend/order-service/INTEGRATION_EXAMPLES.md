# Интеграция Order Service с другими сервисами

## Обзор интеграций

Order Service интегрируется со следующими сервисами:

1. **Users Service** - для получения информации о пользователях и их корзинах
2. **Product Service** - для получения информации о продуктах
3. **Shop Service** - для получения информации о магазинах
4. **Payment Service** - для обработки платежей

## Примеры интеграции

### 1. Создание заказа из корзины пользователя

```csharp
// Пример создания заказа из корзины пользователя
public async Task<OrderResponseDto> CreateOrderFromBasket(int userId, CreateOrderFromBasketRequestDto request)
{
    // 1. Получаем информацию о пользователе из Users Service
    var userResponse = await _httpClient.GetAsync($"http://users-service:3000/users/{userId}");
    var user = await userResponse.Content.ReadFromJsonAsync<UserDto>();
    
    // 2. Получаем корзину пользователя
    var basketResponse = await _httpClient.GetAsync($"http://users-service:3000/users/{userId}/basket");
    var basket = await basketResponse.Content.ReadFromJsonAsync<List<UserBasketDto>>();
    
    // 3. Получаем информацию о продуктах из Product Service
    var orderItems = new List<CreateOrderItemRequestDto>();
    foreach (var basketItem in basket)
    {
        var productResponse = await _httpClient.GetAsync($"http://product-service:3000/products/{basketItem.ProductId}");
        var product = await productResponse.Content.ReadFromJsonAsync<ProductDto>();
        
        orderItems.Add(new CreateOrderItemRequestDto
        {
            ProductId = product.Id,
            ProductName = product.Name,
            ProductDescription = product.Description,
            UnitPrice = product.Price,
            Quantity = basketItem.Quantity,
            ProductImage = product.ImageUrl
        });
    }
    
    // 4. Создаем заказ
    var orderRequest = new CreateOrderRequestDto
    {
        UserId = userId,
        ShopId = user.ShopId ?? 1, // Используем магазин пользователя или дефолтный
        TotalAmount = basket.Sum(item => item.Price * item.Quantity),
        DeliveryAddress = request.DeliveryAddress,
        CustomerName = $"{user.FirstName} {user.LastName}",
        CustomerPhone = user.Phone,
        CustomerEmail = user.Email,
        DeliveryNotes = request.DeliveryNotes,
        EstimatedDeliveryDate = request.EstimatedDeliveryDate,
        OrderItems = orderItems
    };
    
    // 5. Сохраняем заказ
    var order = await CreateOrder(orderRequest);
    
    // 6. Очищаем корзину пользователя
    await _httpClient.DeleteAsync($"http://users-service:3000/users/{userId}/basket");
    
    return order;
}
```

### 2. Обработка платежа для заказа

```csharp
// Пример обработки платежа для заказа
public async Task<PaymentResponseDto> ProcessOrderPayment(Guid orderId, PaymentRequestDto paymentRequest)
{
    // 1. Получаем заказ
    var order = await GetOrderById(orderId);
    
    // 2. Создаем платеж в Payment Service
    var paymentRequestDto = new PaymentRequestDto
    {
        Amount = order.TotalAmount,
        CardNumber = paymentRequest.CardNumber,
        CardHolder = paymentRequest.CardHolder,
        Expiry = paymentRequest.Expiry,
        Cvc = paymentRequest.Cvc,
        Currency = "RUB",
        Description = $"Оплата заказа {orderId}",
        Email = order.CustomerEmail
    };
    
    var paymentResponse = await _httpClient.PostAsJsonAsync("http://payment-service:3000/payment", paymentRequestDto);
    var payment = await paymentResponse.Content.ReadFromJsonAsync<PaymentResponseDto>();
    
    // 3. Обновляем статус заказа в зависимости от результата платежа
    if (payment.Success)
    {
        await UpdateOrderStatus(orderId, "confirmed");
    }
    else
    {
        await UpdateOrderStatus(orderId, "cancelled");
    }
    
    return payment;
}
```

### 3. Получение заказов с информацией о продуктах

```csharp
// Пример получения заказов с полной информацией о продуктах
public async Task<List<OrderWithProductsResponseDto>> GetOrdersWithProducts(int userId)
{
    var orders = await GetOrdersByUserId(userId);
    var result = new List<OrderWithProductsResponseDto>();
    
    foreach (var order in orders)
    {
        var orderWithProducts = new OrderWithProductsResponseDto
        {
            OrderId = order.OrderId,
            UserId = order.UserId,
            ShopId = order.ShopId,
            TotalAmount = order.TotalAmount,
            Status = order.Status,
            CustomerName = order.CustomerName,
            CustomerEmail = order.CustomerEmail,
            CustomerPhone = order.CustomerPhone,
            DeliveryAddress = order.DeliveryAddress,
            DeliveryNotes = order.DeliveryNotes,
            EstimatedDeliveryDate = order.EstimatedDeliveryDate,
            ActualDeliveryDate = order.ActualDeliveryDate,
            CreatedAt = order.CreatedAt,
            UpdatedAt = order.UpdatedAt,
            OrderItems = new List<OrderItemWithProductResponseDto>()
        };
        
        // Получаем полную информацию о каждом продукте
        foreach (var orderItem in order.OrderItems)
        {
            var productResponse = await _httpClient.GetAsync($"http://product-service:3000/products/{orderItem.ProductId}");
            var product = await productResponse.Content.ReadFromJsonAsync<ProductDto>();
            
            orderWithProducts.OrderItems.Add(new OrderItemWithProductResponseDto
            {
                OrderItemId = orderItem.OrderItemId,
                ProductId = orderItem.ProductId,
                ProductName = orderItem.ProductName,
                ProductDescription = orderItem.ProductDescription,
                UnitPrice = orderItem.UnitPrice,
                Quantity = orderItem.Quantity,
                TotalPrice = orderItem.TotalPrice,
                ProductImage = orderItem.ProductImage,
                Product = product // Полная информация о продукте
            });
        }
        
        result.Add(orderWithProducts);
    }
    
    return result;
}
```

### 4. Уведомление магазина о новом заказе

```csharp
// Пример уведомления магазина о новом заказе
public async Task NotifyShopAboutNewOrder(Guid orderId)
{
    var order = await GetOrderById(orderId);
    
    // Получаем информацию о магазине
    var shopResponse = await _httpClient.GetAsync($"http://shop-service:3000/shops/{order.ShopId}");
    var shop = await shopResponse.Content.ReadFromJsonAsync<ShopDto>();
    
    // Здесь можно отправить уведомление магазину
    // Например, через email, SMS или push-уведомление
    var notification = new ShopNotificationDto
    {
        ShopId = order.ShopId,
        ShopEmail = shop.Email,
        ShopName = shop.Name,
        OrderId = orderId,
        CustomerName = order.CustomerName,
        CustomerPhone = order.CustomerPhone,
        TotalAmount = order.TotalAmount,
        OrderItems = order.OrderItems,
        DeliveryAddress = order.DeliveryAddress,
        EstimatedDeliveryDate = order.EstimatedDeliveryDate
    };
    
    // Отправляем уведомление (пример)
    await _httpClient.PostAsJsonAsync("http://notification-service:3000/notifications/shop", notification);
}
```

## DTO классы для интеграции

```csharp
public class CreateOrderFromBasketRequestDto
{
    public string DeliveryAddress { get; set; } = string.Empty;
    public string? DeliveryNotes { get; set; }
    public DateTime? EstimatedDeliveryDate { get; set; }
}

public class OrderWithProductsResponseDto : OrderResponseDto
{
    public List<OrderItemWithProductResponseDto> OrderItems { get; set; } = new List<OrderItemWithProductResponseDto>();
}

public class OrderItemWithProductResponseDto : OrderItemResponseDto
{
    public ProductDto? Product { get; set; }
}

public class UserDto
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public int? ShopId { get; set; }
}

public class UserBasketDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public int ShopId { get; set; }
}

public class ShopDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string? Phone { get; set; }
}

public class ShopNotificationDto
{
    public int ShopId { get; set; }
    public string ShopEmail { get; set; } = string.Empty;
    public string ShopName { get; set; } = string.Empty;
    public Guid OrderId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public List<OrderItemResponseDto> OrderItems { get; set; } = new List<OrderItemResponseDto>();
    public string DeliveryAddress { get; set; } = string.Empty;
    public DateTime? EstimatedDeliveryDate { get; set; }
}
```

## Рекомендации по интеграции

1. **Обработка ошибок**: Всегда обрабатывайте ошибки при интеграции с другими сервисами
2. **Таймауты**: Устанавливайте разумные таймауты для HTTP запросов
3. **Кэширование**: Кэшируйте часто запрашиваемые данные
4. **Логирование**: Логируйте все взаимодействия между сервисами
5. **Мониторинг**: Отслеживайте производительность интеграций
6. **Fallback**: Предусматривайте fallback механизмы при недоступности сервисов 