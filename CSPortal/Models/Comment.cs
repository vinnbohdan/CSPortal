using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CSPortal.Models
{
    public class Comment
    {
        [Key]
        public Guid Id { get; set; }
        //public string TaskId { get; set; }
        public DateTime DateComment { get; set; }
        //public string UserId { get; set; }
        public string Text { get; set; }
        public virtual Task Task { get; set; }
        public virtual Author Author { get; set; }
    }
}