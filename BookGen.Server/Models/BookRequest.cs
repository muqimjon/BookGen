namespace BookGen.Server.Models;

public class BookRequest
{
    public string Language { get; set; } = default!;
    public int Seed { get; set; }
    public double LikesAvg { get; set; }
    public double ReviewsAvg { get; set; }
    public int Page { get; set; }
}
