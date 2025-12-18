using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KWingX.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddBlogModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "BlogPosts",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "BlogPosts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "BlogPosts",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "BlogPosts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedAt",
                table: "BlogPosts",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "BlogPosts",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "ModifiedAt",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "BlogPosts");
        }
    }
}
