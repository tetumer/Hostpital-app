using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Username is required.")]
    [StringLength(50, MinimumLength = 8,
        ErrorMessage = "Username must be between 8 and 50 characters.")]
    public string Username { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    [StringLength(100, MinimumLength = 8,
        ErrorMessage = "Password must be between 6 and 100 characters.")]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Required(ErrorMessage = "Role is required.")]
    public string Role { get; set; }
}