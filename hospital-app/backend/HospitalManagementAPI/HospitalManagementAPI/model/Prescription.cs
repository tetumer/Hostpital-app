namespace HospitalManagementAPI.Models
{
    public class Prescription

    {
        public int Id { get; set; }

        public int PatientId { get; set; }

        public int DoctorId { get; set; }

        public required string Medicine { get; set; }

        public required string  Dosage { get; set; }

        public required string Duration { get; set; }
    }
}


