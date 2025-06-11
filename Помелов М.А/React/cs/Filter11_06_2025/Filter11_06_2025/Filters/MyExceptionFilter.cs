using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Filter11_06_2025.Filters
{
    public class MyExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            context.Result = new ObjectResult($"Error: \"{context.Exception.Message}\"")
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
        }
    }
}
