using System.Text.Json.Serialization;

namespace AuthApi.Models;

public class Employee
{
    public int Id { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    [JsonIgnore]
    public string? Password { get; set; }

    public int Age { get; set; }

    public string? Speciality { get; set; }
    public string? Avatar { get; set; }
    public DateTime CreatedOn { get; set; }
}
