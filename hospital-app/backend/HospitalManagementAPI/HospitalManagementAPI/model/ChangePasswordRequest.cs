using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models
{
    public class ChangePasswordRequest
    {
        [Required(ErrorMessage = "Current password is required.")]
        public required string CurrentPassword { get; set; }

        [Required(ErrorMessage = "New password is required.")]
        [StringLength(100, MinimumLength = 6,
            ErrorMessage = "New password must be between 6 and 100 characters.")]
        public required string NewPassword { get; set; }
    }
}