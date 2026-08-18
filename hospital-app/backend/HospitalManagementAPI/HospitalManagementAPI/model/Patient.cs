namespace HospitalManagementAPI.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public required string Name { get; set; }
        public int? DoctorId { get; set; }
        public required DateOnly DateOfBirth { get; set; }
        public  required string BloodGroup { get; set; }
        public required string Status { get; set; }
        public required DateOnly AdmissionDate { get; set; }
        public required string Allergies { get; set; }
        public required string MedicalHistory { get; set; }
        public required string Phone { get; set; }
        public required string Address { get; set; }
        public required string EmergencyContact { get; set; }
        public required string Gender { get; set; }
        public required string Provider { get; set; }
        public required string PolicyNumber { get; set; }
        public required string Coverage { get; set; }
    }
}