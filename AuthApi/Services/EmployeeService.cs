using AuthApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Linq.Expressions;

namespace AuthApi.Services;

public class EmployeeService : IEmployeeService
{
    private readonly EmployeeContext _context;

    public EmployeeService(EmployeeContext context)
    {
        _context = context;
    }

    public Task<Employee?> GetEmployeeWithPasswordByNameAsync(string name)
    {
        return _context.Employees
           .Where(e => e.EmployeeName == name)
           .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Employee?>> FindAll(List<FilterItem>? parameters)
    {

        if (!parameters.IsNullOrEmpty())
        {
            Expression<Func<Employee, bool>>? predicate = ExpressionBuilder.Build<Employee>(parameters);
            if (predicate != null)
            {
                return await _context.Employees.Where(predicate)
                 .ToListAsync();
            }
        }
        return await _context.Employees.ToListAsync();

    }

    public Task<Employee?> FindEmployeeAsync(Expression<Func<Employee, bool>> predicate)
    {
        return _context.Employees.FirstOrDefaultAsync(predicate);
    }

    public IQueryable<Employee> GetAll(Expression<Func<Employee, bool>> predicate)
    {
        return _context.Employees.Where(predicate);
    }

    public async Task<int> UploadImageAsync(int id, IFormFile file)
    {
        var employee = new Employee { Id = id, Avatar = ImageUtils.ToBase64String(file) };
        _context.Attach(employee);
        _context.Entry(employee).Property(r => r.Avatar).IsModified = true;
                
        return await _context.SaveChangesAsync();
    }

    public Task<Employee?> FindByIdAsync(int id)
    {
        return _context.Employees.FindAsync(id).AsTask();
    }
}
