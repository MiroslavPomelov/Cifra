using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Auth02_06.Utils
{
    public class TokenService
    {
        private const string _secretKey = "super_secret_key_12345213123123122323232323223233123123213123";
        private const int _tokenExpirationMinutes = 60;

        public string GenerateToken(string username, string role)
        {
            Claim[] claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, role)
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: "example-app",
                audience: "example-app-users",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_tokenExpirationMinutes),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token); 
        }
    }
}
