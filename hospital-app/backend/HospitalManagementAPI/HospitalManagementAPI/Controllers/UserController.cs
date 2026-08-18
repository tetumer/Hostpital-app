using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementAPI.Services;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public UserController(
            AppDbContext context,
            AuthService authService)
        {
            _context = context;
            _authService = authService;
        }


        private User? GetUserFromToken()
        {
            return _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );
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

            var tokenBytes =
                System.Security.Cryptography.RandomNumberGenerator.GetBytes(32);

            var token = Convert.ToBase64String(tokenBytes);

            using var sha256 =
                System.Security.Cryptography.SHA256.Create();

            var tokenHashBytes = sha256.ComputeHash(
                System.Text.Encoding.UTF8.GetBytes(token)
            );

            var tokenHash = Convert.ToBase64String(tokenHashBytes);

            var session = new UserSession
            {
                TokenHash = tokenHash,
                UserId = user.Id,
                CreatedAt = DateTime.UtcNow
            };

            _context.UserSessions.Add(session);
            _context.SaveChanges();

            return Ok(new LoginResponse
            {
                Token = token
            });
        }


        [HttpPost("logout")]
        public IActionResult Logout()
        {
            if (!Request.Headers.TryGetValue(
                "Authorization",
                out var authHeader))
            {
                return Unauthorized();
            }

            var token = authHeader
                .ToString()
                .Replace("Bearer ", "");

            using var sha256 =
                System.Security.Cryptography.SHA256.Create();

            var tokenHashBytes = sha256.ComputeHash(
                System.Text.Encoding.UTF8.GetBytes(token)
            );

            var tokenHash = Convert.ToBase64String(tokenHashBytes);

            var session = _context.UserSessions
                .FirstOrDefault(s => s.TokenHash == tokenHash);

            if (session == null)
            {
                return Unauthorized();
            }

            _context.UserSessions.Remove(session);
            _context.SaveChanges();

            return Ok("Logged out successfully.");
        }


        [HttpPut("{id}/password")]
        public IActionResult ChangePassword(
            int id,
            [FromBody] ChangePasswordRequest request)
        {
            var user = _context.Users.Find(id);

            if (user == null)
                return NotFound();

            if (user.Password != request.CurrentPassword)
            {
                return Unauthorized(
                    "Current password is incorrect."
                );
            }

            user.Password = request.NewPassword;

            _context.SaveChanges();

            return Ok("Password updated successfully.");
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {

            if (!_context.Users.Any())
            {
                if (request.Role != "Owner")
                {
                    return BadRequest("The first user must be an Owner.");
                }

                var firstOwner = new User
                {
                    Username = request.Username,
                    Password = request.Password,
                    Role = "Owner"
                };

                _context.Users.Add(firstOwner);
                _context.SaveChanges();

                return Ok("Owner registered successfully.");
            }


            var currentUser = GetUserFromToken();

            if (currentUser == null)
                return Unauthorized("You must be logged in to register a user.");


            var existingUser = _context.Users
                .FirstOrDefault(u => u.Username == request.Username);

            if (existingUser != null)
                return BadRequest("Username already taken.");


            if (currentUser.Role == "Owner")
            {
                if (
                    request.Role != "Owner" &&
                    request.Role != "Receptionist" &&
                    request.Role != "Doctor" &&
                    request.Role != "Patient"
                )
                {
                    return BadRequest("Invalid role.");
                }
            }

            else if (currentUser.Role == "Receptionist")
            {
                if (
                    request.Role != "Doctor" &&
                    request.Role != "Patient"
                )
                {
                    return Forbid();
                }
            }

            else
            {
                return Forbid();
            }


            var newUser = new User
            {
                Username = request.Username,
                Password = request.Password,
                Role = request.Role
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok("User registered successfully.");
        }
        [HttpGet("count")]
        public IActionResult GetUserCount()
        {
            var count = _context.Users.Count();

            return Ok(new
            {
                count = count
            });
        }

    }
}