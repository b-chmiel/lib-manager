using System;
using System.Collections.Generic;
using System.Linq;
using lib_manager.Database;
using lib_manager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace lib_manager.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : Controller
    {
        private IConfiguration _config;
        private ReservationContext _contextR;
        private BookContext _contextB;

        public ReservationController(IConfiguration config, ReservationContext contextR, BookContext contextB)
        {
            _config = config;
            _contextR = contextR;
            _contextB = contextB;
        }

        [HttpGet("GetR/{reservationId}")]
        private ReservationModel GetReservation(int rId)
        {
            return _contextR.ReservationList.FirstOrDefault(x => x.reservationID == rId);
        }

        [HttpPost("CreateR")]

        public IActionResult CreateReservation(int bookId, string username)
        {
            IActionResult response = StatusCode(201, "Reservation Created");
            var temp = new ReservationModel { bookId = bookId, username = username, reservationStart = DateTime.Now };
            Console.WriteLine(temp.reservationEnd);
            _contextR.Add(temp);
            _contextR.SaveChanges();
            return response;
        }

        [HttpPost("CloseR")]
        public void CloseReservation(int reservationId)
        {
            var item = _contextR.ReservationList.FirstOrDefault(i => i.reservationID == reservationId);
            item.reservationEnd = DateTime.Now;
            DeleteReservation(reservationId);
            _contextR.Add(item);
            _contextR.SaveChanges();
        }

        [HttpDelete("DeleteR")]
        public IActionResult DeleteReservation(int reservationId)
        {
            var toDelete = _contextR.ReservationList.SingleOrDefault(x => x.reservationID == reservationId);

            if (toDelete != null)
            {
                _contextR.Remove(toDelete);
                _contextR.SaveChanges();
                return StatusCode(200, "Reservation Deleted");
            }

            return StatusCode(404, "Not found");
        }

        [HttpGet("BooksAvail")]
        public IActionResult BooksAvailable(int bookId)
        {
            var query = _contextB.BookList.First(x => x.bookId == bookId);
            int total = query.bookCount;
            int reserved = _contextR.ReservationList.Select(x => x.bookId == bookId).ToList().Count;
            return Ok(total - reserved);
        }


        [HttpGet("GetAllReserves")]
        public List<ReservationModel> GetAll()
        {
            return _contextR.ReservationList.ToList();
        }
        
        [HttpGet("GetUserReserves")]

        public List<ReservationModel> GetAll(string username)
        {
            return _contextR.ReservationList.Where(x => x.username.Equals(username)).ToList();
        }

        [HttpGet ("ReserveStats")]
        public IActionResult ReservationStats()
        {
            int totalR = _contextR.ReservationList.Count();
            var temp = new DateTime();
            var temp2 = _contextR.ReservationList.Where(x => x.reservationEnd == temp).ToList();
            return Ok("Total Reservation=" + totalR + " Active Reservations=" + temp2.Count());
        }
    }
}