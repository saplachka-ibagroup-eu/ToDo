using AuthApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthApi.Controllers;

[Route("auth/[controller]")]
[ApiController]
[Authorize]
public class ImageController : Controller
{
    private readonly IEmployeeService _employeeService;

    public ImageController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [HttpPost]
    public async Task<ActionResult> UploadImage([FromForm] IFormFile file)
    {
        int userId = int.Parse(User?.Identity?.Name);
        await _employeeService.UploadImageAsync(userId, file);
        return NoContent();
    }

}
