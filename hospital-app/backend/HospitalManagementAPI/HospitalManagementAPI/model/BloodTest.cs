using System.ComponentModel.DataAnnotations;

public class BloodTest
{
    public int Id { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Patient ID must be valid.")]
    public int PatientId { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Doctor ID must be valid.")]
    public int DoctorId { get; set; }

    [Required(ErrorMessage = "Blood type is required.")]
    public string BloodType { get; set; }

    [Required(ErrorMessage = "Test results are required.")]
    public string Results { get; set; }

    [Required(ErrorMessage = "Test date is required.")]
    public string Date { get; set; }
}