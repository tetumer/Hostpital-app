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
        private readonly PasswordService _passwordService;

        public UserController(
            AppDbContext context,
            AuthService authService,
            PasswordService passwordService)
        {
            _context = context;
            _authService = authService;
            _passwordService = passwordService;
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
                u.Username == loginRequest.Username);

            if (user == null ||
                !_passwordService.Verify(loginRequest.Password, user.Password))
            {
                return Unauthorized("Invalid username or password");
            }

            if (!_passwordService.IsHashed(user.Password))
            {
                user.Password = _passwordService.Hash(loginRequest.Password);
                _context.SaveChanges();
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

            if (!_passwordService.Verify(request.CurrentPassword, user.Password))
            {
                return Unauthorized(
                    "Current password is incorrect."
                );
            }

            user.Password = _passwordService.Hash(request.NewPassword);

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
                    Password = _passwordService.Hash(request.Password),
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
                Password = _passwordService.Hash(request.Password),
                Role = request.Role
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok("User registered successfully.");
        }

        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var user = GetUserFromToken();

            if (user == null)
                return Unauthorized();

            return Ok(new
            {
                id = user.Id,
                username = user.Username,
                role = user.Role
            });
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