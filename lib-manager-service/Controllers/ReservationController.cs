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
        
        public IActionResult CreateReservation(int bookId, int userId)
        {
            IActionResult response = StatusCode(200,"Book Entry Altered");//which code?
            var temp = new ReservationModel{bookId = bookId, userId = userId, reservationStart = DateTime.Now};
            _context.Add(temp);
            _context.SaveChanges();
            return response;
        }
        
        [HttpPost ("GetReserves")]
        
        public IActionResult GetAll(int userId)
        {
            IActionResult response = StatusCode(200,"Book Entry Altered");//which code?
            var biggerResult = _context.ReservationList.Where( x => x.userId==userId ).ToList();
            return response;
        }
        
        
    }
}