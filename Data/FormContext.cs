using Microsoft.EntityFrameworkCore;

public class FormContext : DbContext
{
    public FormContext(DbContextOptions<FormContext> options) : base(options) { }

    public DbSet<FormModel> Forms { get; set; }
    public DbSet<SubmittedForm> SubmittedForms { get; set; } // New DbSet for submitted forms
}