using Microsoft.EntityFrameworkCore.Migrations;

namespace lib_manager.Migrations.Reservation
{
    public partial class Conflict : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userId",
                table: "ReservationList",
                newName: "username");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "username",
                table: "ReservationList",
                newName: "userId");
        }
    }
}
