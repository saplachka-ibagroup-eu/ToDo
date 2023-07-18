using System.ComponentModel.DataAnnotations;
namespace webapi.Models;

public class TodoItem
{
    [Key]
    public int Key { get; set; }
    public string? Name { get; set; }

}


