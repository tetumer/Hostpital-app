using HospitalManagementAPI.Models;
using HospitalManagementAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public AppointmentController(
            AppDbContext context,
            AuthService authService)
        {
            _context = context;
            _authService = authService;
        }


        private User? GetUserFromToken()
        {
            return _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );
        }


        [HttpGet]
        public IActionResult Get()
        {
            var user = GetUserFromToken();

            if (user == null)
                return Unauthorized();

            if (user.Role == "Owner" || user.Role == "Receptionist")
            {
                return Ok(_context.Appointments.ToList());
            }

            if (user.Role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.UserId == user.Id);

                if (doctor == null)
                    return NotFound("Doctor profile not found.");

                var appointments = _context.Appointments
                    .Where(a => a.DoctorId == doctor.Id)
                    .ToList();

                return Ok(appointments);
            }

            if (user.Role == "Patient")
            {
                var patient = _context.Patients
                    .FirstOrDefault(p => p.UserId == user.Id);

                if (patient == null)
                    return NotFound("Patient profile not found.");

                var appointments = _context.Appointments
                    .Where(a => a.PatientId == patient.Id)
                    .ToList();

                return Ok(appointments);
            }

            return Forbid();
        }


        [HttpPost]
        public IActionResult Create(Appointment newAppointment)
        {
            var user = GetUserFromToken();

            if (user == null)
                return Unauthorized();

            if (user.Role != "Owner" && user.Role != "Receptionist")
                return Forbid();


            var patientExists = _context.Patients
                .Any(p => p.Id == newAppointment.PatientId);

            if (!patientExists)
            {
                return BadRequest("Patient not found.");
            }


            var doctorExists = _context.Doctors
                .Any(d => d.Id == newAppointment.DoctorId);

            if (!doctorExists)
            {
                return BadRequest("Doctor not found.");
            }


            var sameDayAppointments = _context.Appointments
                .Where(a =>
                    a.DoctorId == newAppointment.DoctorId &&
                    a.Date == newAppointment.Date)
                .ToList();


            if (!TimeSpan.TryParse(
                newAppointment.Time,
                out var newTime))
            {
                return BadRequest("Invalid appointment time.");
            }


            var conflict = sameDayAppointments.Any(a =>
            {
                if (!TimeSpan.TryParse(a.Time, out var existingTime))
                    return false;

                return Math.Abs(
                    (existingTime - newTime).TotalMinutes
                ) < 20;
            });


            if (conflict)
            {
                return BadRequest(
                    "This doctor already has an appointment within 20 minutes of that time."
                );
            }


            _context.Appointments.Add(newAppointment);
            _context.SaveChanges();

            return Ok(newAppointment);
        }


        [HttpPut("{id}")]
        public IActionResult Update(
            int id,
            Appointment updatedAppointment)
        {
            var user = GetUserFromToken();

            if (user == null)
                return Unauthorized();

            if (user.Role != "Owner" && user.Role != "Receptionist")
                return Forbid();


            var appointment = _context.Appointments.Find(id);

            if (appointment == null)
            {
                return NotFound();
            }


            var patientExists = _context.Patients
                .Any(p => p.Id == updatedAppointment.PatientId);

            if (!patientExists)
            {
                return BadRequest("Patient not found.");
            }


            var doctorExists = _context.Doctors
                .Any(d => d.Id == updatedAppointment.DoctorId);

            if (!doctorExists)
            {
                return BadRequest("Doctor not found.");
            }


            var sameDayAppointments = _context.Appointments
                .Where(a =>
                    a.DoctorId == updatedAppointment.DoctorId &&
                    a.Date == updatedAppointment.Date &&
                    a.Id != id)
                .ToList();


            if (!TimeSpan.TryParse(
                updatedAppointment.Time,
                out var newTime))
            {
                return BadRequest("Invalid appointment time.");
            }


            var conflict = sameDayAppointments.Any(a =>
            {
                if (!TimeSpan.TryParse(a.Time, out var existingTime))
                    return false;

                return Math.Abs(
                    (existingTime - newTime).TotalMinutes
                ) < 20;
            });


            if (conflict)
            {
                return BadRequest(
                    "This doctor already has an appointment within 20 minutes of that time."
                );
            }


            appointment.PatientId = updatedAppointment.PatientId;
            appointment.DoctorId = updatedAppointment.DoctorId;
            appointment.Date = updatedAppointment.Date;
            appointment.Time = updatedAppointment.Time;
            appointment.Status = updatedAppointment.Status;


            _context.SaveChanges();

            return Ok(appointment);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetUserFromToken();

            if (user == null)
                return Unauthorized();

            if (user.Role != "Owner")
                return Forbid();


            var appointment = _context.Appointments.Find(id);

            if (appointment == null)
            {
                return NotFound();
            }


            _context.Appointments.Remove(appointment);
            _context.SaveChanges();

            return Ok();
        }
    }
}