using CSPortal.Models;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.Reflection.Emit;

public class dbContext : IdentityDbContext<IdentityUser>
{
    public dbContext()
        : base("CSPortalDBase")
    {
    }
    public virtual DbSet<Comment> Comment { get; set; }
    public virtual DbSet<Task> Task { get; set; }
    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Task>()
                    .HasRequired(x => x.Customer)
                    .WithMany(y => y.TaskCust)
                    .HasForeignKey(x => x.CustomerID)
                    .WillCascadeOnDelete(false);
        modelBuilder.Entity<Task>()
                    .HasRequired(x => x.Operator)
                    .WithMany(y => y.TaskOper)
                    .HasForeignKey(x => x.OperatorID)
                    .WillCascadeOnDelete(false);
        modelBuilder.Entity<Comment>()
                    .HasRequired(x => x.Task)
                    .WithMany(y => y.CommentTask)
                    .HasForeignKey(x => x.TaskID)
                    .WillCascadeOnDelete(false);
        modelBuilder.Entity<Comment>()
                    .HasRequired(x => x.Author)
                    .WithMany(y => y.CommentAuth)
                    .HasForeignKey(x => x.AuthorID)
                    .WillCascadeOnDelete(false);
    }
}