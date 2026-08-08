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
        [HttpPost]
        public IActionResult Create(Department newDepartment)
        {
            _context.Departments.Add(newDepartment);
            _context.SaveChanges();
            return Ok(newDepartment);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, Department updatedDepartment)
        {
            var department = _context.Departments.Find(id);
            if (department == null) return NotFound();

            department.Name = updatedDepartment.Name;

            _context.SaveChanges();
            return Ok(department);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var department = _context.Departments.Find(id);
            if (department == null) return NotFound();
            _context.Departments.Remove(department);
            _context.SaveChanges();
            return Ok();
        }


    }
}