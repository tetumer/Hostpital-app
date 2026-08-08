using Microsoft.EntityFrameworkCore;
using HospitalManagementAPI.Models;

namespace HospitalManagementAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<Billing> Billings { get; set; }
        public DbSet<BloodTest> BloodTests { get; set; }
        public DbSet<User> Users { get; set; }
       
    }
}