using Microsoft.AspNetCore.Mvc;
using Mission11_LaTour.API.Data;

namespace Mission11_LaTour.API.Controllers;

[Route("[controller]")]
[ApiController]
public class BookController : ControllerBase
{
    private BookDbContext _bookContext;

    public BookController(BookDbContext temp) => _bookContext = temp;

    [HttpGet("AllBooks")]
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookCategories = null)
    {
        var query = _bookContext.Books.AsQueryable();

        if (bookCategories != null && bookCategories.Any())
        {
            query = query.Where(b => b.Category != null && bookCategories.Contains(b.Category));
        }

        var totalNumBooks = query.Count();

        var books = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var result = new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        };
        return Ok(result);
    }

    [HttpGet("GetBookCategories")]
    public IActionResult GetBookCategories()
    {
        var categories = _bookContext.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();

        return Ok(categories);
    }

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book book)
    {
        _bookContext.Books.Add(book);
        _bookContext.SaveChanges();
        return Ok(book);
    }

    [HttpPut("UpdateBook/{bookId}")]
    public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
    {
        var existingBook = _bookContext.Books.Find(bookId);
        if (existingBook == null)
        {
            return NotFound(new { message = "Book not found" });
        }

        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.ISBN = updatedBook.ISBN;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;

        _bookContext.SaveChanges();
        return Ok(existingBook);
    }

    [HttpDelete("DeleteBook/{bookId}")]
    public IActionResult DeleteBook(int bookId)
    {
        var book = _bookContext.Books.Find(bookId);
        if (book == null)
        {
            return NotFound(new { message = "Book not found" });
        }

        _bookContext.Books.Remove(book);
        _bookContext.SaveChanges();
        return NoContent();
    }
}
