using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using HospitalManagementAPI.Services;


namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;
        private readonly PasswordService _passwordService;

        public DoctorController(
            AppDbContext context,
            AuthService authService,
            PasswordService passwordService)
        {
            _context = context;
            _authService = authService;
            _passwordService = passwordService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
                return Unauthorized("You must be logged in.");

            // Owner and Receptionist 
            if (user.Role == "Owner" || user.Role == "Receptionist")
            {
                return Ok(_context.Doctors.ToList());
            }

            // Doc
            if (user.Role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.UserId == user.Id);

                if (doctor == null)
                    return NotFound();

                return Ok(new List<Doctor> { doctor });
            }

            // Patients
            if (user.Role == "Patient")
            {
                var patient = _context.Patients
                    .FirstOrDefault(p => p.UserId == user.Id);

                if (patient == null)
                    return NotFound();

                if (patient.DoctorId == null)
                    return Ok(new List<Doctor>());

                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.Id == patient.DoctorId);

                if (doctor == null)
                    return NotFound();

                return Ok(new List<Doctor> { doctor });
            }
            //others
            return Forbid();
        }

        [HttpGet("{id}")]
        public IActionResult GetProfile(int id)
        {
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
                return Unauthorized("You must be logged in.");

            var doctor = _context.Doctors.Find(id);

            if (doctor == null)
                return NotFound();

            // Owner and Receptionist 
            if (user.Role == "Owner" || user.Role == "Receptionist")
                return Ok(doctor);

            //  himself
            if (user.Role == "Doctor")
            {
                if (doctor.UserId != user.Id)
                    return Forbid();

                return Ok(doctor);
            }

            // assigned doctor
            if (user.Role == "Patient")
            {
                var patient = _context.Patients
                    .FirstOrDefault(p => p.UserId == user.Id);

                if (patient == null)
                    return NotFound();

                if (patient.DoctorId != doctor.Id)
                    return Forbid();

                return Ok(doctor);
            }

            return Forbid();
        }


        [HttpPost]
        public IActionResult Create(Doctor newDoctor)
        {
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
                return Unauthorized("You must be logged in.");

            if (user.Role != "Owner" && user.Role != "Receptionist")
                return Forbid();

            newDoctor.Availability = true;

            var baseUsername = newDoctor.Name
                .ToLower()
                .Replace(" ", "");

            var username = baseUsername;
            int counter = 1;

            while (_context.Users.Any(u => u.Username == username))
            {
                username = baseUsername + counter;
                counter++;
            }

            var password = baseUsername + "123";

            var newUser = new User
            {
                Username = username,
                Password = _passwordService.Hash(password),
                Role = "Doctor"
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            newDoctor.UserId = newUser.Id;

            _context.Doctors.Add(newDoctor);
            _context.SaveChanges();

            return Ok(new
            {
                Doctor = newDoctor,
                Username = username,
                Password = password
            });
        }

        [HttpPut("{id}")]

        public IActionResult Update(int id, Doctor updatedDoctor)
        {
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
                return Unauthorized("You must be logged in.");

            if (user.Role != "Owner" && user.Role != "Receptionist")
                return Forbid();

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
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
                return Unauthorized("You must be logged in.");

            if (user.Role != "Owner")
                return Forbid();
            var doctor = _context.Doctors.Find(id);

            if (doctor == null)
                return NotFound();

            var doctoruser = _context.Users.Find(doctor.UserId);

            if (doctoruser != null)
            {
                _context.Users.Remove(doctoruser);
            }

            _context.Doctors.Remove(doctor);

            _context.SaveChanges();

            return Ok();
        }
        [HttpPatch("{id}/availability")]
        public IActionResult ToggleAvailability(int id)
        {
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
                return Unauthorized("You must be logged in.");

            if (user.Role != "Owner" && user.Role != "Receptionist")
                return Forbid();
            var doctor = _context.Doctors.Find(id);
            if (doctor == null) return NotFound();

            doctor.Availability = !doctor.Availability;
            _context.SaveChanges();

            return Ok(doctor);
        }
    }
}