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
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentController(AppDbContext context)
        {
            _context = context;
        }




        [HttpGet]
        public IActionResult Get()
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            if (role == "Owner" || role == "Receptionist")
            {
                return Ok(_context.Appointments.ToList());
            }

            if (role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.UserId == userId);

                if (doctor == null)
                    return NotFound("Doctor profile not found.");

                var appointments = _context.Appointments
                    .Where(a => a.DoctorId == doctor.Id)
                    .ToList();

                return Ok(appointments);
            }

            if (role == "Patient")
            {
                var patient = _context.Patients
                    .FirstOrDefault(p => p.UserId == userId);

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
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (role != "Owner" && role != "Receptionist")
            {
                return Forbid();
            }

            var sameDayAppointments = _context.Appointments
                .Where(a =>
                    a.DoctorId == newAppointment.DoctorId &&
                    a.Date == newAppointment.Date)
                .ToList();

            var newTime = TimeSpan.Parse(newAppointment.Time);

            var conflict = sameDayAppointments.Any(a =>
                Math.Abs(
                    (TimeSpan.Parse(a.Time) - newTime).TotalMinutes
                ) < 20
            );

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
        public IActionResult Update(int id, Appointment updatedAppointment)
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (role != "Owner" && role != "Receptionist")
            {
                return Forbid();
            }

            var appointment = _context.Appointments.Find(id);

            if (appointment == null)
            {
                return NotFound();
            }

            var sameDayAppointments = _context.Appointments
                .Where(a =>
                    a.DoctorId == updatedAppointment.DoctorId &&
                    a.Date == updatedAppointment.Date &&
                    a.Id != id)
                .ToList();

            var newTime = TimeSpan.Parse(updatedAppointment.Time);

            var conflict = sameDayAppointments.Any(a =>
                Math.Abs(
                    (TimeSpan.Parse(a.Time) - newTime).TotalMinutes
                ) < 20
            );

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
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (role != "Owner")
            {
                return Forbid();
            }

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