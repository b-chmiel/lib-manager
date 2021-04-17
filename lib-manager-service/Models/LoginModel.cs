
using System.ComponentModel.DataAnnotations;

namespace lib_manager.Models
{

    public class UserModel
    {
        public string username { get; set; }
        public string password { get; set; }
        [Display(Name = "Is administrator")]
        public bool IsAdministrator { get; set; }

        [Display(Name = "Is user")]
        public bool IsUser { get; set; }
    }
}