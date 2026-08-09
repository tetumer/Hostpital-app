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
        public TimeOnly ArrivalTime { get; set; }
        public TimeOnly DepurtureTime { get; set; }
        public bool Availability { get; set; } = true;
    }

    public class AvailabilityUpdate
    {
        public bool Availability { get; set; }
    }
}



