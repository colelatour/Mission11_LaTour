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

    // GET endpoint that returns a paginated list of books, with optional sorting
    [HttpGet("AllBooks")]
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string? sortBy = null, [FromQuery] List<string>? category = null)
    {
        // Start with all books
        var query = _bookContext.Books.AsQueryable();

        // Sort by title if requested
        if (sortBy == "title")
        {
            query = query.OrderBy(b => b.Title);
        }
        
        if (category != null && category.Any())
        {
            query = query.Where(b => category.Contains(b.Category));
        }
        
        var totalNumBooks = query.Count();

        // Skip books from previous pages and take only the amount for the current page
        var something = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        // Get total count of books in the database

        // Return both the books and total count so the frontend can build pagination
        var someObject = new
        {
            Books = something,
            TotalNumBooks = totalNumBooks
        };
        return Ok(someObject);

    }

    [HttpGet("GetBookCategories")]
    public IActionResult GetBookCategories()
    {
        var bookTypes = _bookContext.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
        
        return Ok(bookTypes);
    }

}