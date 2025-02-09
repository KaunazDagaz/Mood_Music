using DotNetEnv;
using Mood_Music.Server.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Mood_Music.Server.Services
{
    public class LastFmService
    {
        private readonly HttpClient httpClient;
        private readonly string apiKey;
        private readonly string baseUrl;

        public LastFmService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
            this.apiKey = Env.GetString("LASTFM_API_KEY");
            this.baseUrl = Env.GetString("LASTFM_API_URL");
        }

        //need update before using
        public async Task<string> GetTopTracksByArtistAsync(string artist)
        {
            var url = $"{baseUrl}/?method=artist.gettoptracks&artist={artist}&api_key={apiKey}&format=json";
            var response = await httpClient.GetStringAsync(url);

            return response;
        }

        public async Task<List<LastFmModel>> GetTracksByTagsAsync(List<string> tags)
        {
            var tasks = new List<Task<string>>();

            foreach (var tag in tags)
            {
                var url = $"{baseUrl}?method=tag.gettoptracks&tag={tag}&api_key={apiKey}&format=json";
                tasks.Add(httpClient.GetStringAsync(url));
            }

            var responses = await Task.WhenAll(tasks);
            var mergedTracks = MergeTrackSearchResults(responses);

            return TrackParser(mergedTracks);
        }

        private string MergeTrackSearchResults(string[] responses)
        {
            var trackList = new List<dynamic>();
            var random = new Random();

            foreach (var response in responses)
            {
                var json = JObject.Parse(response);
                var tracks = json["tracks"]?["track"];
                if (tracks != null)
                {
                    trackList.AddRange(tracks);
                }
            }

            trackList = trackList.OrderBy(_ => random.Next()).Take(50).ToList();

            return JsonConvert.SerializeObject(trackList, Formatting.Indented);
        }

        private List<LastFmModel> TrackParser(string tracks)
        {
            var tracksJson = JArray.Parse(tracks);
            var parsedTracks = new List<LastFmModel>();

            foreach (var trackJson in tracksJson)
            {
                var parsedTrack = new LastFmModel
                {
                    Name = trackJson?["name"]?.ToString() ?? string.Empty,
                    Url = trackJson?["url"]?.ToString() ?? string.Empty,
                    ArtistName = trackJson?["artist"]?["name"]?.ToString() ?? string.Empty,
                    ArtistUrl = trackJson?["artist"]?["url"]?.ToString() ?? string.Empty,
                    Image = trackJson?["image"]?.FirstOrDefault(img => img["size"]?.ToString() == "medium")?["#text"]?.ToString() ?? string.Empty
                };

                parsedTracks.Add(parsedTrack);
            }

            return parsedTracks;
        }
    }
}