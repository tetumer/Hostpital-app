using HospitalManagementAPI.Models;
using System.Net.NetworkInformation;
using System.Timers;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HospitalManagementAPI.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }

        public required string Date { get; set; }

        public required string Time { get; set; }

        public required string Status { get; set; }
    }
}
