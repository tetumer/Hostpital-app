using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models
{
    public class Patient
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        [Required(ErrorMessage = "Patient name is required.")]
        [StringLength(100, MinimumLength = 2,
            ErrorMessage = "Patient name must be between 2 and 100 characters.")]
        public required string Name { get; set; }

        public int? DoctorId { get; set; }

        [Required(ErrorMessage = "Date of birth is required.")]
        public required DateOnly DateOfBirth { get; set; }

        [Required(ErrorMessage = "Blood group is required.")]
        public required string BloodGroup { get; set; }

        [Required(ErrorMessage = "Patient status is required.")]
        public required string Status { get; set; }

        [Required(ErrorMessage = "Admission date is required.")]
        public required DateOnly AdmissionDate { get; set; }

        [StringLength(500,
            ErrorMessage = "Allergies cannot exceed 500 characters.")]
        public required string Allergies { get; set; }

        [StringLength(1000,
            ErrorMessage = "Medical history cannot exceed 1000 characters.")]
        public required string MedicalHistory { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [Phone(ErrorMessage = "Please enter a valid phone number.")]
        public required string Phone { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        [StringLength(250,
            ErrorMessage = "Address cannot exceed 250 characters.")]
        public required string Address { get; set; }

        [Required(ErrorMessage = "Emergency contact is required.")]
        [Phone(ErrorMessage = "Please enter a valid emergency contact number.")]
        public required string EmergencyContact { get; set; }

        [Required(ErrorMessage = "Gender is required.")]
        public required string Gender { get; set; }

        [StringLength(100,
            ErrorMessage = "Provider name cannot exceed 100 characters.")]
        public required string Provider { get; set; }

        [StringLength(50,
            ErrorMessage = "Policy number cannot exceed 50 characters.")]
        public required string PolicyNumber { get; set; }

        [StringLength(100,
            ErrorMessage = "Coverage information cannot exceed 100 characters.")]
        public required string Coverage { get; set; }
    }
}