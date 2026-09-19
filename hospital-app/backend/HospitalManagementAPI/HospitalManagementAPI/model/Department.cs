using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models
{
    public class Department
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Department name is required.")]
        [StringLength(100, MinimumLength = 2,
            ErrorMessage = "Department name must be between 2 and 100 characters.")]
        public required string Name { get; set; }

        [Range(0, int.MaxValue,
            ErrorMessage = "Number of doctors cannot be negative.")]
        public int NumberOfDoctor { get; set; }
    }
}