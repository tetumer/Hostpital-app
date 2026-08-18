using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PrescriptionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PrescriptionController(AppDbContext context)
        {
            _context = context;
        }

        private string? GetRole()
        {
            return User.FindFirst(ClaimTypes.Role)?.Value
                ?? User.FindFirst("role")?.Value;
        }

        private int? GetUserId()
        {
            var value =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? User.FindFirst("userId")?.Value
                ?? User.FindFirst("id")?.Value;

            if (int.TryParse(value, out int userId))
                return userId;

            return null;
        }


        // ================= GET =================

        [HttpGet]
        public IActionResult Get()
        {
            var role = GetRole();
            var userId = GetUserId();

            if (role == null || userId == null)
                return Unauthorized();

            var prescriptions = _context.Prescriptions.AsQueryable();

            // Patient -> only their prescriptions
            if (role == "Patient")
            {
                var patient = _context.Patients
                    .FirstOrDefault(p => p.UserId == userId);

                if (patient == null)
                    return Ok(new List<Prescription>());

                prescriptions = prescriptions
                    .Where(p => p.PatientId == patient.Id);
            }

            // Doctor -> only prescriptions written by them
            else if (role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.UserId == userId);

                if (doctor == null)
                    return Ok(new List<Prescription>());

                prescriptions = prescriptions
                    .Where(p => p.DoctorId == doctor.Id);
            }

            // Owner + Receptionist -> everything

            return Ok(prescriptions.ToList());
        }


        // ================= CREATE =================

        [HttpPost]
        public IActionResult Create(Prescription newPrescription)
        {
            var role = GetRole();
            var userId = GetUserId();

            if (role == null || userId == null)
                return Unauthorized();

            // Patient cannot create
            if (role == "Patient")
                return Forbid();

            // Doctor can only create prescriptions for themselves
            if (role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.UserId == userId);

                if (doctor == null)
                    return Forbid();

                newPrescription.DoctorId = doctor.Id;
            }

            _context.Prescriptions.Add(newPrescription);
            _context.SaveChanges();

            return Ok(newPrescription);
        }


        // ================= UPDATE =================

        [HttpPut("{id}")]
        public IActionResult Update(
            int id,
            Prescription updatedPrescription)
        {
            var role = GetRole();
            var userId = GetUserId();

            if (role == null || userId == null)
                return Unauthorized();

            if (role == "Patient")
                return Forbid();

            var prescription = _context.Prescriptions.Find(id);

            if (prescription == null)
                return NotFound();


            // Doctor can only edit their own prescriptions
            if (role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.UserId == userId);

                if (doctor == null ||
                    prescription.DoctorId != doctor.Id)
                {
                    return Forbid();
                }

                // Doctor cannot change ownership
                prescription.DoctorId = doctor.Id;
            }
            else
            {
                // Owner / Receptionist
                prescription.DoctorId = updatedPrescription.DoctorId;
            }


            prescription.PatientId = updatedPrescription.PatientId;
            prescription.Medicine = updatedPrescription.Medicine;
            prescription.Dosage = updatedPrescription.Dosage;
            prescription.Duration = updatedPrescription.Duration;

            _context.SaveChanges();

            return Ok(prescription);
        }


        // ================= DELETE =================

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var role = GetRole();

            // Only Owner can delete
            if (role != "Owner")
                return Forbid();

            var prescription = _context.Prescriptions.Find(id);

            if (prescription == null)
                return NotFound();

            _context.Prescriptions.Remove(prescription);
            _context.SaveChanges();

            return Ok();
        }
    }
}

