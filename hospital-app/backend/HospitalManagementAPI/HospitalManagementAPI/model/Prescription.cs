using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models
{
    public class Prescription
    {
        public int Id { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Patient ID must be valid.")]
        public int PatientId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Doctor ID must be valid.")]
        public int DoctorId { get; set; }

        [Required(ErrorMessage = "Medicine name is required.")]
        [StringLength(200, ErrorMessage = "Medicine name cannot exceed 200 characters.")]
        public required string Medicine { get; set; }

        [Required(ErrorMessage = "Dosage is required.")]
        [StringLength(100, ErrorMessage = "Dosage cannot exceed 100 characters.")]
        public required string Dosage { get; set; }

        [Required(ErrorMessage = "Duration is required.")]
        [StringLength(100, ErrorMessage = "Duration cannot exceed 100 characters.")]
        public required string Duration { get; set; }
    }
}