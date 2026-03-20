using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Mvc;
using Mission11_LaTour.API.Data;

namespace Mission11_LaTour.API.Controllers;

// Handles all book-related API requests
[Route("[controller]")]
[ApiController]
public class BookController : ControllerBase
{
    private BookDbContext _bookContext;

    // Inject the database context so we can access book data
    public BookController(BookDbContext temp) => _bookContext = temp;

    // GET endpoint that returns a paginated list of books
    [HttpGet("AllBooks")]
    public IActionResult GetBooks(int pageSize = 10, int pageNum = 1)
    {
        // Skip books from previous pages and take only the amount for the current page
        var something = _bookContext.Books
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        // Get total count of books in the database
        var totalNumBooks = _bookContext.Books.Count();

        // Return both the books and total count so the frontend can build pagination
        var someObject = new
        {
            Books = something,
            TotalNumBooks = totalNumBooks
        };
        return Ok(someObject);

    }

}