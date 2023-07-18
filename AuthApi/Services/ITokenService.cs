using AuthApi.Models;

namespace AuthApi.Services;

public interface ITokenService
{
   public string GenerateToken(Employee employee);
}
