﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Mood_Music.Server.Exceptions;
using Mood_Music.Server.Services;

namespace Mood_Music.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherService weatherService;
        private readonly GeminiService geminiService;
        private readonly IMemoryCache memoryCache;

        private const string cacheKey = "GeneratedMusicTags";

        public WeatherController(WeatherService weatherService, GeminiService geminiService, IMemoryCache memoryCache)
        {
            this.weatherService = weatherService;
            this.geminiService = geminiService;
            this.memoryCache = memoryCache;
        }

        [HttpGet("{city}")]
        public async Task<IActionResult> GetWeather(string city)
        {
            try
            {
                var weatherData = await weatherService.GetCurrentWeatherAsync(city);
                var tags = await geminiService.GetMusicTagsAsync(weatherData);

                memoryCache.Set(cacheKey, tags, TimeSpan.FromMinutes(1));

                return Ok(weatherData);
            } catch (WeatherException ex)
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
    }
}
