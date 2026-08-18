using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class LinkUsersToDoctorsAndPatients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Patients",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Doctors",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Doctors");
        }
    }
}
