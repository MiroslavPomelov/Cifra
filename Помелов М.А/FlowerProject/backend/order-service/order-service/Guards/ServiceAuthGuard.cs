using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System;
using System.Text;

namespace order_service.Guards
{
    public class ServiceAuthGuard : IAuthorizationFilter
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<ServiceAuthGuard> _logger;
        private readonly string[] _publicEndpoints = { "/health" };

        public ServiceAuthGuard(IConfiguration configuration, ILogger<ServiceAuthGuard> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var request = context.HttpContext.Request;
            var url = request.Path.Value;

            _logger.LogInformation($"ServiceAuthGuard: Processing request to {url}");

            // Логируем все заголовки для отладки
            _logger.LogInformation("ServiceAuthGuard: All headers:");
            foreach (var header in request.Headers)
            {
                _logger.LogInformation($"  {header.Key}: {header.Value}");
            }

            // Пропускаем публичные endpoints
            if (IsPublicEndpoint(url))
            {
                _logger.LogInformation($"ServiceAuthGuard: Public endpoint accessed: {url}");
                return;
            }

            // Проверяем JWT токен пользователя
            var authHeader = request.Headers["Authorization"].FirstOrDefault();
            if (!string.IsNullOrEmpty(authHeader))
            {
                _logger.LogInformation($"ServiceAuthGuard: Authorization header found: {authHeader.Substring(0, Math.Min(50, authHeader.Length))}...");
                
                if (authHeader.StartsWith("Bearer "))
                {
                    var token = authHeader.Substring("Bearer ".Length);
                    _logger.LogInformation($"ServiceAuthGuard: User JWT detected, length: {token.Length}");
                    
                    // Проверяем формат токена
                    if (token.Contains("."))
                    {
                        _logger.LogInformation("ServiceAuthGuard: JWT token format is valid (contains dots)");
                        var dotCount = token.Count(c => c == '.');
                        _logger.LogInformation($"ServiceAuthGuard: JWT token contains {dotCount} dots");
                        
                        // Валидируем JWT токен
                        try
                        {
                            _logger.LogInformation($"ServiceAuthGuard: Raw token received: {token}");
                            _logger.LogInformation($"ServiceAuthGuard: Token length: {token.Length}");
                            
                            // Проверяем, не поврежден ли токен
                            if (token.Contains(" ") || token.Contains("\n") || token.Contains("\r"))
                            {
                                _logger.LogWarning("ServiceAuthGuard: Token contains whitespace or newlines, cleaning...");
                                token = token.Trim().Replace(" ", "").Replace("\n", "").Replace("\r", "");
                                _logger.LogInformation($"ServiceAuthGuard: Cleaned token: {token}");
                            }
                            
                            var jwtKey = _configuration["Jwt:Key"];
                            _logger.LogInformation($"ServiceAuthGuard: Using JWT key: {jwtKey.Substring(0, Math.Min(10, jwtKey.Length))}...");
                            
                            var tokenHandler = new JwtSecurityTokenHandler();
                            var key = Encoding.UTF8.GetBytes(jwtKey);
                            
                            var validationParameters = new TokenValidationParameters
                            {
                                ValidateIssuerSigningKey = true,
                                IssuerSigningKey = new SymmetricSecurityKey(key),
                                ValidateIssuer = false,
                                ValidateAudience = false,
                                ValidateLifetime = true,
                                ClockSkew = TimeSpan.Zero
                            };
                            
                            var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                            _logger.LogInformation($"ServiceAuthGuard: JWT token validated successfully for user: {principal.Identity?.Name}");
                            
                            // Если токен валиден, пропускаем запрос
                            return;
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError($"ServiceAuthGuard: JWT token validation failed: {ex.Message}");
                            _logger.LogError($"ServiceAuthGuard: Exception type: {ex.GetType().Name}");
                            _logger.LogError($"ServiceAuthGuard: Stack trace: {ex.StackTrace}");
                            context.Result = new UnauthorizedObjectResult(new { message = "Invalid JWT token" });
                            return;
                        }
                    }
                    else
                    {
                        _logger.LogWarning("ServiceAuthGuard: JWT token format is invalid (no dots)");
                        _logger.LogWarning($"ServiceAuthGuard: Token content: {token}");
                    }
                }
                else
                {
                    _logger.LogWarning($"ServiceAuthGuard: Authorization header doesn't start with 'Bearer ': {authHeader}");
                }
            }
            else
            {
                _logger.LogInformation("ServiceAuthGuard: No Authorization header found, checking for service token");
            }

            // Если нет JWT, проверяем межсервисный токен
            var serviceToken = request.Headers["envservicetoken"].FirstOrDefault();
            var validServiceToken = _configuration["ENV_TOKEN"];

            _logger.LogInformation($"ServiceAuthGuard: No JWT, checking service token. Provided: {serviceToken}, Valid: {validServiceToken}");

            if (string.IsNullOrEmpty(serviceToken))
            {
                _logger.LogWarning("ServiceAuthGuard: No service token provided");
                context.Result = new UnauthorizedObjectResult(new { message = "Service token required" });
                return;
            }

            if (serviceToken != validServiceToken)
            {
                _logger.LogWarning($"ServiceAuthGuard: Invalid service token. Expected: {validServiceToken}, Got: {serviceToken}");
                context.Result = new UnauthorizedObjectResult(new { message = "Invalid service token" });
                return;
            }

            _logger.LogInformation("ServiceAuthGuard: Service token validated successfully");
        }

        private bool IsPublicEndpoint(string url)
        {
            return _publicEndpoints.Any(endpoint => url.StartsWith(endpoint, StringComparison.OrdinalIgnoreCase));
        }
    }
}
