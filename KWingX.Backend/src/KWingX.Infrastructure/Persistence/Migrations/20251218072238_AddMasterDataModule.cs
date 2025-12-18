using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KWingX.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMasterDataModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Roles_NormalizedName",
                table: "Roles");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "TemplateTags",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "TemplateCategories",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_TemplateTags_Name",
                table: "TemplateTags",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TemplateTags_Name",
                table: "TemplateTags");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "TemplateTags");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "TemplateCategories");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Roles_NormalizedName",
                table: "Roles",
                column: "NormalizedName",
                unique: true);
        }
    }
}
