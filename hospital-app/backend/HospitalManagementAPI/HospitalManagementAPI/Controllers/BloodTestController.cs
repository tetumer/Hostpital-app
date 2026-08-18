using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloodTestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BloodTestController(AppDbContext context)
        {
            _context = context;
        }

        private User? GetCurrentUser()
        {
            var authHeader = Request.Headers.Authorization.ToString();

            if (string.IsNullOrEmpty(authHeader))
                return null;

            var token = authHeader.Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
                return null;

            using var sha256 = SHA256.Create();

            var hashBytes = sha256.ComputeHash(
                Encoding.UTF8.GetBytes(token)
            );

            var tokenHash = Convert.ToBase64String(hashBytes);

            var session = _context.UserSessions
                .FirstOrDefault(s => s.TokenHash == tokenHash);

            if (session == null)
                return null;

            return _context.Users.Find(session.UserId);
        }


        // GET
        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentUser();

            if (user == null)
                return Unauthorized();

            // OWNER + RECEPTIONIST -> see everything
            if (user.Role == "Owner" || user.Role == "Receptionist")
            {
                return Ok(_context.BloodTests.ToList());
            }

            // DOCTOR -> only reports belonging to their patients
            if (user.Role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.UserId == user.Id);

                if (doctor == null)
                    return NotFound();

                var reports = _context.BloodTests
                    .Where(b => b.DoctorId == doctor.Id)
                    .ToList();

                return Ok(reports);
            }

            // PATIENT -> only their reports
            if (user.Role == "Patient")
            {
                var patient = _context.Patients
                    .FirstOrDefault(p => p.UserId == user.Id);

                if (patient == null)
                    return NotFound();

                var reports = _context.BloodTests
                    .Where(b => b.PatientId == patient.Id)
                    .ToList();

                return Ok(reports);
            }

            return Forbid();
        }


        // POST
        [HttpPost]
        public IActionResult Create(BloodTest newTest)
        {
            var user = GetCurrentUser();

            if (user == null)
                return Unauthorized();

            // Only Owner + Receptionist can create
            if (user.Role != "Owner" && user.Role != "Receptionist")
                return Forbid();

            _context.BloodTests.Add(newTest);
            _context.SaveChanges();

            return Ok(newTest);
        }


        // PUT
        [HttpPut("{id}")]
        public IActionResult Update(int id, BloodTest updatedTest)
        {
            var user = GetCurrentUser();

            if (user == null)
                return Unauthorized();

            // Owner + Receptionist can edit
            if (user.Role != "Owner" && user.Role != "Receptionist")
                return Forbid();

            var test = _context.BloodTests.Find(id);

            if (test == null)
                return NotFound();

            test.BloodType = updatedTest.BloodType;
            test.Results = updatedTest.Results;
            test.Date = updatedTest.Date;

            _context.SaveChanges();

            return Ok(test);
        }


        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUser();

            if (user == null)
                return Unauthorized();

            // ONLY Owner can delete
            if (user.Role != "Owner")
                return Forbid();

            var test = _context.BloodTests.Find(id);

            if (test == null)
                return NotFound();

            _context.BloodTests.Remove(test);
            _context.SaveChanges();

            return Ok();
        }
    }
}