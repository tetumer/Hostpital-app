using System.ComponentModel.DataAnnotations;

public class Billing
{
    public int Id { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Patient ID must be valid.")]
    public int PatientId { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Doctor ID must be valid.")]
    public int DoctorId { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Consultation fee cannot be negative.")]
    public double ConsultationFee { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Medicine fee cannot be negative.")]
    public double MedicineFee { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Lab fee cannot be negative.")]
    public double LabFee { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Other fee cannot be negative.")]
    public double OtherFee { get; set; }
}