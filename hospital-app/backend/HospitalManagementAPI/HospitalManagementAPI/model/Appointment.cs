using System.ComponentModel.DataAnnotations;

public class Appointment
{
    public int Id { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Patient ID must be valid.")]
    public int PatientId { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Doctor ID must be valid.")]
    public int DoctorId { get; set; }

    [Required(ErrorMessage = "Appointment date is required.")]
    public string Date { get; set; }

    [Required(ErrorMessage = "Appointment time is required.")]
    public string Time { get; set; }

    [Required(ErrorMessage = "Appointment status is required.")]
    public string Status { get; set; }
}