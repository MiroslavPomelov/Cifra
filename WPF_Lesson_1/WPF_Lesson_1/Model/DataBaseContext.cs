using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace WPF_Lesson_1.Model
{
    public class DataBaseContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;

        public DataBaseContext()/*(DbContextOptions<DatabaseContext> options) : base(options)*/
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var servVers = new MySqlServerVersion(new Version(8, 0, 25));
            optionsBuilder.UseMySql("server=192.168.10.170;database=remote_database;user=cifra-student-remote;password=Cifra39", servVers);
        }

        public override void Dispose()
        {
            base.Dispose();
        }
    }
}
