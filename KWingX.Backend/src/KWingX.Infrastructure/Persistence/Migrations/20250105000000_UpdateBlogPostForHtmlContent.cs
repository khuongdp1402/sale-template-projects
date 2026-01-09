using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KWingX.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBlogPostForHtmlContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add new columns
            migrationBuilder.AddColumn<string>(
                name: "ShortDescription",
                table: "BlogPosts",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ContentHtml",
                table: "BlogPosts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ContentJson",
                table: "BlogPosts",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CoverImageUrl",
                table: "BlogPosts",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ButtonLinkUrl",
                table: "BlogPosts",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ButtonText",
                table: "BlogPosts",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ButtonColor",
                table: "BlogPosts",
                type: "character varying(7)",
                maxLength: 7,
                nullable: false,
                defaultValue: "#111111");

            migrationBuilder.AddColumn<string>(
                name: "ButtonTextColor",
                table: "BlogPosts",
                type: "character varying(7)",
                maxLength: 7,
                nullable: false,
                defaultValue: "#FFFFFF");

            // Make PublishedAt nullable
            migrationBuilder.AlterColumn<DateTime>(
                name: "PublishedAt",
                table: "BlogPosts",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            // Migrate existing data: Copy Excerpt to ShortDescription, ContentMd to ContentHtml
            // Note: This SQL will run after columns are added with default values
            // Check if legacy columns exist before migrating data
            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                    -- Check and migrate Excerpt to ShortDescription if column exists
                    IF EXISTS (
                        SELECT 1 FROM information_schema.columns 
                        WHERE table_name = 'BlogPosts' AND column_name = 'Excerpt'
                    ) THEN
                        UPDATE ""BlogPosts""
                        SET ""ShortDescription"" = COALESCE(""Excerpt"", '')
                        WHERE ""ShortDescription"" = '' AND ""Excerpt"" IS NOT NULL;
                    END IF;

                    -- Check and migrate ContentMd to ContentHtml if column exists
                    IF EXISTS (
                        SELECT 1 FROM information_schema.columns 
                        WHERE table_name = 'BlogPosts' AND column_name = 'ContentMd'
                    ) THEN
                        UPDATE ""BlogPosts""
                        SET ""ContentHtml"" = COALESCE(""ContentMd"", '')
                        WHERE ""ContentHtml"" = '' AND ""ContentMd"" IS NOT NULL;
                    END IF;

                    -- Check and migrate CoverImage to CoverImageUrl if column exists
                    IF EXISTS (
                        SELECT 1 FROM information_schema.columns 
                        WHERE table_name = 'BlogPosts' AND column_name = 'CoverImage'
                    ) THEN
                        UPDATE ""BlogPosts""
                        SET ""CoverImageUrl"" = ""CoverImage""
                        WHERE ""CoverImageUrl"" IS NULL AND ""CoverImage"" IS NOT NULL;
                    END IF;
                END $$;
            ");

            // Note: IX_BlogPosts_Slug index already exists from previous migration (20251213060950_InitialCreate)
            // No need to create it again

            // Add index for status and created date
            migrationBuilder.CreateIndex(
                name: "IX_BlogPosts_Status_CreatedAt",
                table: "BlogPosts",
                columns: new[] { "Status", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_BlogPosts_PublishedAt",
                table: "BlogPosts",
                column: "PublishedAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BlogPosts_PublishedAt",
                table: "BlogPosts");

            migrationBuilder.DropIndex(
                name: "IX_BlogPosts_Status_CreatedAt",
                table: "BlogPosts");

            // Note: Don't drop IX_BlogPosts_Slug as it was created in previous migration

            migrationBuilder.AlterColumn<DateTime>(
                name: "PublishedAt",
                table: "BlogPosts",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.DropColumn(
                name: "ShortDescription",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "ContentHtml",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "ContentJson",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "CoverImageUrl",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "ButtonLinkUrl",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "ButtonText",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "ButtonColor",
                table: "BlogPosts");

            migrationBuilder.DropColumn(
                name: "ButtonTextColor",
                table: "BlogPosts");
        }
    }
}

