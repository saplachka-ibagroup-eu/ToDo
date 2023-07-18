using AuthApi.Models;
using AuthApi.Services;
using AuthApi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthApi.Controllers;

[Route("auth")]
[ApiController]
public class AuthController : Controller
{
    private readonly IEmployeeService _employeeService;
    private readonly IPasswordHasherService _passwordHasher;
    private readonly ITokenService _tokenService;


    public AuthController(
    IEmployeeService employeeService,
    IPasswordHasherService passwordHasher,
    ITokenService tokenService)
    {
        _employeeService = employeeService;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<LoginResponseViewModel>> Authenticate(LoginViewModel model)
    {
        Employee? employee = await _employeeService.GetEmployeeWithPasswordByNameAsync(model.Name);

        if (employee is null) return NotFound();
        if (!_passwordHasher.VerifyPassword(employee.Password, model.Password)) return BadRequest();

        string token = _tokenService.GenerateToken(employee);

        var employeeViewModel = new EmployeeViewModel
        {
            Id = employee.Id,
            Name = employee.EmployeeName
        };

        var loginResponseViewModel = new LoginResponseViewModel
        {
            Token = token,
            Data = employeeViewModel
        };

        return Ok(loginResponseViewModel);
    }

    [HttpGet("user")]
    [Authorize]
    public async Task<ActionResult<LoginResponseViewModel>> GetCurrentUser()
    {
        int userId = Int32.Parse(User?.Identity?.Name);
        Employee? employee = await _employeeService.FindByIdAsync(userId);
        return Ok(employee);
    }
}
