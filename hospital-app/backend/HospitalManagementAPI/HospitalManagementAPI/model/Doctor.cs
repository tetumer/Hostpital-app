namespace HospitalManagementAPI.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public required string Gender { get; set; }
        public required string Specialization { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string Address { get; set; }
        public required string LicenseNumber { get; set; }
        public required string Department { get; set; }
        public DateTime  ArrivalTime { get; set; }
        public DateTime  DepurtureTime { get; set; }
        public  string Availability { get; set; }
    }

    public class AvailabilityUpdate
    {
        public required string Availability { get; set; }
    }
}



