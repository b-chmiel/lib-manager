using System.Linq;
using lib_manager.Database;
using lib_manager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Extensions;

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

        
        
        [HttpPost("Add")]
        public IActionResult AddBook([FromBody] BookModel bookData)
        {
            IActionResult response = StatusCode(409, "Book Already Exists");
            var temp = GetBook(bookData.bookId);
            if (temp == null)
            {
                _context.BookList.Add(CreateBook(bookData));
                _context.SaveChanges();
                response = StatusCode(201, "Book Added Successfully");
            }
            return response;
        }
        
        private int CountBook(string bookName)
        {
            return _context.BookList.Count(x => x.bookTitle.Equals(bookName));
        }
        
        [HttpGet("{bookId}")]
        private BookModel GetBook(int bookId)
        {
            return _context.BookList.FirstOrDefault(x => x.bookId == bookId);
        }
        
        private BookModel CreateBook(BookModel bookData)
        {
            return new BookModel{bookId = bookData.bookId, bookTitle = bookData.bookTitle, authorName = bookData.authorName, 
                description = bookData.description,language = bookData.language, pageCount = bookData.pageCount, publicationDate = bookData.publicationDate, bookCount = CountBook(bookData.bookTitle)};
        }
        
        [AllowAnonymous]
        [HttpPost ("Edit")]
        
        public IActionResult EditBook([FromBody] BookModel bookData)
        {
            IActionResult response = StatusCode(200,"Book Entry Altered");
            var user = CreateBook(bookData);
            DeleteBook(bookData.bookId);
            _context.Add(user);
            _context.SaveChanges();
            return response;
        }
        
        [AllowAnonymous]
        [HttpPost ("Delete")]
        public IActionResult DeleteBook(int bookId)
        {
            IActionResult response = StatusCode(204,"Book Entry Removed");
            _context.Remove(_context.BookList.Single(x => x.bookId == bookId));
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