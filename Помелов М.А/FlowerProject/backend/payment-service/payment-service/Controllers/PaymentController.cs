using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic; // Added for List<string>

namespace payment_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : Controller
    {
        // GET /payment/health
        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
        }

        // POST /payment
        [HttpPost]
        public IActionResult Pay([FromBody] PaymentRequestDto request)
        {
            // Валидация входных данных
            if (!ModelState.IsValid)
            {
                return BadRequest(new PaymentResponseDto
                {
                    Success = false,
                    Message = "Неверные данные платежа",
                    PaymentId = null
                });
            }

            // Валидация номера карты (простая проверка длины)
            if (string.IsNullOrEmpty(request.CardNumber) || request.CardNumber.Length < 13 || request.CardNumber.Length > 19)
            {
                return BadRequest(new PaymentResponseDto
                {
                    Success = false,
                    Message = "Неверный номер карты",
                    PaymentId = null
                });
            }

            // Валидация CVC
            if (string.IsNullOrEmpty(request.Cvc) || request.Cvc.Length < 3 || request.Cvc.Length > 4)
            {
                return BadRequest(new PaymentResponseDto
                {
                    Success = false,
                    Message = "Неверный CVC код",
                    PaymentId = null
                });
            }

            // Валидация срока действия
            if (string.IsNullOrEmpty(request.Expiry) || !IsValidExpiry(request.Expiry))
            {
                return BadRequest(new PaymentResponseDto
                {
                    Success = false,
                    Message = "Неверный срок действия карты",
                    PaymentId = null
                });
            }

            // Валидация суммы
            if (request.Amount <= 0)
            {
                return BadRequest(new PaymentResponseDto
                {
                    Success = false,
                    Message = "Сумма должна быть больше нуля",
                    PaymentId = null
                });
            }

            // Симуляция обработки платежа
            var paymentId = Guid.NewGuid().ToString();
            var success = SimulatePaymentProcessing(request);

            return Ok(new PaymentResponseDto
            {
                Success = success,
                Message = success ? "Оплата прошла успешно!" : "Ошибка обработки платежа",
                PaymentId = success ? paymentId : null
            });
        }

        // GET /payment/{paymentId}
        [HttpGet("{paymentId}")]
        public IActionResult GetPaymentStatus(string paymentId)
        {
            if (string.IsNullOrEmpty(paymentId))
            {
                return BadRequest(new { message = "ID платежа обязателен" });
            }

            // Симуляция получения статуса платежа
            var status = SimulatePaymentStatus(paymentId);

            return Ok(new
            {
                PaymentId = paymentId,
                Status = status,
                Timestamp = DateTime.UtcNow
            });
        }

        // POST /payment/validate-card
        [HttpPost("validate-card")]
        public IActionResult ValidateCard([FromBody] CardValidationRequestDto request)
        {
            var validationResult = new CardValidationResponseDto
            {
                IsValid = true,
                Errors = new List<string>()
            };

            // Проверка номера карты
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

            return Ok(validationResult);
        }

        private bool SimulatePaymentProcessing(PaymentRequestDto request)
        {
            // Симуляция различных сценариев
            var random = new Random();
            
            // 90% успешных платежей
            if (random.Next(1, 101) <= 90)
            {
                return true;
            }

            // 10% неуспешных платежей
            return false;
        }

        private string SimulatePaymentStatus(string paymentId)
        {
            // Симуляция статуса платежа
            var random = new Random();
            var statuses = new[] { "completed", "pending", "failed", "processing" };
            return statuses[random.Next(statuses.Length)];
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
    }

    // Запрос на платеж
    public class PaymentRequestDto
    {
        [Required(ErrorMessage = "Сумма обязательна")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Сумма должна быть больше нуля")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "ID заказа обязателен")]
        public string? OrderId { get; set; }

        [Required(ErrorMessage = "Номер карты обязателен")]
        [StringLength(19, MinimumLength = 13, ErrorMessage = "Номер карты должен содержать от 13 до 19 цифр")]
        public string? CardNumber { get; set; }

        [Required(ErrorMessage = "Имя держателя карты обязательно")]
        public string? CardHolder { get; set; }

        [Required(ErrorMessage = "Срок действия обязателен")]
        [RegularExpression(@"^(0[1-9]|1[0-2])\/([0-9]{2})$", ErrorMessage = "Формат срока действия: MM/YY")]
        public string? Expiry { get; set; }

        [Required(ErrorMessage = "CVC код обязателен")]
        [StringLength(4, MinimumLength = 3, ErrorMessage = "CVC код должен содержать 3-4 цифры")]
        public string? Cvc { get; set; }

        // Дополнительные поля
        public string? Currency { get; set; } = "RUB";
        public string? Description { get; set; }
        public string? Email { get; set; }
    }

    // Ответ на платеж
    public class PaymentResponseDto
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public string? PaymentId { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

    // Запрос на валидацию карты
    public class CardValidationRequestDto
    {
        public string? CardNumber { get; set; }
        public string? Cvc { get; set; }
        public string? Expiry { get; set; }
        public string? CardHolder { get; set; }
    }

    // Ответ на валидацию карты
    public class CardValidationResponseDto
    {
        public bool IsValid { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
        public string? CardType { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
