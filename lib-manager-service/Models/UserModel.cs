using System.ComponentModel.DataAnnotations;

namespace lib_manager.Models
{

    public class UserModel
    {
        
        public enum Role
        {
            Administrator,
            User
        }
        [Key]
        public string username { get; set; }
        public string password { get; set; }
        
        public Role role { get; set; }
    }
}