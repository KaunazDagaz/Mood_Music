using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Mood_Music.Server.Services;

namespace Mood_Music.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LastFmController : ControllerBase
    {
        private readonly LastFmService lastFmService;
        private readonly IMemoryCache memoryCache;

        private const string cacheKey = "GeneratedMusicTags";

        public LastFmController(LastFmService lastFmService, IMemoryCache memoryCache)
        {
            this.lastFmService = lastFmService;
            this.memoryCache = memoryCache;
        }

        //[HttpGet("artist/{artist}")]
        //public async Task<IActionResult> GetTopTracksByArtist(string artist)
        //{
        //    var topTracks = await lastFmService.GetTopTracksByArtistAsync(artist);
        //    return Ok(topTracks);
        //}

        [HttpGet("tags")]
        public async Task<IActionResult> GetTracksByTags()
        {
            if (!memoryCache.TryGetValue(cacheKey, out object? tagsObj) || tagsObj is not string tags || string.IsNullOrWhiteSpace(tags))
                return BadRequest("No tags found. Call the weather API first.");

            var tagList = tags.Split(',').Select(t => t.Trim()).ToList();
            var topTracks = await lastFmService.GetTracksByTagsAsync(tagList);

            memoryCache.Remove(cacheKey);

            return Ok(topTracks);
        }
    }
}
