using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models
{
    public class BloodTest
    {
        public int Id { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Patient ID must be valid.")]
        public int PatientId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Doctor ID must be valid.")]
        public int DoctorId { get; set; }

        [StringLength(20, ErrorMessage = "Blood type cannot exceed 20 characters.")]
        public string BloodType { get; set; }

        [StringLength(2000, ErrorMessage = "Test results cannot exceed 2000 characters.")]
        public string Results { get; set; }

        [StringLength(30, ErrorMessage = "Date cannot exceed 30 characters.")]
        public string Date { get; set; }
    }
}