namespace BookGen.Server.Models;

public class Book
{
    public int Index { get; set; }
    public string ISBN { get; set; } = default!;
    public string Title { get; set; } = default!;
    public string Author { get; set; } = default!;
    public string Publisher { get; set; } = default!;
    public int Likes { get; set; }
    public int Reviews { get; set; }
    public string Description { get; internal set; } = string.Empty;
    public string CoverImageUrl { get; set; } = string.Empty;
}
