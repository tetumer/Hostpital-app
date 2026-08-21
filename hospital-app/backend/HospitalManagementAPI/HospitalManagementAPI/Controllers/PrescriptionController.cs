using HospitalManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using HospitalManagementAPI.Services;

namespace HospitalManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrescriptionController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public PrescriptionController(
            AppDbContext context,
            AuthService authService)
        {
            _context = context;
            _authService = authService;
        }


        // =========================================================
        // AUTHENTICATION
        // =========================================================

        private User? GetCurrentUser()
        {
            return _authService.GetUserFromToken(
                Request.Headers["Authorization"].ToString()
            );
        }


        // =========================================================
        // GET ALL / USER PRESCRIPTIONS
        // =========================================================

        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentUser();

            if (user == null)
                return Unauthorized("You must be logged in.");


            // Owner + Receptionist
            // Can see all prescriptions

            if (
                user.Role == "Owner" ||
                user.Role == "Receptionist"
            )
            {
                return Ok(
                    _context.Prescriptions.ToList()
                );
            }


            // Doctor
            // Can only see prescriptions they wrote

            if (user.Role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(
                        d => d.UserId == user.Id
                    );

                if (doctor == null)
                    return Ok(new List<Prescription>());

                var prescriptions =
                    _context.Prescriptions
                        .Where(
                            p => p.DoctorId == doctor.Id
                        )
                        .ToList();

                return Ok(prescriptions);
            }


            // Patient
            // Can only see their own prescriptions

            if (user.Role == "Patient")
            {
                var patient = _context.Patients
                    .FirstOrDefault(
                        p => p.UserId == user.Id
                    );

                if (patient == null)
                    return Ok(new List<Prescription>());

                var prescriptions =
                    _context.Prescriptions
                        .Where(
                            p => p.PatientId == patient.Id
                        )
                        .ToList();

                return Ok(prescriptions);
            }


            return Forbid();
        }


        // =========================================================
        // CREATE
        // =========================================================

        [HttpPost]
        public IActionResult Create(
            Prescription newPrescription)
        {
            var user = GetCurrentUser();

            if (user == null)
                return Unauthorized(
                    "You must be logged in."
                );


            // Patients cannot create prescriptions

            if (user.Role == "Patient")
                return Forbid();


            // Doctor
            // Automatically use the logged-in doctor's ID.
            // The frontend cannot create a prescription
            // pretending to belong to another doctor.

            if (user.Role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(
                        d => d.UserId == user.Id
                    );

                if (doctor == null)
                    return Forbid();

                newPrescription.DoctorId =
                    doctor.Id;
            }


            // Owner / Receptionist
            // Can choose the doctor from the form.

            if (
                user.Role != "Owner" &&
                user.Role != "Receptionist" &&
                user.Role != "Doctor"
            )
            {
                return Forbid();
            }


            // Make sure patient exists

            var patientExists =
                _context.Patients.Any(
                    p => p.Id == newPrescription.PatientId
                );

            if (!patientExists)
            {
                return BadRequest(
                    "Patient does not exist."
                );
            }


            // Make sure doctor exists

            var doctorExists =
                _context.Doctors.Any(
                    d => d.Id == newPrescription.DoctorId
                );

            if (!doctorExists)
            {
                return BadRequest(
                    "Doctor does not exist."
                );
            }


            _context.Prescriptions.Add(
                newPrescription
            );

            _context.SaveChanges();


            return Ok(newPrescription);
        }


        // =========================================================
        // UPDATE
        // =========================================================

        [HttpPut("{id}")]
        public IActionResult Update(
            int id,
            Prescription updatedPrescription)
        {
            var user = GetCurrentUser();

            if (user == null)
                return Unauthorized(
                    "You must be logged in."
                );


            // Patients cannot edit

            if (user.Role == "Patient")
                return Forbid();


            var prescription =
                _context.Prescriptions.Find(id);

            if (prescription == null)
                return NotFound(
                    "Prescription not found."
                );


            // Doctor
            // Can only edit their own prescription.

            if (user.Role == "Doctor")
            {
                var doctor = _context.Doctors
                    .FirstOrDefault(
                        d => d.UserId == user.Id
                    );

                if (doctor == null)
                    return Forbid();


                if (
                    prescription.DoctorId !=
                    doctor.Id
                )
                {
                    return Forbid();
                }


                // Doctor cannot change ownership.

                prescription.DoctorId =
                    doctor.Id;
            }


            // Owner / Receptionist
            // Can change the doctor.

            else if (
                user.Role == "Owner" ||
                user.Role == "Receptionist"
            )
            {
                var doctorExists =
                    _context.Doctors.Any(
                        d =>
                            d.Id ==
                            updatedPrescription.DoctorId
                    );

                if (!doctorExists)
                {
                    return BadRequest(
                        "Doctor does not exist."
                    );
                }

                prescription.DoctorId =
                    updatedPrescription.DoctorId;
            }

            else
            {
                return Forbid();
            }


            // Make sure patient exists

            var patientExists =
                _context.Patients.Any(
                    p =>
                        p.Id ==
                        updatedPrescription.PatientId
                );

            if (!patientExists)
            {
                return BadRequest(
                    "Patient does not exist."
                );
            }


            prescription.PatientId =
                updatedPrescription.PatientId;

            prescription.Medicine =
                updatedPrescription.Medicine;

            prescription.Dosage =
                updatedPrescription.Dosage;

            prescription.Duration =
                updatedPrescription.Duration;


            _context.SaveChanges();


            return Ok(prescription);
        }


        // =========================================================
        // DELETE
        // =========================================================

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUser();

            if (user == null)
                return Unauthorized(
                    "You must be logged in."
                );


            // Only Owner can delete

            if (user.Role != "Owner")
                return Forbid();


            var prescription =
                _context.Prescriptions.Find(id);

            if (prescription == null)
                return NotFound(
                    "Prescription not found."
                );


            _context.Prescriptions.Remove(
                prescription
            );

            _context.SaveChanges();


            return Ok(
                "Prescription deleted successfully."
            );
        }
    }
}