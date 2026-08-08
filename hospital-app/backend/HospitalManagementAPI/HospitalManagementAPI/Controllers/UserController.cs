using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var user = _context.Users.FirstOrDefault(u =>
                u.Username == loginRequest.Username &&
                u.Password == loginRequest.Password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password");
            }

            LoginResponse response = new LoginResponse
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role
            };
            return Ok(response);
        }

        [HttpPut("{id}/password")]
        public IActionResult ChangePassword(int id, [FromBody] ChangePasswordRequest request)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();

            if (user.Password != request.CurrentPassword)
            {
                return Unauthorized("Current password is incorrect.");
            }

            user.Password = request.NewPassword;
            _context.SaveChanges();

            return Ok("Password updated successfully.");
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.Username == request.Username);
            if (existingUser != null)
            {
                return BadRequest("Username already taken.");
            }

            var newUser = new User
            {
                Username = request.Username,
                Password = request.Password,
                Role = request.Role
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok(new LoginResponse { Id = newUser.Id, Username = newUser.Username, Role = newUser.Role });
        }
    }
}