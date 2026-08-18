using HospitalManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace HospitalManagementAPI.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public User? GetUserFromToken(string? authorizationHeader)
        {
            if (string.IsNullOrEmpty(authorizationHeader))
            {
                return null;
            }

            if (!authorizationHeader.StartsWith("Bearer "))
            {
                return null;
            }

            var token = authorizationHeader.Substring("Bearer ".Length);

            if (string.IsNullOrEmpty(token))
            {
                return null;
            }

            using var sha256 = SHA256.Create();

            var tokenHashBytes = sha256.ComputeHash(
                Encoding.UTF8.GetBytes(token)
            );

            var tokenHash = Convert.ToBase64String(tokenHashBytes);

            var session = _context.UserSessions
                .FirstOrDefault(s => s.TokenHash == tokenHash);

            if (session == null)
            {
                return null;
            }

            return _context.Users
                .FirstOrDefault(u => u.Id == session.UserId);
        }
    }
}