using HospitalManagementAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models
{
    public class Doctor
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        [Required(ErrorMessage = "Doctor name is required.")]
        [StringLength(100, MinimumLength = 2,
            ErrorMessage = "Doctor name must be between 2 and 100 characters.")]
        public required string Name { get; set; }

        public DateOnly DateOfBirth { get; set; }

        [Required(ErrorMessage = "Gender is required.")]
        public required string Gender { get; set; }

        [Required(ErrorMessage = "Specialization is required.")]
        [StringLength(100,
            ErrorMessage = "Specialization cannot exceed 100 characters.")]
        public required string Specialization { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [Phone(ErrorMessage = "Please enter a valid phone number.")]
        public required string Phone { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        [StringLength(250,
            ErrorMessage = "Address cannot exceed 250 characters.")]
        public required string Address { get; set; }

        [Required(ErrorMessage = "License number is required.")]
        [StringLength(50,
            ErrorMessage = "License number cannot exceed 50 characters.")]
        public required string LicenseNumber { get; set; }

        [Required(ErrorMessage = "Department is required.")]
        [StringLength(100,
            ErrorMessage = "Department cannot exceed 100 characters.")]
        public required string Department { get; set; }

        public TimeOnly ArrivalTime { get; set; }

        public TimeOnly DepurtureTime { get; set; }

        public bool Availability { get; set; } = true;
    }

    public class AvailabilityUpdate
    {
        public bool Availability { get; set; }
    }
}