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

            if (user.Role == "Doctor")
            {
                dashboard["overview"] = new
                {
                    totalPatients = _context.Patients.Count()
                };

                dashboard["appointments"] = new
                {
                    total = _context.Appointments.Count()
                };
            }

            if (user.Role == "Receptionist")
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
            }

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

                dashboard["financialOverview"] = new
                {
                    message = "Financial data will go here"
                };
            }

            return Ok(dashboard);
        }
    }
}