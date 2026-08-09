using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DoctorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<Doctor> Get()
        {
            return _context.Doctors.ToList();
        }

        [HttpGet("{id}")]
        public IActionResult GetProfile(int id)
        {
            var doctor = _context.Doctors.Find(id);

            if (doctor == null)
                return NotFound();

            return Ok(doctor);
        }


        [HttpPost]
        public IActionResult Create(Doctor newDoctor)
        {
            newDoctor.Availability = true;
            _context.Doctors.Add(newDoctor);
            _context.SaveChanges();
            return Ok(newDoctor);
        }

        [HttpPut("{id}")]

        public IActionResult Update(int id, Doctor updatedDoctor)
        {
            var doctor = _context.Doctors.Find(id);
            if (doctor == null) return NotFound();

            doctor.Name = updatedDoctor.Name;
            doctor.DateOfBirth = updatedDoctor.DateOfBirth;
            doctor.Gender = updatedDoctor.Gender;
            doctor.Specialization = updatedDoctor.Specialization;
            doctor.Phone = updatedDoctor.Phone;
            doctor.Email = updatedDoctor.Email;
            doctor.Address = updatedDoctor.Address;
            doctor.LicenseNumber = updatedDoctor.LicenseNumber;
            doctor.ArrivalTime = updatedDoctor.ArrivalTime;
            doctor.DepurtureTime = updatedDoctor.DepurtureTime;
            doctor.Department = updatedDoctor.Department;
            doctor.Availability = updatedDoctor.Availability;
            _context.SaveChanges();
            return Ok(doctor);
        }

        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {
            var doctor = _context.Doctors.Find(id);
            if (doctor == null) return NotFound();

            _context.Doctors.Remove(doctor);
            _context.SaveChanges();
            return Ok();

        }
        [HttpPatch("{id}/availability")]
        public IActionResult ToggleAvailability(int id)
        {
            var doctor = _context.Doctors.Find(id);
            if (doctor == null) return NotFound();

            doctor.Availability = !doctor.Availability;
            _context.SaveChanges();

            return Ok(doctor);
        }
    }
}