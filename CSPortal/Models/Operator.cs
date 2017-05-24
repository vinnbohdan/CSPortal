using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace CSPortal.Models
{
    public class Operator: IdentityUser
    {
        public virtual ICollection<Task> Task { get; set; }
    }
}