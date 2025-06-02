using Auth02_06.Utils;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace Auth02_06.Controllers
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Role { get; set; }
    }

    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly TokenService _tokenService;

        public AuthController()
        {
            _tokenService = new TokenService();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request.Username == "guest" && request.Role == "guest")
            {
                var token = _tokenService.GenerateToken(request.Role, "guest");
                return Ok(new { token });
            }

            if (request.Username == "reader" && request.Role == "reader")
            {
                var token = _tokenService.GenerateToken(request.Role, "guest");
                return Ok(new { token });
            }

            if (request.Username == "librarian" && request.Role == "librarian")
            {
                var token = _tokenService.GenerateToken(request.Role, "guest");
                return Ok(new { token });
            }

            return Unauthorized("Not valid auth token");
        }
    }
}
