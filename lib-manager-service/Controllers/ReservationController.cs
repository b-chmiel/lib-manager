using System;
using System.Linq;
using lib_manager.Database;
using lib_manager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace lib_manager.Controllers
{
    public class ReservationController : Controller
    {
        private IConfiguration _config;
        private ReservationContext _context;
        
        public ReservationController(IConfiguration config, ReservationContext context)
        {
            _config = config;
            _context = context;
        }
        
        [HttpGet("{reservationId}")]
        private ReservationModel GetReservation(int rId)
        {
            return _context.ReservationList.FirstOrDefault(x => x.reservationID == rId);
        }
        
        [HttpPost ("CreateR")]
        
        public IActionResult CreateReservation(int bookId, string username)
        {
            IActionResult response = StatusCode(201,"Reservation Created");
            var temp = new ReservationModel{bookId = bookId, username = username, reservationStart = DateTime.Now};
            _context.Add(temp);
            _context.SaveChanges();
            return response;
        }

        public void CloseReservation(int reservationId)
        {
            var item = _context.ReservationList.FirstOrDefault(i => i.reservationID == reservationId);
            item.reservationEnd = DateTime.Now;
            DeleteReservation(reservationId);
            _context.Add(item);
            _context.SaveChanges();
        }
        
        [HttpDelete ("DeleteR")]
        
        public IActionResult DeleteReservation(int reservationId)
        {
            IActionResult response = StatusCode(202,"Reservation Deleted");
            _context.Remove(_context.ReservationList.Single(x => x.reservationID == reservationId));
            _context.SaveChanges();
            return response;
        }
        
        
        
        [HttpPost ("GetReserves")]
        
        public IActionResult GetAll(string username)
        {
            IActionResult response = StatusCode(200,"Book Entry Altered");
            var biggerResult = _context.ReservationList.Where( x => x.username.Equals(username) ).ToList();
            return response;
        }
        
        
    }
}