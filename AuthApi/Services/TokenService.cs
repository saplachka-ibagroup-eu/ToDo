using AuthApi.Configurations;
using AuthApi.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthApi.Services;

public class TokenService : ITokenService
{
    private readonly JwtTokenOptions _tokenOptions;

    public TokenService(IOptions<JwtTokenOptions> tokenOptions)
    {
        _tokenOptions = tokenOptions.Value;
    }

    public string GenerateToken(Employee employee)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        byte[] key = Encoding.ASCII.GetBytes(_tokenOptions.Key);
        var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature);

        var identity = new ClaimsIdentity(
            new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                new Claim(JwtRegisteredClaimNames.UniqueName, employee.Id.ToString())
            }
        );

        DateTime createdAt = DateTime.Now;
        DateTime expires = createdAt.AddSeconds(_tokenOptions.Seconds);

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Audience = _tokenOptions.Audience,
            Expires = expires,
            Issuer = _tokenOptions.Issuer,
            NotBefore = createdAt,
            SigningCredentials = signingCredentials,
            Subject = identity,
        };

        SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
