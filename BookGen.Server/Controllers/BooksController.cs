namespace BookGen.Server.Controllers;

using BookGen.Server.Models;
using BookGen.Server.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
public class BooksController(BookService service) : ControllerBase
{
    [HttpGet("locales")]
    public IActionResult GetSupportedLocales()
    {
        var locales = SupportedLocalesProvider.SupportedLocales
            .Select(l => new { l.Code, l.Name })
            .ToList();

        return Ok(locales);
    }

    [HttpPost("books")]
    public IActionResult GetBooks([FromBody] BookRequest request)
    {
        var books = service.GenerateBooks(request);
        return Ok(books);
    }
}
