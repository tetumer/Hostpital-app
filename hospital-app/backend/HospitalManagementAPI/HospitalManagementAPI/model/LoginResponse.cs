namespace HospitalManagementAPI.Models
{
    public class LoginResponse
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Role { get; set; }

    }
}
