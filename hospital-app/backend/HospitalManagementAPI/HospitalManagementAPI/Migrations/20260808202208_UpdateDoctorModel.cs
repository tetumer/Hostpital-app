using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDoctorModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Doctors");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Doctors",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DateOfBirth",
                table: "Doctors",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "Department",
                table: "Doctors",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Doctors",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Doctors",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LicenseNumber",
                table: "Doctors",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Doctors",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "Department",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "LicenseNumber",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Doctors");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Doctors",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
