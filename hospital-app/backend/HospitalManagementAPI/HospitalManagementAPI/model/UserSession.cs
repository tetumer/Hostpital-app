using System.ComponentModel.DataAnnotations;

namespace HospitalManagementAPI.Models
{
    public class UserSession
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        [Required(ErrorMessage = "Token hash is required.")]
        public required string TokenHash { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}