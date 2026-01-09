using KWingX.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KWingX.Infrastructure.Persistence.Configurations;

public class BlogPostConfiguration : IEntityTypeConfiguration<BlogPost>
{
    public void Configure(EntityTypeBuilder<BlogPost> builder)
    {
        builder.ToTable("BlogPosts");

        builder.HasKey(b => b.Id);

        // Indexes
        builder.HasIndex(b => b.Slug).IsUnique();
        builder.HasIndex(b => new { b.Status, b.CreatedAt });
        builder.HasIndex(b => b.PublishedAt);

        // Properties
        builder.Property(b => b.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(b => b.Slug)
            .IsRequired()
            .HasMaxLength(250);

        builder.Property(b => b.ShortDescription)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(b => b.ContentHtml)
            .IsRequired()
            .HasColumnType("text");

        builder.Property(b => b.ContentJson)
            .HasColumnType("text");

        builder.Property(b => b.CoverImageUrl)
            .HasMaxLength(1000);

        builder.Property(b => b.ButtonLinkUrl)
            .HasMaxLength(1000);

        builder.Property(b => b.ButtonText)
            .HasMaxLength(100);

        builder.Property(b => b.ButtonColor)
            .IsRequired()
            .HasMaxLength(7)
            .HasDefaultValue("#111111");

        builder.Property(b => b.ButtonTextColor)
            .IsRequired()
            .HasMaxLength(7)
            .HasDefaultValue("#FFFFFF");

        builder.Property(b => b.Status)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(50);

        builder.Property(b => b.PublishedAt)
            .IsRequired(false);

        // Legacy fields (for migration compatibility)
        builder.Property(b => b.Excerpt)
            .HasMaxLength(500);

        builder.Property(b => b.ContentMd)
            .HasColumnType("text");

        builder.Property(b => b.CoverImage)
            .HasMaxLength(1000);

        builder.Property(b => b.Category)
            .HasMaxLength(100);

        builder.Property(b => b.TagsCsv)
            .HasMaxLength(500);
    }
}

