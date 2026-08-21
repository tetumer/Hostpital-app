using HospitalManagementAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly AppDbContext _context;

        public DashboardController(
            AuthService authService,
            AppDbContext context)
        {
            _authService = authService;
            _context = context;
        }

        [HttpGet]
        public IActionResult GetDashboard()
        {
            if (!Request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                return Unauthorized();
            }

            var user = _authService.GetUserFromToken(authHeader.ToString());

            if (user == null)
            {
                return Unauthorized();
            }

            var dashboard = new Dictionary<string, object>();

            dashboard["welcome"] = new
            {
                username = user.Username,
                role = user.Role
            };

            // ================= OWNER =================
            if (user.Role == "Owner")
            {
                dashboard["overview"] = new
                {
                    totalPatients = _context.Patients.Count(),
                    totalDoctors = _context.Doctors.Count()
                };

                dashboard["appointments"] = new
                {
                    total = _context.Appointments.Count()
                };

                var totalRevenue = _context.Billings.Sum(b =>
                    b.ConsultationFee + b.MedicineFee + b.LabFee + b.OtherFee);

                dashboard["financialOverview"] = new
                {
                    revenue = totalRevenue
                };

                dashboard["charts"] = new
                {
                    appointmentsByStatus = _context.Appointments
                        .GroupBy(a => a.Status)
                        .Select(g => new { status = g.Key, count = g.Count() })
                        .ToList(),

                    doctorsByDepartment = _context.Doctors
                        .GroupBy(d => d.Department)
                        .Select(g => new { department = g.Key, count = g.Count() })
                        .ToList(),

                    patientsByStatus = _context.Patients
                        .GroupBy(p => p.Status)
                        .Select(g => new { status = g.Key, count = g.Count() })
                        .ToList()
                };
            }

            // ================= RECEPTIONIST =================
            if (user.Role == "Receptionist")
            {
                dashboard["sections"] = new
                {
                    appointments = _context.Appointments.ToList(),

                    doctors = new
                    {
                        total = _context.Doctors.Count(),
                        available = _context.Doctors.Count(d => d.Availability),
                        unavailable = _context.Doctors.Count(d => !d.Availability)
                    },

                    patients = new
                    {
                        total = _context.Patients.Count(),
                        admitted = _context.Patients.Count(p => p.Status == "Admitted")
                    },

                    billing = new
                    {
                        total = _context.Billings.Count()
                    }
                };
            }

            // ================= DOCTOR =================
            if (user.Role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(d => d.UserId == user.Id);

                if (doctor == null)
                {
                    return NotFound("Doctor profile not found for this account.");
                }

                var myAppointments = _context.Appointments
                    .Where(a => a.DoctorId == doctor.Id)
                    .ToList();

                var myPatientIds = myAppointments
                    .Select(a => a.PatientId)
                    .Distinct()
                    .ToList();

                dashboard["sections"] = new
                {
                    appointments = myAppointments,
                    patients = new { total = myPatientIds.Count }
                };
            }

            // ================= PATIENT =================
            if (user.Role == "Patient")
            {
                var patient = _context.Patients
                    .FirstOrDefault(p => p.UserId == user.Id);

                if (patient == null)
                {
                    return NotFound("Patient profile not found for this account.");
                }

                var myAppointments = _context.Appointments
                    .Where(a => a.PatientId == patient.Id)
                    .ToList();

                var myBills = _context.Billings
                    .Where(b => b.PatientId == patient.Id)
                    .ToList();

                var myLabReports = _context.BloodTests
                    .Where(bt => bt.PatientId == patient.Id)
                    .ToList();

                dashboard["sections"] = new
                {
                    appointments = myAppointments,
                    billing = myBills,
                    laboratory = myLabReports
                };
            }

            return Ok(dashboard);
        }
    }
}