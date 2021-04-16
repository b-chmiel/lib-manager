
using System.ComponentModel.DataAnnotations;

namespace lib_manager.Models
{

    public class UserModel
    {
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        [Display(Name = "Is administrator")]
        public bool IsAdministrator { get; set; }

        [Display(Name = "Is manager")]
        public bool IsManager { get; set; }
    }
}