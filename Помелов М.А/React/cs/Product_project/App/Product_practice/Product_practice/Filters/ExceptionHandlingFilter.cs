using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Product_practice.Utils;

namespace Product_practice.Filters
{
    public class ExceptionHandlingFilter : IExceptionFilter
    {
        private readonly FileLogger<ExceptionHandlingFilter> _logger;

        public ExceptionHandlingFilter(FileLogger<ExceptionHandlingFilter> logger)
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
