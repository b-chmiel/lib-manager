using Microsoft.EntityFrameworkCore.Migrations;

namespace lib_manager.Migrations.User
{
    public partial class Seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "UserList",
                columns: new[] { "username", "password", "role" },
                values: new object[,]
                {
                    { "librarian", "password", 1 },
                    { "reader", "password", 0 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserList",
                keyColumn: "username",
                keyValue: "librarian");

            migrationBuilder.DeleteData(
                table: "UserList",
                keyColumn: "username",
                keyValue: "reader");
        }
    }
}
