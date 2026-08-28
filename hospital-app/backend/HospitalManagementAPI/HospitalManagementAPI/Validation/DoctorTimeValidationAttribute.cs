using System.ComponentModel.DataAnnotations;
using HospitalManagementAPI.Models;


namespace HospitalManagementAPI.Validation
{
	public class DoctorTimeValidationAttribute : ValidationAttribute
	{
		protected override ValidationResult IsValid(
			object value,
			ValidationContext validationContext)
		{
			var doctor = (Doctor)validationContext.ObjectInstance;

			if (doctor.ArrivalTime >= doctor.DepurtureTime)
			{
				return new ValidationResult(
					"Doctor arrival time must be earlier than departure time."
				);
			}

			return ValidationResult.Success;
		}
	}
}
