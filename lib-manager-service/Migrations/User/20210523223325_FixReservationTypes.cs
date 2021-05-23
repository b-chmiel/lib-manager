using Microsoft.EntityFrameworkCore.Migrations;

namespace lib_manager.Migrations.User
{
    public partial class FixReservationTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserList",
                columns: table => new
                {
                    username = table.Column<string>(type: "text", nullable: false),
                    password = table.Column<string>(type: "text", nullable: true),
                    role = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserList", x => x.username);
                });

            migrationBuilder.InsertData(
                table: "UserList",
                columns: new[] { "username", "password", "role" },
                values: new object[,]
                {
                    { "test1@gmail.com", "123", 0 },
                    { "thepope@gmail.com", "blessyou", 1 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserList");
        }
    }
}
