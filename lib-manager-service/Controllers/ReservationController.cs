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
        private ReservationContext _context;

        public ReservationController(IConfiguration config, ReservationContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpGet("GetR/{reservationId}")]
        private ReservationModel GetReservation(int rId)
        {
            return _context.ReservationList.FirstOrDefault(x => x.reservationID == rId);
        }

        [HttpPost("CreateR")]

        public IActionResult CreateReservation(int bookId, string username)
        {
            IActionResult response = StatusCode(201, "Reservation Created");
            var temp = new ReservationModel { bookId = bookId, username = username, reservationStart = DateTime.Now };
            _context.Add(temp);
            _context.SaveChanges();
            return response;
        }

        [HttpDelete("CloseR")]
        public void CloseReservation(int reservationId)
        {
            var item = _context.ReservationList.FirstOrDefault(i => i.reservationID == reservationId);
            item.reservationEnd = DateTime.Now;
            DeleteReservation(reservationId);
            _context.Add(item);
            _context.SaveChanges();
        }

        [HttpDelete("DeleteR")]
        public IActionResult DeleteReservation(int reservationId)
        {
            var toDelete = _context.ReservationList.SingleOrDefault(x => x.reservationID == reservationId);

            if (toDelete != null)
            {
                _context.Remove(toDelete);
                _context.SaveChanges();
                return StatusCode(200, "Reservation Deleted");
            }

            return StatusCode(404, "Not found");
        }


        [HttpGet("GetReserves")]

        public List<ReservationModel> GetAll(string username)
        {
            return _context.ReservationList.Where(x => x.username.Equals(username)).ToList();

        }
    }
}