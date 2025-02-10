namespace Mood_Music.Server.Models
{
    public class LastFmModel
    {
        public required string Name { get; set; }
        public required string Url { get; set; }
        public required string ArtistName { get; set; }
        public required string ArtistUrl { get; set; }
        public string? Image { get; set; }
    }
}
