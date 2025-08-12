using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using payment_service.Data;
using payment_service.Models;
using System;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace payment_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentDbContext _context;
        private readonly IDistributedCache _cache;

        public PaymentController(PaymentDbContext context, IDistributedCache cache)
        {
            _context = context;
            _cache = cache;
        }

        // такой маршгрут бдет GET /payment/health
        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
        }

        // такой маршгрут бдет GET /payment - получить все платежи
        [HttpGet]
        public async Task<IActionResult> GetAllPayments()
        {
            try
            {
                const string cacheKey = "payments:all";
                
                // Данные из кэша
                var cachedData = await _cache.GetStringAsync(cacheKey);
                if (!string.IsNullOrEmpty(cachedData))
                {
                    var cachedPayments = JsonSerializer.Deserialize<List<PaymentResponseDto>>(cachedData);
                    return Ok(cachedPayments);
                }

                var payments = await _context.Payments
                    .OrderByDescending(p => p.CreatedAt)
                    .Select(p => new PaymentResponseDto
                    {
                        Success = p.Status == "completed" || p.Status == "created",
                        PaymentId = p.PaymentId.ToString(),
                        Status = p.Status,
                        Message = p.Status == "completed" ? "Payment completed successfully" : p.Status,
                        Amount = p.Amount,
                        Currency = p.Currency,
                        Description = p.Description,
                        Email = p.Email,
                        Timestamp = p.CreatedAt
                    })
                    .ToListAsync();

                if (!payments.Any())
                {
                    return NotFound(new { message = "Платежи не найдены" });
                }

                // Кэширую
                var cacheOptions = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                };
                await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(payments), cacheOptions);

                return Ok(payments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при получении платежей", error = ex.Message });
            }
        }

        // такой маршгрут бдет GET /payment/{paymentId} - получить платеж по ID
        [HttpGet("{paymentId}")]
        public async Task<IActionResult> GetPaymentById(string paymentId)
        {
            try
            {
                if (!Guid.TryParse(paymentId, out Guid paymentGuid))
                {
                    return BadRequest(new { message = "Неверный формат ID платежа" });
                }

                var cacheKey = $"payment:{paymentId}";
                
                // Данные из кэша
                var cachedData = await _cache.GetStringAsync(cacheKey);
                if (!string.IsNullOrEmpty(cachedData))
                {
                    var cachedPayment = JsonSerializer.Deserialize<PaymentResponseDto>(cachedData);
                    return Ok(cachedPayment);
                }

                var payment = await _context.Payments
                    .FirstOrDefaultAsync(p => p.PaymentId == paymentGuid);

                if (payment == null)
                {
                    return NotFound(new { message = "Платеж не найден" });
                }

                var response = new PaymentResponseDto
                {
                    Success = payment.Status == "completed" || payment.Status == "created",
                    PaymentId = payment.PaymentId.ToString(),
                    Status = payment.Status,
                    Message = payment.Status == "completed" ? "Payment completed successfully" : payment.Status,
                    Amount = payment.Amount,
                    Currency = payment.Currency,
                    Description = payment.Description,
                    Email = payment.Email,
                    Timestamp = payment.CreatedAt
                };

                // Кэширую
                var cacheOptions = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
                };
                await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(response), cacheOptions);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при получении платежа", error = ex.Message });
            }
        }

        // такой маршгрут бдет POST /payment - создать новый платеж
        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] PaymentRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Неверные данные платежа", errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });
                }

                // Валидация номера карты
                if (string.IsNullOrEmpty(request.CardNumber) || request.CardNumber.Length < 13 || request.CardNumber.Length > 19)
                {
                    return BadRequest(new { message = "Неверный номер карты" });
                }

                // Валидация CVC
                if (string.IsNullOrEmpty(request.Cvc) || request.Cvc.Length < 3 || request.Cvc.Length > 4)
                {
                    return BadRequest(new { message = "Неверный CVC код" });
                }

                // Валидация срока действия
                if (string.IsNullOrEmpty(request.Expiry) || !IsValidExpiry(request.Expiry))
                {
                    return BadRequest(new { message = "Неверный срок действия карты" });
                }

                // Валидация суммы
                if (request.Amount <= 0)
                {
                    return BadRequest(new { message = "Сумма должна быть больше нуля" });
                }

                // Симуляция обработки платежа
                var success = SimulatePaymentProcessing(request);
                var status = success ? "completed" : "failed";

                var payment = new Payment
                {
                    PaymentId = Guid.NewGuid(),
                    Amount = request.Amount,
                    Status = status,
                    CardNumber = MaskCardNumber(request.CardNumber), 
                    CardHolder = request.CardHolder,
                    Expiry = request.Expiry,
                    Cvc = "***", // Не сохраняем CVC
                    Currency = request.Currency ?? "RUB",
                    Description = request.Description ?? string.Empty,
                    Email = request.Email ?? string.Empty,
                    CreatedAt = DateTime.UtcNow
                };

                await _context.Payments.AddAsync(payment);
                await _context.SaveChangesAsync();

               
                await _cache.RemoveAsync("payments:all");

                var response = new PaymentResponseDto
                {
                    Success = success,
                    PaymentId = payment.PaymentId.ToString(),
                    Status = payment.Status,
                    Message = success ? "Платеж обработан успешно!" : "Ошибка обработки платежа",
                    Amount = payment.Amount,
                    Currency = payment.Currency,
                    Description = payment.Description,
                    Email = payment.Email,
                    Timestamp = payment.CreatedAt
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при создании платежа", error = ex.Message });
            }
        }

        // такой маршгрут бдет POST /payment/validate-card - валидация данных карты
        [HttpPost("validate-card")]
        public IActionResult ValidateCard([FromBody] CardValidationRequestDto request)
        {
            try
            {
                var validationResult = new CardValidationResponseDto
                {
                    IsValid = true,
                    Errors = new List<string>(),
                    Timestamp = DateTime.UtcNow
                };

                // Проверка карты
                if (string.IsNullOrEmpty(request.CardNumber))
                {
                    validationResult.IsValid = false;
                    validationResult.Errors.Add("Номер карты обязателен");
                }
                else if (request.CardNumber.Length < 13 || request.CardNumber.Length > 19)
                {
                    validationResult.IsValid = false;
                    validationResult.Errors.Add("Неверная длина номера карты");
                }

                // Проверка CVC
                if (string.IsNullOrEmpty(request.Cvc))
                {
                    validationResult.IsValid = false;
                    validationResult.Errors.Add("CVC код обязателен");
                }
                else if (request.Cvc.Length < 3 || request.Cvc.Length > 4)
                {
                    validationResult.IsValid = false;
                    validationResult.Errors.Add("Неверная длина CVC кода");
                }

                // Проверка срока действия
                if (string.IsNullOrEmpty(request.Expiry))
                {
                    validationResult.IsValid = false;
                    validationResult.Errors.Add("Срок действия обязателен");
                }
                else if (!IsValidExpiry(request.Expiry))
                {
                    validationResult.IsValid = false;
                    validationResult.Errors.Add("Неверный формат срока действия (MM/YY)");
                }

                if (validationResult.IsValid && !string.IsNullOrEmpty(request.CardNumber))
                {
                    validationResult.CardType = DetermineCardType(request.CardNumber);
                }

                return Ok(validationResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при валидации карты", error = ex.Message });
            }
        }

        // такой маршгрут бдет GET /payment/statistics - статистика платежей
        [HttpGet("statistics")]
        public async Task<IActionResult> GetPaymentStatistics()
        {
            try
            {
                const string cacheKey = "payments:statistics";
                
                // такой маршгрут бдет Пытаемся получить данные из кэша
                var cachedData = await _cache.GetStringAsync(cacheKey);
                if (!string.IsNullOrEmpty(cachedData))
                {
                    var cachedStatistics = JsonSerializer.Deserialize<object>(cachedData);
                    return Ok(cachedStatistics);
                }

                var totalPayments = await _context.Payments.CountAsync();
                var successfulPayments = await _context.Payments.CountAsync(p => p.Status == "completed");
                var failedPayments = await _context.Payments.CountAsync(p => p.Status == "failed");
                var totalAmount = await _context.Payments.Where(p => p.Status == "completed").SumAsync(p => p.Amount);

                var statistics = new
                {
                    TotalPayments = totalPayments,
                    SuccessfulPayments = successfulPayments,
                    FailedPayments = failedPayments,
                    SuccessRate = totalPayments > 0 ? (double)successfulPayments / totalPayments * 100 : 0,
                    TotalAmount = totalAmount,
                    AverageAmount = successfulPayments > 0 ? totalAmount / successfulPayments : 0,
                    Timestamp = DateTime.UtcNow
                };

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

        // такой маршгрут бдет DELETE /payment/{paymentId} - удалить платеж (для административных целей)
        [HttpDelete("{paymentId}")]
        public async Task<IActionResult> DeletePayment(string paymentId)
        {
            try
            {
                if (!Guid.TryParse(paymentId, out Guid paymentGuid))
                {
                    return BadRequest(new { message = "Неверный формат ID платежа" });
                }

                var payment = await _context.Payments
                    .FirstOrDefaultAsync(p => p.PaymentId == paymentGuid);

                if (payment == null)
                {
                    return NotFound(new { message = "Платеж не найден" });
                }

                _context.Payments.Remove(payment);
                await _context.SaveChangesAsync();

                await _cache.RemoveAsync("payments:all");
                await _cache.RemoveAsync("payments:statistics");
                await _cache.RemoveAsync($"payment:{paymentId}");

                return Ok(new { message = "Платеж успешно удален" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при удалении платежа", error = ex.Message });
            }
        }

        private bool SimulatePaymentProcessing(PaymentRequestDto request)
        {
            var random = new Random();

            return random.Next(1, 101) <= 90;
        }

        private bool IsValidExpiry(string expiry)
        {
            try
            {
                if (expiry.Length != 5 || expiry[2] != '/')
                    return false;

                var month = int.Parse(expiry.Substring(0, 2));
                var year = int.Parse(expiry.Substring(3, 2));

                if (month < 1 || month > 12)
                    return false;

                var currentYear = DateTime.Now.Year % 100;
                var currentMonth = DateTime.Now.Month;

                if (year < currentYear || (year == currentYear && month < currentMonth))
                    return false;

                return true;
            }
            catch
            {
                return false;
            }
        }

        private string MaskCardNumber(string cardNumber)
        {
            if (string.IsNullOrEmpty(cardNumber) || cardNumber.Length < 4)
                return cardNumber;

            return cardNumber.Substring(0, 4) + "****" + cardNumber.Substring(cardNumber.Length - 4);
        }

        private string DetermineCardType(string cardNumber)
        {
            if (string.IsNullOrEmpty(cardNumber))
                return "Unknown";

            if (cardNumber.StartsWith("4"))
                return "Visa";
            if (cardNumber.StartsWith("5"))
                return "MasterCard";
            if (cardNumber.StartsWith("34") || cardNumber.StartsWith("37"))
                return "American Express";
            if (cardNumber.StartsWith("6"))
                return "Discover";

            return "Unknown";
        }
    }

    // DTO потом вынести отдельно
    public class PaymentRequestDto
    {
        [Required(ErrorMessage = "Сумма обязательна")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Сумма должна быть больше нуля")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "Номер карты обязателен")]
        [StringLength(19, MinimumLength = 13, ErrorMessage = "Номер карты должен содержать от 13 до 19 цифр")]
        public string CardNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Имя держателя карты обязательно")]
        public string CardHolder { get; set; } = string.Empty;

        [Required(ErrorMessage = "Срок действия обязателен")]
        [RegularExpression(@"^(0[1-9]|1[0-2])\/([0-9]{2})$", ErrorMessage = "Формат срока действия: MM/YY")]
        public string Expiry { get; set; } = string.Empty;

        [Required(ErrorMessage = "CVC код обязателен")]
        [StringLength(4, MinimumLength = 3, ErrorMessage = "CVC код должен содержать 3-4 цифры")]
        public string Cvc { get; set; } = string.Empty;

        public string Currency { get; set; } = "RUB";
        public string Description { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class PaymentResponseDto
    {
        public bool Success { get; set; }
        public string PaymentId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
    }

    public class CardValidationRequestDto
    {
        public string? CardNumber { get; set; }
        public string? Cvc { get; set; }
        public string? Expiry { get; set; }
        public string? CardHolder { get; set; }
    }

    public class CardValidationResponseDto
    {
        public bool IsValid { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
        public string? CardType { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
