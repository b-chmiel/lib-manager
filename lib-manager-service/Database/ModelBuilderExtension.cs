using System;
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
            
            modelBuilder.Entity<BookModel>().HasData(
                new BookModel()
                {
                    bookId = 1,
                    bookTitle = "Beyond Good And Evil",
                    authorName = "Friedrich Nietzsche",
                    description = "In Beyond Good and Evil, Nietzsche accuses past philosophers of lacking critical sense and blindly accepting " +
                                  "dogmatic premises in their consideration of morality. Specifically, he accuses them of founding grand metaphysical " +
                                  "systems upon the faith that the good man is the opposite of the evil man, rather than just a different expression of " +
                                  "the same basic impulses that find more direct expression in the evil man. The work moves into the realm " +
                                  "beyond good and evil in the sense of leaving behind the traditional morality which Nietzsche subjects to a destructive critique " +
                                  "in favour of what he regards as an affirmative approach that fearlessly confronts the perspectival nature of knowledge and the perilous " +
                                  "condition of the modern individual.",
                    language = "German",
                    publicationDate = new DateTime(1886, 6, 1),
                    pageCount = 939

                }, new BookModel()
                {
                    bookId = 2,
                    bookTitle = "The Metamorphosis",
                    authorName = "Franz Kafka",
                    description = "The Metamorphosis tells the story of salesman Gregor Samsa, who wakes one morning to find himself inexplicably transformed " +
                                  "into a huge insect and subsequently struggles to adjust to this new condition.",
                    language = "German",
                    publicationDate = new DateTime(1915, 6, 1),
                    pageCount = 58
                }); 
        }
    }
}