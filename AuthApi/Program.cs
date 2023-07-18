using AuthApi.Configurations;
using AuthApi.Models;
using AuthApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

var tokenOptions = new JwtTokenOptions();
builder.Configuration.Bind("JwtToken", tokenOptions);
byte[] key = Encoding.ASCII.GetBytes(tokenOptions.Key);

builder.Services
    .Configure<JwtTokenOptions>(builder.Configuration.GetSection("JwtToken"))
        .Configure<HasherOptions>(builder.Configuration.GetSection("PasswordHasher")).AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                ValidAudience = tokenOptions.Audience,
                ValidIssuer = tokenOptions.Issuer,
                ClockSkew = TimeSpan.Zero
            };
        });

builder.Services.AddScoped<IPasswordHasherService, PasswordHasherService>()
.AddScoped<ITokenService, TokenService>()
.AddDbContext<EmployeeContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")))
.AddScoped<IEmployeeService, EmployeeService>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();