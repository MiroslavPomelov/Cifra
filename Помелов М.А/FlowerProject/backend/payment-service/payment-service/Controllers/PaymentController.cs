using Microsoft.AspNetCore.Mvc;
using System;

namespace payment_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : Controller
    {
        // POST /payment
        [HttpPost]
        public IActionResult Pay([FromBody] PaymentRequestDto request)
        {
            // Всегда возвращаем успешную оплату
            return Ok(new PaymentResponseDto
            {
                Success = true,
                Message = "Оплата прошла успешно",
                PaymentId = Guid.NewGuid().ToString()
            });
        }
    }

    // DTO для запроса
    public class PaymentRequestDto
    {
        public decimal Amount { get; set; }
        public string OrderId { get; set; }
        public string CardNumber { get; set; }
        public string CardHolder { get; set; }
        public string Expiry { get; set; }
        public string Cvc { get; set; }
        // ... любые другие поля, которые нужны для теста
    }

    // DTO для ответа
    public class PaymentResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string PaymentId { get; set; }
    }
}
