using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementAPI.Services;


namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;
        private readonly PasswordService _passwordService;

        public PatientController(
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

            // for owner and reciptionsit :) 
            if (user.Role == "Owner" || user.Role == "Receptionist")
            {
                return Ok(_context.Patients.ToList());
            }

            // for doc
            if (user.Role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.UserId == user.Id);

                if (doctor == null)
                    return NotFound();

                var patients = _context.Patients
                    .Where(p => p.DoctorId == doctor.Id)
                    .ToList();

                return Ok(patients);
            }
            // for patient
            if (user.Role == "Patient")
            {
                var patient = _context.Patients
                    .FirstOrDefault(p => p.UserId == user.Id);

                if (patient == null)
                    return NotFound();

                return Ok(new List<Patient> { patient });
            }

            // others
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

            var patient = _context.Patients.Find(id);

            if (patient == null)
                return NotFound();

            // Owner and Receptionist 
            if (user.Role == "Owner" || user.Role == "Receptionist")
            {
                return Ok(patient);
            }

            // Doc
            if (user.Role == "Doctor")
            {
                if (patient.DoctorId != user.Id)
                    return Forbid();

                return Ok(patient);
            }

            // Patients
            if (user.Role == "Patient")
            {
                if (patient.UserId != user.Id)
                    return Forbid();

                return Ok(patient);
            }

            return Forbid();
        }

        [HttpPost]
        public IActionResult Create(Patient newPatient)
        {
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
                return Unauthorized("You must be logged in.");

            //Owner and Receptionist
            if (user.Role != "Owner" && user.Role != "Receptionist")
                return Forbid();


            var baseUsername = newPatient.Name
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
                Role = "Patient"
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            newPatient.UserId = newUser.Id;

            _context.Patients.Add(newPatient);
            _context.SaveChanges();

            return Ok(new
            {
                Patient = newPatient,
                Username = username,
                Password = password
            });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Patient updatedPatient)
        {
            var user = _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );

            if (user == null)
            return Unauthorized("You must be logged in.");

            if (user.Role != "Owner" && user.Role != "Receptionist")
                return Forbid();

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
            patient.DoctorId = updatedPatient.DoctorId;

            _context.SaveChanges();
            return Ok(patient);
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

            var patient = _context.Patients.Find(id);

            if (patient == null)
                return NotFound();

            var patientUser = _context.Users.Find(patient.UserId);

            if (patientUser != null)
            {
                _context.Users.Remove(patientUser);
            }

            _context.Patients.Remove(patient);

            _context.SaveChanges();

            return Ok();
        }
    }
}