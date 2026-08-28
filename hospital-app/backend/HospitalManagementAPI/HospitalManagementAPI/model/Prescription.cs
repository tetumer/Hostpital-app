using System.ComponentModel.DataAnnotations;

public class Prescription
{
    public int Id { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Patient ID must be valid.")]
    public int PatientId { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Doctor ID must be valid.")]
    public int DoctorId { get; set; }

    [Required(ErrorMessage = "Medicine is required.")]
    [StringLength(200, ErrorMessage = "Medicine name cannot exceed 200 characters.")]
    public string Medicine { get; set; }

    [Required(ErrorMessage = "Dosage is required.")]
    [StringLength(100, ErrorMessage = "Dosage cannot exceed 100 characters.")]
    public string Dosage { get; set; }

    [Required(ErrorMessage = "Duration is required.")]
    [StringLength(100, ErrorMessage = "Duration cannot exceed 100 characters.")]
    public string Duration { get; set; }
}