using System;
using System.ComponentModel.DataAnnotations;

namespace lib_manager.Models
{
    public class ReservationModel
    {
        [Key]
        public int reservationID { get; set; }
        public int bookId { get; set; }
        public string username { get; set; }
        public DateTime reservationStart { get; set; }
        public DateTime reservationEnd { get; set; }
    }
}