using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Patient ID must be valid.")]
        public int PatientId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Doctor ID must be valid.")]
        public int DoctorId { get; set; }

        [Required(ErrorMessage = "Appointment date is required.")]
        public required string Date { get; set; }

        [Required(ErrorMessage = "Appointment time is required.")]
        public required string Time { get; set; }

        [Required(ErrorMessage = "Appointment status is required.")]
        [StringLength(30, ErrorMessage = "Appointment status cannot exceed 30 characters.")]
        public required string Status { get; set; }
    }
}