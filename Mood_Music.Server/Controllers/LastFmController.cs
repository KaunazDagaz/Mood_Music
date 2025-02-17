using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Mood_Music.Server.Exceptions;
using Mood_Music.Server.Models;
using Mood_Music.Server.Services;
using System.Text.Json;

namespace Mood_Music.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LastFmController : ControllerBase
    {
        private readonly LastFmService lastFmService;
        private readonly GeminiService geminiService;
        private readonly IMemoryCache memoryCache;

        private const string cacheKey = "Weather";

        public LastFmController(LastFmService lastFmService, GeminiService geminiService, IMemoryCache memoryCache)
        {
            this.lastFmService = lastFmService;
            this.geminiService = geminiService;
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
            if (!memoryCache.TryGetValue(cacheKey, out object? weatherObj) || weatherObj is not WeatherModel weather || string.IsNullOrEmpty(weather.ToString()))
                return BadRequest("No weather found. Call the weather API first.");

            try
            {
                var tags = await geminiService.GetMusicTagsAsync(weather);
                var tagList = tags.Split(',').Select(t => t.Trim()).ToList();

                var topTracks = await lastFmService.GetTracksByTagsAsync(tagList);

                memoryCache.Remove(cacheKey);


                var response = new
                {
                    Tags = tags,
                    Tracks = topTracks
                };

                return Ok(response);
            } catch (LastFmException ex)
            {
                return StatusCode(502, new { message = ex.Message });
            } catch (GeminiException ex)
            {
                return StatusCode(502, new { message = ex.Message });
            } catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpexted error occured", details = ex.Message });
            }
        }

        [HttpGet("tags/{tags}")]
        public async Task<IActionResult> GetTracksByTags(string tags)
        {
            try
            {
                var tagList = tags.Split(',').Select(t => t.Trim()).ToList();
                var topTracks = await lastFmService.GetTracksByTagsAsync(tagList);

                return Ok(topTracks);
            }
            catch (LastFmException ex)
            {
                return StatusCode(502, new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpexted error occured", details = ex.Message });
            }
        }
    }
}
