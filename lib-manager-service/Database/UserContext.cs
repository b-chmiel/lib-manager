using lib_manager.Models;
using Microsoft.EntityFrameworkCore;

namespace lib_manager.Database
{
    
    public class UserContext: DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }
        public DbSet<UserModel> userList{ get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder) { 
            //modelBuilder.Fill();            
        }
    }
    
}

