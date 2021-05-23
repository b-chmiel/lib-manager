using lib_manager.Models;
using Microsoft.EntityFrameworkCore;

namespace lib_manager.Database
{

    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        public DbSet<UserModel> UserList { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserModel>().HasData(
                            new UserModel()
                            {
                                username = "test1@gmail.com",
                                password = "123",
                                role = UserModel.Role.User
                            }, new UserModel()
                            {
                                username = "thepope@gmail.com",
                                password = "blessyou",
                                role = UserModel.Role.Administrator
                            }, new UserModel()
                            {
                                username = "librarian",
                                password = "password",
                                role = UserModel.Role.Administrator
                            }, new UserModel()
                            {
                                username = "reader",
                                password = "password",
                                role = UserModel.Role.User
                            });
        }
    }

}

