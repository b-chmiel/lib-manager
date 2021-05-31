using System;
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
            var temp = CheckBook(bookData.bookTitle);
            if (temp == null)
            {
                var book = CreateBook(bookData);
                book.bookCount = 1;
                _context.BookList.Add(book);
                _context.SaveChanges();
                response = StatusCode(201, "Book Added Successfully");
            }
            return response;
        }

        [HttpGet("{bookId}")]
        public IActionResult GetBook(int bookId)
        {
            return Ok(_context.BookList.FirstOrDefault(x => x.bookId == bookId));
        }
        
        [HttpGet("{title}")]
        private BookModel SearchBook(string title)
        {
            return _context.BookList.FirstOrDefault(x => x.bookTitle.Equals(title));
        }
        
        private BookModel CheckBook(string title)
        {
            return _context.BookList.FirstOrDefault(x => x.bookTitle.Equals(title));
        }
        
        private BookModel CreateBook(BookModel bookData)
        {
            return new BookModel{bookId = bookData.bookId, bookTitle = bookData.bookTitle, authorName = bookData.authorName, 
                description = bookData.description,language = bookData.language, pageCount = bookData.pageCount, publicationDate = bookData.publicationDate, bookCount = bookData.bookCount};

        }

        [HttpPost("SetCount")]
        public IActionResult SetBookCount(int bookiD, int bookCount)
        {
            var book = _context.BookList.First(x => x.bookId == bookiD);
            book.bookCount = bookCount;
            _context.SaveChanges();
            return StatusCode(200, "Book Entry Altered");
        }

        
        [HttpPost("Edit")]
        public IActionResult EditBook([FromBody] BookModel bookData)
        {
            IActionResult response = StatusCode(200, "Book Entry Altered");
            var book = CreateBook(bookData);
            DeleteBook(bookData.bookId);
            _context.Add(book);
            _context.SaveChanges();
            return response;
        }
        
        [HttpDelete ("Delete")]
        public IActionResult DeleteBook(int bookId)
        {
            IActionResult response = StatusCode(202, "Book Entry Removed");
            _context.Remove(_context.BookList.Single(x => x.bookId == bookId));
            _context.SaveChanges();
            return response;
        }
        
        [HttpGet("BookList")]
        public IActionResult Books()
        {
            //Console.WriteLine(_context.BookList.ToList());
            IActionResult response = Ok(_context.BookList.ToList());
            return response;
        }

        [HttpGet("BookTotal")]
        public int TotalBooks()
        {
            int total = 0;
            foreach (var book in _context.BookList)
            {
                total += book.bookCount;
            }

            return total;
        }

    }
}