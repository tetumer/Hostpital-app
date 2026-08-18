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
    public class BillingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BillingController(AppDbContext context)
        {
            _context = context;
        }



        [HttpGet]
        public IActionResult Get()
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (role == "Owner" || role == "Receptionist")
            {
                return Ok(_context.Billings.ToList());
            }

            if (role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.UserId.ToString() == userId);

                if (doctor == null)
                    return Unauthorized();

                return Ok(
                    _context.Billings
                        .Where(b => b.DoctorId == doctor.Id)
                        .ToList()
                );
            }

            if (role == "Patient")
            {
                var patient = _context.Patients
                    .FirstOrDefault(p => p.UserId.ToString() == userId);

                if (patient == null)
                    return Unauthorized();

                return Ok(
                    _context.Billings
                        .Where(b => b.PatientId == patient.Id)
                        .ToList()
                );
            }

            return Forbid();
        }


        [HttpPost]
        [Authorize(Roles = "Owner,Receptionist")]
        public IActionResult Create(Billing newBilling)
        {
            _context.Billings.Add(newBilling);

            _context.SaveChanges();

            return Ok(newBilling);
        }



        [HttpPut("{id}")]
        [Authorize(Roles = "Owner,Receptionist")]
        public IActionResult Update(int id, Billing updatedBilling)
        {
            var billing = _context.Billings.Find(id);

            if (billing == null)
                return NotFound();

            billing.PatientId = updatedBilling.PatientId;
            billing.DoctorId = updatedBilling.DoctorId;
            billing.ConsultationFee = updatedBilling.ConsultationFee;
            billing.MedicineFee = updatedBilling.MedicineFee;
            billing.LabFee = updatedBilling.LabFee;
            billing.OtherFee = updatedBilling.OtherFee;

            _context.SaveChanges();

            return Ok(billing);
        }



        [HttpDelete("{id}")]
        [Authorize(Roles = "Owner")]
        public IActionResult Delete(int id)
        {
            var billing = _context.Billings.Find(id);

            if (billing == null)
                return NotFound();

            _context.Billings.Remove(billing);

            _context.SaveChanges();

            return Ok();
        }
    }
}

