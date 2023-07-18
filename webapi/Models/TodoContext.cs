using Microsoft.EntityFrameworkCore;

namespace webapi.Models;

public class TodoContext : DbContext
{
    public DbSet<TodoItem> TodoItems { get; set; } = null!;

    public TodoContext(DbContextOptions<TodoContext> options) : base(options)
    {
        // Database.EnsureDeleted();
        Database.EnsureCreated();
    }
}