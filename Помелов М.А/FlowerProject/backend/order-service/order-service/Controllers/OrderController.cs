using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using order_service.Data;
using order_service.Models;
using System;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using order_service.Guards;

namespace order_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    // [Authorize] // Отключено
    // [ServiceFilter(typeof(ServiceAuthGuard))] // Отключено
    public class OrderController : ControllerBase
    {
        private readonly OrderDbContext _context;
        private readonly IDistributedCache _cache;

        public OrderController(OrderDbContext context, IDistributedCache cache)
        {
            _context = context;
            _cache = cache;
        }

        // GET /order/health
        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
        }

        // GET /order - получить все заказы
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                const string cacheKey = "orders:all";
                
                // Пытаемся получить данные из кэша
                var cachedData = await _cache.GetStringAsync(cacheKey);
                if (!string.IsNullOrEmpty(cachedData))
                {
                    var cachedOrders = JsonSerializer.Deserialize<List<OrderResponseDto>>(cachedData);
                    return Ok(cachedOrders);
                }

                var orders = await _context.Orders
                    .Include(o => o.OrderItems)
                    .OrderByDescending(o => o.CreatedAt)
                    .Select(o => new OrderResponseDto
                    {
                        OrderId = o.OrderId.ToString(),
                        UserId = o.UserId,
                        ShopId = o.ShopId,
                        TotalAmount = o.TotalAmount,
                        Status = o.Status,
                        CustomerName = o.CustomerName,
                        CustomerEmail = o.CustomerEmail,
                        CustomerPhone = o.CustomerPhone,
                        DeliveryAddress = o.DeliveryAddress,
                        DeliveryNotes = o.DeliveryNotes,
                        EstimatedDeliveryDate = o.EstimatedDeliveryDate,
                        ActualDeliveryDate = o.ActualDeliveryDate,
                        CreatedAt = o.CreatedAt,
                        UpdatedAt = o.UpdatedAt,
                        OrderItems = o.OrderItems.Select(oi => new OrderItemResponseDto
                        {
                            OrderItemId = oi.OrderItemId.ToString(),
                            ProductId = oi.ProductId,
                            ProductName = oi.ProductName,
                            ProductDescription = oi.ProductDescription,
                            UnitPrice = oi.UnitPrice,
                            Quantity = oi.Quantity,
                            TotalPrice = oi.TotalPrice,
                            ProductImage = oi.ProductImage
                        }).ToList()
                    })
                    .ToListAsync();

                if (!orders.Any())
                {
                    return NotFound(new { message = "Заказы не найдены" });
                }

                // Кэшируем результат на 5 минут
                var cacheOptions = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                };
                await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(orders), cacheOptions);

                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при получении заказов", error = ex.Message });
            }
        }

        // GET /order/{orderId} - получить заказ по ID
        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderById(string orderId)
        {
            try
            {
                if (!Guid.TryParse(orderId, out Guid orderGuid))
                {
                    return BadRequest(new { message = "Неверный формат ID заказа" });
                }

                var cacheKey = $"order:{orderId}";
                
                // получить данные из кэша
                var cachedData = await _cache.GetStringAsync(cacheKey);
                if (!string.IsNullOrEmpty(cachedData))
                {
                    var cachedOrder = JsonSerializer.Deserialize<OrderResponseDto>(cachedData);
                    return Ok(cachedOrder);
                }

                var order = await _context.Orders
                    .Include(o => o.OrderItems)
                    .FirstOrDefaultAsync(o => o.OrderId == orderGuid);

                if (order == null)
                {
                    return NotFound(new { message = "Заказ не найден" });
                }

                var response = new OrderResponseDto
                {
                    OrderId = order.OrderId.ToString(),
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
                    OrderItems = order.OrderItems.Select(oi => new OrderItemResponseDto
                    {
                        OrderItemId = oi.OrderItemId.ToString(),
                        ProductId = oi.ProductId,
                        ProductName = oi.ProductName,
                        ProductDescription = oi.ProductDescription,
                        UnitPrice = oi.UnitPrice,
                        Quantity = oi.Quantity,
                        TotalPrice = oi.TotalPrice,
                        ProductImage = oi.ProductImage
                    }).ToList()
                };

                // Кэшируем результат на 10 мин
                var cacheOptions = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
                };
                await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(response), cacheOptions);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при получении заказа", error = ex.Message });
            }
        }

        // GET /order/user/{userId} - получить заказы пользователя
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetOrdersByUserId(int userId)
        {
            try
            {
                var orders = await _context.Orders
                    .Include(o => o.OrderItems)
                    .Where(o => o.UserId == userId)
                    .OrderByDescending(o => o.CreatedAt)
                    .Select(o => new OrderResponseDto
                    {
                        OrderId = o.OrderId.ToString(),
                        UserId = o.UserId,
                        ShopId = o.ShopId,
                        TotalAmount = o.TotalAmount,
                        Status = o.Status,
                        CustomerName = o.CustomerName,
                        CustomerEmail = o.CustomerEmail,
                        CustomerPhone = o.CustomerPhone,
                        DeliveryAddress = o.DeliveryAddress,
                        DeliveryNotes = o.DeliveryNotes,
                        EstimatedDeliveryDate = o.EstimatedDeliveryDate,
                        ActualDeliveryDate = o.ActualDeliveryDate,
                        CreatedAt = o.CreatedAt,
                        UpdatedAt = o.UpdatedAt,
                        OrderItems = o.OrderItems.Select(oi => new OrderItemResponseDto
                        {
                            OrderItemId = oi.OrderItemId.ToString(),
                            ProductId = oi.ProductId,
                            ProductName = oi.ProductName,
                            ProductDescription = oi.ProductDescription,
                            UnitPrice = oi.UnitPrice,
                            Quantity = oi.Quantity,
                            TotalPrice = oi.TotalPrice,
                            ProductImage = oi.ProductImage
                        }).ToList()
                    })
                    .ToListAsync();

                if (!orders.Any())
                {
                    return NotFound(new { message = "Заказы пользователя не найдены" });
                }

                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при получении заказов пользователя", error = ex.Message });
            }
        }

        // GET /order/shop/{shopId} - получить заказы магазина
        [HttpGet("shop/{shopId}")]
        public async Task<IActionResult> GetOrdersByShopId(int shopId)
        {
            try
            {
                var orders = await _context.Orders
                    .Include(o => o.OrderItems)
                    .Where(o => o.ShopId == shopId)
                    .OrderByDescending(o => o.CreatedAt)
                    .Select(o => new OrderResponseDto
                    {
                        OrderId = o.OrderId.ToString(),
                        UserId = o.UserId,
                        ShopId = o.ShopId,
                        TotalAmount = o.TotalAmount,
                        Status = o.Status,
                        CustomerName = o.CustomerName,
                        CustomerEmail = o.CustomerEmail,
                        CustomerPhone = o.CustomerPhone,
                        DeliveryAddress = o.DeliveryAddress,
                        DeliveryNotes = o.DeliveryNotes,
                        EstimatedDeliveryDate = o.EstimatedDeliveryDate,
                        ActualDeliveryDate = o.ActualDeliveryDate,
                        CreatedAt = o.CreatedAt,
                        UpdatedAt = o.UpdatedAt,
                        OrderItems = o.OrderItems.Select(oi => new OrderItemResponseDto
                        {
                            OrderItemId = oi.OrderItemId.ToString(),
                            ProductId = oi.ProductId,
                            ProductName = oi.ProductName,
                            ProductDescription = oi.ProductDescription,
                            UnitPrice = oi.UnitPrice,
                            Quantity = oi.Quantity,
                            TotalPrice = oi.TotalPrice,
                            ProductImage = oi.ProductImage
                        }).ToList()
                    })
                    .ToListAsync();

                if (!orders.Any())
                {
                    return NotFound(new { message = "Заказы магазина не найдены" });
                }

                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при получении заказов магазина", error = ex.Message });
            }
        }

        // POST /order - создать новый заказ
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var order = new Order
                {
                    OrderId = Guid.NewGuid(),
                    UserId = request.UserId,
                    ShopId = request.ShopId,
                    TotalAmount = request.TotalAmount,
                    Status = "pending",
                    DeliveryAddress = request.DeliveryAddress,
                    CustomerName = request.CustomerName,
                    CustomerPhone = request.CustomerPhone,
                    CustomerEmail = request.CustomerEmail,
                    DeliveryNotes = request.DeliveryNotes,
                    EstimatedDeliveryDate = request.EstimatedDeliveryDate,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                // Добавляем товары заказа
                foreach (var item in request.OrderItems)
                {
                    var orderItem = new OrderItem
                    {
                        OrderItemId = Guid.NewGuid(),
                        OrderId = order.OrderId,
                        ProductId = item.ProductId,
                        ProductName = item.ProductName,
                        ProductDescription = item.ProductDescription,
                        UnitPrice = item.UnitPrice,
                        Quantity = item.Quantity,
                        TotalPrice = item.UnitPrice * item.Quantity,
                        ProductImage = item.ProductImage,
                        CreatedAt = DateTime.UtcNow
                    };
                    order.OrderItems.Add(orderItem);
                }

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                // Инвалидируем кэш
                await _cache.RemoveAsync("orders:all");
                await _cache.RemoveAsync("orders:statistics");

                var response = new OrderResponseDto
                {
                    OrderId = order.OrderId.ToString(),
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
                    OrderItems = order.OrderItems.Select(oi => new OrderItemResponseDto
                    {
                        OrderItemId = oi.OrderItemId.ToString(),
                        ProductId = oi.ProductId,
                        ProductName = oi.ProductName,
                        ProductDescription = oi.ProductDescription,
                        UnitPrice = oi.UnitPrice,
                        Quantity = oi.Quantity,
                        TotalPrice = oi.TotalPrice,
                        ProductImage = oi.ProductImage
                    }).ToList()
                };

                return CreatedAtAction(nameof(GetOrderById), new { orderId = order.OrderId }, response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при создании заказа", error = ex.Message });
            }
        }

        // PUT /order/{orderId}/status - обновить статус заказа
        [HttpPut("{orderId}/status")]
        public async Task<IActionResult> UpdateOrderStatus(string orderId, [FromBody] UpdateOrderStatusRequestDto request)
        {
            try
            {
                if (!Guid.TryParse(orderId, out Guid orderGuid))
                {
                    return BadRequest(new { message = "Неверный формат ID заказа" });
                }

                var order = await _context.Orders.FindAsync(orderGuid);
                if (order == null)
                {
                    return NotFound(new { message = "Заказ не найден" });
                }

                // Валидация статуса
                var validStatuses = new[] { "pending", "confirmed", "processing", "shipped", "delivered", "cancelled" };
                if (!validStatuses.Contains(request.Status.ToLower()))
                {
                    return BadRequest(new { message = "Неверный статус заказа" });
                }

                order.Status = request.Status.ToLower();
                order.UpdatedAt = DateTime.UtcNow;

                // Если статус "delivered", устанавливаем дату доставки
                if (request.Status.ToLower() == "delivered")
                {
                    order.ActualDeliveryDate = DateTime.UtcNow;
                }

                await _context.SaveChangesAsync();

                // Инвалидируем кэш
                await _cache.RemoveAsync("orders:all");
                await _cache.RemoveAsync("orders:statistics");
                await _cache.RemoveAsync($"order:{orderId}");

                return Ok(new { message = "Статус заказа успешно обновлен", status = order.Status });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при обновлении статуса заказа", error = ex.Message });
            }
        }

        // DELETE /order/{orderId} - удалить заказ
        [HttpDelete("{orderId}")]
        public async Task<IActionResult> DeleteOrder(string orderId)
        {
            try
            {
                if (!Guid.TryParse(orderId, out Guid orderGuid))
                {
                    return BadRequest(new { message = "Неверный формат ID заказа" });
                }

                var order = await _context.Orders.FindAsync(orderGuid);
                if (order == null)
                {
                    return NotFound(new { message = "Заказ не найден" });
                }

                // Проверяем, можно ли удалить заказ (только если он в статусе pending или cancelled)
                if (order.Status != "pending" && order.Status != "cancelled")
                {
                    return BadRequest(new { message = "Нельзя удалить заказ в текущем статусе" });
                }

                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();

                // Инвалидируем кэш
                await _cache.RemoveAsync("orders:all");
                await _cache.RemoveAsync("orders:statistics");
                await _cache.RemoveAsync($"order:{orderId}");

                return Ok(new { message = "Заказ успешно удален" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при удалении заказа", error = ex.Message });
            }
        }

        // GET /order/statistics - получить статистику заказов
        [HttpGet("statistics")]
        public async Task<IActionResult> GetOrderStatistics()
        {
            try
            {
                const string cacheKey = "orders:statistics";
                
                //получить данные из кэша
                var cachedData = await _cache.GetStringAsync(cacheKey);
                if (!string.IsNullOrEmpty(cachedData))
                {
                    var cachedStatistics = JsonSerializer.Deserialize<OrderStatisticsDto>(cachedData);
                    return Ok(cachedStatistics);
                }

                var totalOrders = await _context.Orders.CountAsync();
                var pendingOrders = await _context.Orders.CountAsync(o => o.Status == "pending");
                var confirmedOrders = await _context.Orders.CountAsync(o => o.Status == "confirmed");
                var processingOrders = await _context.Orders.CountAsync(o => o.Status == "processing");
                var shippedOrders = await _context.Orders.CountAsync(o => o.Status == "shipped");
                var deliveredOrders = await _context.Orders.CountAsync(o => o.Status == "delivered");
                var cancelledOrders = await _context.Orders.CountAsync(o => o.Status == "cancelled");

                var totalRevenue = await _context.Orders
                    .Where(o => o.Status == "delivered")
                    .SumAsync(o => o.TotalAmount);

                var averageOrderValue = await _context.Orders
                    .Where(o => o.Status == "delivered")
                    .AverageAsync(o => o.TotalAmount);

                var statistics = new OrderStatisticsDto
                {
                    TotalOrders = totalOrders,
                    PendingOrders = pendingOrders,
                    ConfirmedOrders = confirmedOrders,
                    ProcessingOrders = processingOrders,
                    ShippedOrders = shippedOrders,
                    DeliveredOrders = deliveredOrders,
                    CancelledOrders = cancelledOrders,
                    TotalRevenue = totalRevenue,
                    AverageOrderValue = averageOrderValue,
                    Timestamp = DateTime.UtcNow
                };

                // Кэшируем результат на 15 минут
                var cacheOptions = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(15)
                };
                await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(statistics), cacheOptions);

                return Ok(statistics);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при получении статистики", error = ex.Message });
            }
        }
    }

    // DTO классы
    public class CreateOrderRequestDto
    {
        [Required(ErrorMessage = "ID пользователя обязателен")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "ID магазина обязателен")]
        public int ShopId { get; set; }

        [Required(ErrorMessage = "Общая сумма обязательна")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Сумма должна быть больше 0")]
        public decimal TotalAmount { get; set; }

        [Required(ErrorMessage = "Адрес доставки обязателен")]
        public string DeliveryAddress { get; set; } = string.Empty;

        [Required(ErrorMessage = "Имя клиента обязательно")]
        public string CustomerName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Телефон клиента обязателен")]
        public string CustomerPhone { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email клиента обязателен")]
        [EmailAddress(ErrorMessage = "Неверный формат email")]
        public string CustomerEmail { get; set; } = string.Empty;

        public string? DeliveryNotes { get; set; }

        public DateTime? EstimatedDeliveryDate { get; set; }

        [Required(ErrorMessage = "Товары заказа обязательны")]
        public List<CreateOrderItemRequestDto> OrderItems { get; set; } = new List<CreateOrderItemRequestDto>();
    }

    public class CreateOrderItemRequestDto
    {
        [Required(ErrorMessage = "ID продукта обязателен")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Название продукта обязательно")]
        public string ProductName { get; set; } = string.Empty;

        public string? ProductDescription { get; set; }

        [Required(ErrorMessage = "Цена за единицу обязательна")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Цена должна быть больше 0")]
        public decimal UnitPrice { get; set; }

        [Required(ErrorMessage = "Количество обязательно")]
        [Range(1, int.MaxValue, ErrorMessage = "Количество должно быть больше 0")]
        public int Quantity { get; set; }

        public string? ProductImage { get; set; }
    }

    public class UpdateOrderStatusRequestDto
    {
        [Required(ErrorMessage = "Статус обязателен")]
        public string Status { get; set; } = string.Empty;
    }

    public class OrderResponseDto
    {
        public string OrderId { get; set; } = string.Empty;
        public int UserId { get; set; }
        public int ShopId { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string DeliveryAddress { get; set; } = string.Empty;
        public string? DeliveryNotes { get; set; }
        public DateTime? EstimatedDeliveryDate { get; set; }
        public DateTime? ActualDeliveryDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<OrderItemResponseDto> OrderItems { get; set; } = new List<OrderItemResponseDto>();
    }

    public class OrderItemResponseDto
    {
        public string OrderItemId { get; set; } = string.Empty;
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string? ProductDescription { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public string? ProductImage { get; set; }
    }

    public class OrderStatisticsDto
    {
        public int TotalOrders { get; set; }
        public int PendingOrders { get; set; }
        public int ConfirmedOrders { get; set; }
        public int ProcessingOrders { get; set; }
        public int ShippedOrders { get; set; }
        public int DeliveredOrders { get; set; }
        public int CancelledOrders { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal AverageOrderValue { get; set; }
        public DateTime Timestamp { get; set; }
    }
} 