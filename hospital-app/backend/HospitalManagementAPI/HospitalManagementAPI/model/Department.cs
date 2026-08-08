namespace HospitalManagementAPI.Models
{
    public class Department
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public int NumberOfDoctor { get; set; }

    }
}