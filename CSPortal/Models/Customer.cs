using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSPortal.Models
{
    public class Customer : IdentityUser
    {
        public virtual ICollection<Task> Task { get; set; }
    }
}