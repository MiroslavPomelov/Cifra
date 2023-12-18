using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Theme_32_Lesson_3_DataBaseOperating
{
    public partial class TitanicPassengersContext : DbContext
    {
        public TitanicPassengersContext()
        {
        }

        public TitanicPassengersContext(DbContextOptions<TitanicPassengersContext> options)
            : base(options)
        {
        }


        public virtual DbSet<Passenger> Passengers { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlite("Data Source=C:\\Users\\C4PC2\\Documents\\MirPo\\Cifra\\Theme_32_Lesson_3_DataBaseOperating\\Theme_32_Lesson_3_DataBaseOperating\\bin\\Debug\\net6.0\\TitanicPassengers.db");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
