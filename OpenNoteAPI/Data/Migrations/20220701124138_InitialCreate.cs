using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OpenNoteAPI.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "Id", "Content", "CreatedTime", "ModifiedTime", "Title" },
                values: new object[,]
                {
                    { 1, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, qui.", new DateTime(2022, 7, 1, 15, 41, 37, 965, DateTimeKind.Local).AddTicks(686), new DateTime(2022, 7, 1, 15, 41, 37, 965, DateTimeKind.Local).AddTicks(697), "Sample Note 1" },
                    { 2, "Doloribus ea impedit magnam maiores voluptatem consequuntur quo soluta fuga.", new DateTime(2022, 7, 1, 15, 41, 37, 965, DateTimeKind.Local).AddTicks(700), new DateTime(2022, 7, 1, 15, 41, 37, 965, DateTimeKind.Local).AddTicks(701), "Sample Note 2" },
                    { 3, "Error, quis laborum hic doloremque eaque ratione quos cum autem.", new DateTime(2022, 7, 1, 15, 41, 37, 965, DateTimeKind.Local).AddTicks(786), new DateTime(2022, 7, 1, 15, 41, 37, 965, DateTimeKind.Local).AddTicks(787), "Sample Note 3" },
                    { 4, "Error doloribus saepe animi natus laboriosam fugit neque harum quae", new DateTime(2022, 7, 1, 15, 41, 37, 965, DateTimeKind.Local).AddTicks(788), new DateTime(2022, 7, 1, 15, 41, 37, 965, DateTimeKind.Local).AddTicks(789), "Sample Note 4" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notes");
        }
    }
}
