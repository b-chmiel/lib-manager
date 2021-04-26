using System.ComponentModel.DataAnnotations;

namespace lib_manager.Models
{

    public class UserModel
    {
        
        public enum Role
        {
            User,
            Administrator
        }
        [Key]
        public string username { get; set; }
        public string password { get; set; }
        
        public Role role { get; set; }
    }
}