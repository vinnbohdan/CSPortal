using CSPortal.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

public class dbContext : IdentityDbContext<IdentityUser>
{
    public dbContext()
        : base("CSPortalDBase")
    {
    }
    public virtual DbSet<Comment> Comment { get; set; }
    public virtual DbSet<Task> Task { get; set; }
}