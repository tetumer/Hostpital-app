namespace HospitalManagementAPI.Models
{
    public class BloodTest
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public string BloodType { get; set; }
        public string Results { get; set; }
        public string Date { get; set; }
    }
}
