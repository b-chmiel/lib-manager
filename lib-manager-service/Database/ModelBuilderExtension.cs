using lib_manager.Models;
using Microsoft.EntityFrameworkCore;

namespace lib_manager.Database
{
    public static class ModelBuilderExtension
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
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
                }); 
        }
    }
}