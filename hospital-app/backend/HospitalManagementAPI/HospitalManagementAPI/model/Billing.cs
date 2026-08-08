namespace HospitalManagementAPI.Models
{
    public class Billing

    {
        public int Id { get; set; }

        public int PatientId { get; set; }

        public int DoctorId { get; set; }

        public int ConsultationFee { get; set; }

        public int MedicineFee { get; set; }

        public int LabFee { get; set; }

        public int OtherFee { get; set; }


    }
}
