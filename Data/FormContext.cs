using Microsoft.EntityFrameworkCore;
using FormBuilderApp.Models;

namespace FormBuilderApp.Data
{
    public class FormContext : DbContext
    {
        public FormContext(DbContextOptions<FormContext> options) : base(options) { }

        public DbSet<SubmittedForm> SubmittedForms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SubmittedForm>()
                .Property(f => f.SubmissionDate)
<<<<<<< HEAD
                .HasDefaultValueSql("getdate()");
=======
                .HasDefaultValueSql("getdate()"); // Set default value to current time
>>>>>>> 34604b3fb1b44440c4f15b94ba0ee5e9b4d8f434
        }
    }
}
