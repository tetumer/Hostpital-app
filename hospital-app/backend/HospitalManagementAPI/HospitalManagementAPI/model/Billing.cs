using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models
{
    public class Billing
    {
        public int Id { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Patient ID must be valid.")]
        public int PatientId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Doctor ID must be valid.")]
        public int DoctorId { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Consultation fee cannot be negative.")]
        public int ConsultationFee { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Medicine fee cannot be negative.")]
        public int MedicineFee { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Lab fee cannot be negative.")]
        public int LabFee { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Other fee cannot be negative.")]
        public int OtherFee { get; set; }
    }
}