using AuthApi.Models;

namespace AuthApi.Services;

public interface IEmployeeService
{
    Task<Employee?> GetEmployeeWithPasswordByNameAsync(string name);
    Task<IEnumerable<Employee?>> FindAll(List<FilterItem>? parameters);
    Task<int> UploadImageAsync(int id, IFormFile file);
    Task<Employee?> FindByIdAsync(int name);
}
