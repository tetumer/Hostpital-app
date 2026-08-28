using System.ComponentModel.DataAnnotations;

public class ChangePasswordRequest
{
    [Required(ErrorMessage = "Current password is required.")]
    [DataType(DataType.Password)]
    public string CurrentPassword { get; set; }

    [Required(ErrorMessage = "New password is required.")]
    [StringLength(100, MinimumLength = 8,
        ErrorMessage = "New password must be between 8 and 100 characters.")]
    [DataType(DataType.Password)]
    public string NewPassword { get; set; }
}