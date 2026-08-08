using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BillingController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<Billing> Get()
        {
            return _context.Billings.ToList();
        }
        [HttpPost]
        public IActionResult Create(Billing newBilling)
        {
            _context.Billings.Add(newBilling);
            _context.SaveChanges();
            return Ok(newBilling);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, Billing updatedBilling)
        {
            var billing = _context.Billings.Find(id);
            if (billing == null) return NotFound();

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
            var billing = _context.Billings.Find(id);
            if (billing == null) return NotFound();

            _context.Billings.Remove(billing);
            _context.SaveChanges();
            return Ok();
        }


    }
}