using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<Appointment> Get()
        {
            return _context.Appointments.ToList();
        }
        [HttpPost]
        public IActionResult Create(Appointment newAppointment)
        {
            var sameDayAppointments = _context.Appointments
                .Where(a => a.DoctorId == newAppointment.DoctorId && a.Date == newAppointment.Date)
                .ToList();

            var newTime = TimeSpan.Parse(newAppointment.Time);

            var conflict = sameDayAppointments.Any(a =>
                Math.Abs((TimeSpan.Parse(a.Time) - newTime).TotalMinutes) < 20);

            if (conflict)
            {
                return BadRequest("This doctor already has an appointment within 20 minutes of that time.");
            }
            _context.Appointments.Add(newAppointment);
            _context.SaveChanges();
            return Ok(newAppointment);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, Appointment updatedAppointment)
        {
            var appointment = _context.Appointments.Find(id);
            if (appointment == null) return NotFound();

            var sameDayAppointments = _context.Appointments
                .Where(a => a.DoctorId == updatedAppointment.DoctorId && a.Date == updatedAppointment.Date && a.Id != id)
                .ToList();

            var newTime = TimeSpan.Parse(updatedAppointment.Time);

            var conflict = sameDayAppointments.Any(a =>
                Math.Abs((TimeSpan.Parse(a.Time) - newTime).TotalMinutes) < 20);

            if (conflict)
            {
                return BadRequest("This doctor already has an appointment within 20 minutes of that time.");
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
            var appointment = _context.Appointments.Find(id);
            if (appointment == null) return NotFound();

            _context.Appointments.Remove(appointment);
            _context.SaveChanges();
            return Ok();
        }
    }
}