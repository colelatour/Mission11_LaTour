using Microsoft.EntityFrameworkCore;

namespace Mission11_LaTour.API.Data;

// Sets up the connection between Entity Framework and our database
public class BookDbContext : DbContext
{
    // Pass database configuration options to the base DbContext class
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }

    // Represents the Books table in the database
    public DbSet<Book> Books { get; set; }
}