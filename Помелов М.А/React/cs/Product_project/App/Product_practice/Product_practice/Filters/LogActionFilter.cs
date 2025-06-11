using Microsoft.AspNetCore.Mvc.Filters;
using Product_practice.Utils;

namespace Product_practice.Filters
{
    public class LogActionFilter : IActionFilter
    {
        private readonly FileLogger _logger;

        public LogActionFilter(FileLogger logger)
        {
            _logger = logger;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogInformation($"Request to action: {context.ActionDescriptor.DisplayName}");


        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception != null)
            {
                _logger.LogError($"Error: \"{context.Exception.Message}\"");
            }
            else
            {
                _logger.LogInformation("Route has been handled succesfully");
            }
        }

       
    }
}
