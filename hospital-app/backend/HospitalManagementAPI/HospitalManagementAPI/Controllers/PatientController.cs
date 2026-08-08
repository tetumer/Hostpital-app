using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PatientController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public List<Patient> Get()
        {
            return _context.Patients.ToList();
        }

        [HttpGet("{id}")]
        public IActionResult GetProfile(int id)
        {
            var patient = _context.Patients.Find(id);

            if (patient == null)
                return NotFound();

            return Ok(patient);

        }

        [HttpPost]
        public IActionResult Create(Patient newPatient)
        {
            _context.Patients.Add(newPatient);
            _context.SaveChanges();
            return Ok(newPatient);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Patient updatedPatient)
        {
            var patient = _context.Patients.Find(id);
            if (patient == null) return NotFound();

            patient.Name = updatedPatient.Name;
            patient.DateOfBirth = updatedPatient.DateOfBirth;
            patient.BloodGroup = updatedPatient.BloodGroup;
            patient.Status = updatedPatient.Status;
            patient.AdmissionDate = updatedPatient.AdmissionDate;
            patient.Allergies = updatedPatient.Allergies;
            patient.MedicalHistory = updatedPatient.MedicalHistory;
            patient.Phone = updatedPatient.Phone;
            patient.Address = updatedPatient.Address;
            patient.EmergencyContact = updatedPatient.EmergencyContact;
            patient.Gender = updatedPatient.Gender;
            patient.Provider = updatedPatient.Provider;
            patient.PolicyNumber = updatedPatient.PolicyNumber;
            patient.Coverage = updatedPatient.Coverage;

            _context.SaveChanges();
            return Ok(patient);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var patient = _context.Patients.Find(id);
            if (patient == null) return NotFound();

            _context.Patients.Remove(patient);
            _context.SaveChanges();
            return Ok();
        }
    }
}