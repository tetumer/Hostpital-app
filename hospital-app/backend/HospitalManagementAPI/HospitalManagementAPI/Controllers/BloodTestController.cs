using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloodTestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BloodTestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<BloodTest> Get()
        {
            return _context.BloodTests.ToList();
        }

        [HttpPost]
        public IActionResult Create(BloodTest newTest)
        {
            _context.BloodTests.Add(newTest);
            _context.SaveChanges();
            return Ok(newTest);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, BloodTest updatedTest)
        {
            var test = _context.BloodTests.Find(id);
            if (test == null) return NotFound();

            test.BloodType = updatedTest.BloodType;
            test.Results = updatedTest.Results;
            test.Date = updatedTest.Date;
            _context.SaveChanges();
            return Ok(test);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var test = _context.BloodTests.Find(id);
            if (test == null) return NotFound();

            _context.BloodTests.Remove(test);
            _context.SaveChanges();
            return Ok();
        }
    }
}