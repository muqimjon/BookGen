namespace BookGen.Server.Services;

using BookGen.Server.Models;
using Bogus;

public class BookService
{
    public List<Book> GenerateBooks(BookRequest request, int pageSize = 20)
    {
        var combinedSeed = request.Seed + request.Page;
        Randomizer.Seed = new Random(combinedSeed);

        if (!SupportedLocalesProvider.SupportedLocales.Exists(l => l.Code.Equals(request.Language, StringComparison.OrdinalIgnoreCase)))
            throw new ArgumentException($"Locale '{request.Language}' is not supported.");

        var faker = new Faker(request.Language);

        var books = new List<Book>();
        for (int i = 0; i < pageSize; i++)
        {
            var index = (request.Page - 1) * pageSize + i + 1;
            var title = faker.Lorem.Sentence(3);
            var author = faker.Name.FullName();

            var seed = (title + author).GetHashCode().ToString();

            books.Add(new Book
            {
                Index = index,
                ISBN = faker.Random.Replace("###-#-##-######-#"),
                Title = title,
                Author = author,
                Publisher = faker.Company.CompanyName(),
                Likes = GetProbabilisticValue(request.LikesAvg),
                Reviews = GetProbabilisticValue(request.ReviewsAvg),
                Description = faker.Lorem.Paragraph(9),
                CoverImageUrl = $"https://picsum.photos/seed/{seed}/200/300"
            });
        }
        return books;
    }
    private static int GetProbabilisticValue(double avg)
    {
        int floor = (int)Math.Floor(avg);
        double prob = avg - floor;
        return floor + (Randomizer.Seed.NextDouble() < prob ? 1 : 0);
    }
}
