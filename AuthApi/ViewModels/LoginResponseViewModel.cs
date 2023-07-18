namespace AuthApi.ViewModels;

public class LoginResponseViewModel
{
    public string? Token { get; set; }
    public EmployeeViewModel? Data { get; set; }
}
