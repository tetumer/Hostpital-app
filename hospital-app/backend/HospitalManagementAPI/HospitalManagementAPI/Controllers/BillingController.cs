using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using HospitalManagementAPI.Services;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public BillingController(
            AppDbContext context,
            AuthService authService)
        {
            _context = context;
            _authService = authService;
        }



        [HttpGet]
        public IActionResult Get()
        {
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
                return Unauthorized("You must be logged in.");

            if (user.Role == "Owner" || user.Role == "Receptionist")
            {
                return Ok(_context.Billings.ToList());
            }

            if (user.Role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.UserId == user.Id);

                if (doctor == null)
                    return Unauthorized();

                return Ok(
                    _context.Billings
                        .Where(b => b.DoctorId == doctor.Id)
                        .ToList()
                );
            }

            if (user.Role == "Patient")
            {
                var patient = _context.Patients
                    .FirstOrDefault(p => p.UserId == user.Id);

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
        public IActionResult Create(Billing newBilling)
        {
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
                return Unauthorized("You must be logged in.");

            if (user.Role != "Owner" && user.Role != "Receptionist")
                return Forbid();

            _context.Billings.Add(newBilling);
            _context.SaveChanges();

            return Ok(newBilling);
        }


        [HttpPut("{id}")]
        public IActionResult Update(int id, Billing updatedBilling)
        {
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
                return Unauthorized("You must be logged in.");

            if (user.Role != "Owner" && user.Role != "Receptionist")
                return Forbid();

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
        public IActionResult Delete(int id)
        {
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
                return Unauthorized("You must be logged in.");

            if (user.Role != "Owner")
                return Forbid();

            var billing = _context.Billings.Find(id);

            if (billing == null)
                return NotFound();

            _context.Billings.Remove(billing);
            _context.SaveChanges();

            return Ok();
        }
    }
}

