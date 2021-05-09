using System;
using System.ComponentModel.DataAnnotations;

namespace lib_manager.Models
{
    public class BookModel
    {
        [Key]
        public int bookId { get; set; }
        //public int authorId { get; set; }
        public string authorName { get; set; }
        public string bookTitle { get; set; }
        public string description { get; set; }
        public string language { get; set; }
        public DateTime publicationDate { get; set; }
        public int pageCount { get; set; }
    }
}