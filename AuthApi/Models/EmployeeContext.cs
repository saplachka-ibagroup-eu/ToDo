using AuthApi.Services;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Models;

public class EmployeeContext : DbContext
{
    private readonly IPasswordHasherService _passwordHasherService;


    public DbSet<Employee> Employees { get; set; } = null!;


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>().HasData(
            new Employee
            {
                Id = 1,
                EmployeeName = "Sviatlana",
                Age = 35,
                Speciality = "Developer",
                Password = _passwordHasherService.Hash("12345"),
                CreatedOn = DateTime.Now
    },
             new Employee
             {
                 Id = 2,
                 EmployeeName = "Ihar",
                 Age = 35,
                 Speciality = "Developer",
                 Password = _passwordHasherService.Hash("test123"),
                 CreatedOn = DateTime.Now               
             }
        );
    }

    public EmployeeContext(DbContextOptions<EmployeeContext> options,
        IPasswordHasherService passwordHasherService) : base(options)
    {
        _passwordHasherService = passwordHasherService;
        //Database.EnsureDeleted();
        Database.EnsureCreated();
    }
}
