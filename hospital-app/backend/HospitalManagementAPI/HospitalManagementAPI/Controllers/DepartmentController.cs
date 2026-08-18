using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DepartmentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<Department> Get()
        {
            return _context.Departments.ToList();
        }
    }
}