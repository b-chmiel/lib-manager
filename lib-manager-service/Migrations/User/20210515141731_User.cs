using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace lib_manager.Migrations.User
{
    public partial class User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookModel",
                columns: table => new
                {
                    bookId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    authorName = table.Column<string>(type: "text", nullable: true),
                    bookTitle = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    language = table.Column<string>(type: "text", nullable: true),
                    publicationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    pageCount = table.Column<int>(type: "integer", nullable: false),
                    bookCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookModel", x => x.bookId);
                });

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
                table: "BookModel",
                columns: new[] { "bookId", "authorName", "bookCount", "bookTitle", "description", "language", "pageCount", "publicationDate" },
                values: new object[,]
                {
                    { 1, "Friedrich Nietzsche", 0, "Beyond Good And Evil", "In Beyond Good and Evil, Nietzsche accuses past philosophers of lacking critical sense and blindly accepting dogmatic premises in their consideration of morality. Specifically, he accuses them of founding grand metaphysical systems upon the faith that the good man is the opposite of the evil man, rather than just a different expression of the same basic impulses that find more direct expression in the evil man. The work moves into the realm beyond good and evil in the sense of leaving behind the traditional morality which Nietzsche subjects to a destructive critique in favour of what he regards as an affirmative approach that fearlessly confronts the perspectival nature of knowledge and the perilous condition of the modern individual.", "German", 939, new DateTime(1886, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "Franz Kafka", 0, "The Metamorphosis", "The Metamorphosis tells the story of salesman Gregor Samsa, who wakes one morning to find himself inexplicably transformed into a huge insect and subsequently struggles to adjust to this new condition.", "German", 58, new DateTime(1915, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
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
                name: "BookModel");

            migrationBuilder.DropTable(
                name: "UserList");
        }
    }
}
