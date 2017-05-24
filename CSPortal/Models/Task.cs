using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CSPortal.Models
{
    public class Task
    {
        [Key]
        public Guid Id { get; set; }
        //public string Customer { get; set; }
        public DateTime DateTask { get; set; }
        public string Title { get; set; }
        //public string Operator { get; set; }
        public string Status { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Operator Operator { get; set; }
    }
}