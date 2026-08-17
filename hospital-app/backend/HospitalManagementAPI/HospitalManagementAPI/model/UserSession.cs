namespace HospitalManagementAPI.Models
{
	public class UserSession
	{
		public int Id { get; set; }

		public required string TokenHash { get; set; }

		public int UserId { get; set; }

		public DateTime CreatedAt { get; set; }
	}
}