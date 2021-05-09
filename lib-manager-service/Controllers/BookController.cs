using System.Linq;
using lib_manager.Database;
using lib_manager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace lib_manager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private IConfiguration _config;
        private BookContext _context;
        
        public BookController(IConfiguration config, BookContext context)
        {
            _config = config;
            _context = context;
        }

        
        [AllowAnonymous]
        [HttpPost("Add")]
        
        public IActionResult AddBook([FromBody] BookModel bookData)
        {
            IActionResult response = StatusCode(409, "Book Already Exists");
            var temp = CheckBook(bookData);
            if (temp == null)
            {
                _context.BookList.Add(CreateBook(bookData));
                _context.SaveChanges();
                response = StatusCode(201, "Book Added Successfully");
            }
            return response;
        }

        private BookModel CheckBook(BookModel data)
        {
            return _context.BookList.FirstOrDefault(x => x.bookId == data.bookId);
        }
        
        private BookModel CreateBook(BookModel bookData)
        {
            return new BookModel{bookId = bookData.bookId, bookTitle = bookData.bookTitle, authorName = bookData.authorName, 
                description = bookData.description,language = bookData.language, pageCount = bookData.pageCount, publicationDate = bookData.publicationDate};
        }
        
        [AllowAnonymous]
        [HttpPost ("Edit")]
        
        public IActionResult EditBook([FromBody] BookModel bookData)
        {
            IActionResult response = StatusCode(200,"Book Entry Altered");
            var user = CreateBook(bookData);
            DeleteBook(bookData);
            _context.Add(user);
            _context.SaveChanges();
            return response;
        }
        
        [AllowAnonymous]
        [HttpPost ("Delete")]
        
        public IActionResult DeleteBook([FromBody] BookModel bookData)
        {
            IActionResult response = StatusCode(204,"Book Entry Removed");
            _context.Remove(bookData);
            _context.SaveChanges();
            return response;
        }

        [HttpGet("BookList")]
        public IActionResult Books()
        {
            IActionResult response = Ok(_context.BookList.ToList());
            return response;
        }
        
        
        
    }
}