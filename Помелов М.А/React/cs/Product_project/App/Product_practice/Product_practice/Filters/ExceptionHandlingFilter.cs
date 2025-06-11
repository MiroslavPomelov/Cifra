using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Product_practice.Utils;

namespace Filter11_06_2025.Filters
{
    public class ExceptionHandlingFilter : IExceptionFilter
    {
        private readonly FileLogger _logger;

        public ExceptionHandlingFilter(FileLogger logger)
        {
            _logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            _logger.LogError($"An error has occured: {context.Exception.Message} ");

            //context.Result = new ObjectResult(new
            //{
            //    error = $"An error has occured: {context.Exception.Message} "
            //});

            context.Result = new JsonResult(new
            {
                error = $"An error has occured: {context.Exception.Message} "
            })
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
        }
    }
}
