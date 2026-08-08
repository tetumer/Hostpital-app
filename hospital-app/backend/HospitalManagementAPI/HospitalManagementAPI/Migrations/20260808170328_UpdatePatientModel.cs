using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePatientModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Patients");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AdmissionDate",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Allergies",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Coverage",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DateOfBirth",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmergencyContact",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MedicalHistory",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PolicyNumber",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Provider",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "AdmissionDate",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Allergies",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Coverage",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "EmergencyContact",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "MedicalHistory",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "PolicyNumber",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Provider",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Patients");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Patients",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
