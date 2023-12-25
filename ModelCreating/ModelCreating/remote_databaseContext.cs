using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ModelCreating
{
    public partial class remote_databaseContext : DbContext
    {
        public remote_databaseContext()
        {
        }

        public remote_databaseContext(DbContextOptions<remote_databaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Fruit> Fruits { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Userfruit> Userfruits { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=192.168.10.170;database=remote_database;user=cifra-student-remote;password=Cifra39", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.11.4-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_general_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Fruit>(entity =>
            {
                entity.ToTable("fruits");

                entity.HasIndex(e => e.Variety, "variety")
                    .IsUnique();

                entity.Property(e => e.Fruitid)
                    .HasColumnType("int(11)")
                    .ValueGeneratedNever()
                    .HasColumnName("fruitid");

                entity.Property(e => e.Color)
                    .HasMaxLength(50)
                    .HasColumnName("color");

                entity.Property(e => e.Fruitname)
                    .HasMaxLength(50)
                    .HasColumnName("fruitname");

                entity.Property(e => e.Taste)
                    .HasMaxLength(50)
                    .HasColumnName("taste");

                entity.Property(e => e.Variety)
                    .HasMaxLength(50)
                    .HasColumnName("variety");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Username, "username")
                    .IsUnique();

                entity.Property(e => e.Userid)
                    .HasColumnType("int(11)")
                    .ValueGeneratedNever()
                    .HasColumnName("userid");

                entity.Property(e => e.Age)
                    .HasColumnType("int(11)")
                    .HasColumnName("age");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Firstname)
                    .HasMaxLength(50)
                    .HasColumnName("firstname");

                entity.Property(e => e.Lastname)
                    .HasMaxLength(50)
                    .HasColumnName("lastname");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<Userfruit>(entity =>
            {
                entity.ToTable("userfruits");

                entity.HasIndex(e => e.Fruitid, "fruitid");

                entity.HasIndex(e => e.Userid, "userid");

                entity.Property(e => e.Userfruitid)
                    .HasColumnType("int(11)")
                    .ValueGeneratedNever()
                    .HasColumnName("userfruitid");

                entity.Property(e => e.Fruitid)
                    .HasColumnType("int(11)")
                    .HasColumnName("fruitid");

                entity.Property(e => e.Userid)
                    .HasColumnType("int(11)")
                    .HasColumnName("userid");

                entity.HasOne(d => d.Fruit)
                    .WithMany(p => p.Userfruits)
                    .HasForeignKey(d => d.Fruitid)
                    .HasConstraintName("userfruits_ibfk_2");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Userfruits)
                    .HasForeignKey(d => d.Userid)
                    .HasConstraintName("userfruits_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
