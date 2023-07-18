namespace AuthApi.Services;

public interface IPasswordHasherService
{
   public string Hash(string password);
   public bool VerifyPassword(string hash, string password);

}
