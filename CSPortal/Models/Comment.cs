using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CSPortal.Models
{
    public class Comment
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime DateComment { get; set; }
        public string Text { get; set; }
        public Guid TaskID { get; set; }
        public string AuthorID { get; set; }

        public virtual Task Task { get; set; }
        public virtual ApplicationUser Author { get; set; }
    }
}