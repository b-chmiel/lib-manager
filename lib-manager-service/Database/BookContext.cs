using lib_manager.Models;
using Microsoft.EntityFrameworkCore;

namespace lib_manager.Database
{
    public class BookContext: DbContext
    {
        public BookContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        public DbSet<BookModel> BookList{ get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder) { 
            base.OnModelCreating(modelBuilder);
            modelBuilder.Seed();
        }
    }
}