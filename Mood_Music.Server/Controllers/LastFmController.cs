using Microsoft.AspNetCore.Mvc;
using Mood_Music.Server.Services;

namespace Mood_Music.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LastFmController : ControllerBase
    {
        private readonly LastFmService lastFmService;

        public LastFmController(LastFmService lastFmService)
        {
            this.lastFmService = lastFmService;
        }

        //[HttpGet("artist/{artist}")]
        //public async Task<IActionResult> GetTopTracksByArtist(string artist)
        //{
        //    var topTracks = await lastFmService.GetTopTracksByArtistAsync(artist);
        //    return Ok(topTracks);
        //}

        [HttpGet("tags")]
        public async Task<IActionResult> GetTracksByTags([FromQuery] string tags="chill,lo-fi") //hardcoded before implementing api for tag generating
        {
            var tagList = tags.Split(',').Select(t => t.Trim()).ToList();
            var topTracks = await lastFmService.GetTracksByTagsAsync(tagList);
            return Ok(topTracks);
        }
    }
}
