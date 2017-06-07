using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CSPortal.Models
{
    public class Task
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime DateTask { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string OperatorID { get; set; }
        public string CustomerID { get; set; }

        public virtual ICollection<Comment> CommentTask { get; set; }
        public virtual ApplicationUser Customer { get; set; }
        public virtual ApplicationUser Operator { get; set; }
    }
}