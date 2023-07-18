using AuthApi.Models;
using AuthApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthApi.Controllers;

[Route("auth/[controller]")]
[ApiController]
[Authorize]
public class EmployeeController : Controller
{
    private readonly IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
        
    }

    [HttpPost]
    public async Task<ActionResult<IEnumerable<Employee?>>> FindAll([FromBody] FilterItems? parameters)
    {
        IEnumerable<Employee?> enumerable = await _employeeService.FindAll(parameters?.items);
        return Ok(enumerable);
    }

}
