using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace CSPortal.Models
{
    public class Author : IdentityUser
    {
        public virtual ICollection<Comment> Comment { get; set; }
    }
}