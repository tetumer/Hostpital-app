using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class   PrescriptionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PrescriptionController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<Prescription> Get()
        {
            return _context.Prescriptions.ToList();
        }

        [HttpPost]
        public IActionResult Create(Prescription newPrescription)
        {
            _context.Prescriptions.Add(newPrescription);
            _context.SaveChanges();
            return Ok(newPrescription);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Prescription updatedPrescription)
        {
            var prescription = _context.Prescriptions.Find(id);
            if (prescription == null) return NotFound();

            prescription.Medicine = updatedPrescription.Medicine;
            prescription.PatientId = updatedPrescription.PatientId;
            prescription.DoctorId = updatedPrescription.DoctorId;
            prescription.Dosage = updatedPrescription.Dosage;
            prescription.Duration = updatedPrescription.Duration;


            _context.SaveChanges();
            return Ok(prescription);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var prescription = _context.Prescriptions.Find(id);
            if (prescription == null) return NotFound();

            _context.Prescriptions.Remove(prescription);
            _context.SaveChanges();
            return Ok();
        }

    }
}
