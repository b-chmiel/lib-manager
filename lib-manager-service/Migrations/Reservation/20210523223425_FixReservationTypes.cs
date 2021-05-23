using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace lib_manager.Migrations.Reservation
{
    public partial class FixReservationTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReservationList",
                columns: table => new
                {
                    reservationID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    bookId = table.Column<int>(type: "integer", nullable: false),
                    userId = table.Column<string>(type: "text", nullable: true),
                    reservationStart = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    reservationEnd = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationList", x => x.reservationID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationList");
        }
    }
}
