using Microsoft.AspNetCore.Mvc;
using Mood_Music.Server.Services;

namespace Mood_Music.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherService weatherService;
        public WeatherController(WeatherService weatherService)
        {
            this.weatherService = weatherService;
        }

        [HttpGet("{city}")]
        public async Task<IActionResult> GetWeather(string city)
        {
            var weatherData = await weatherService.GetCurrentWeatherAsync(city);
            return Ok(weatherData);
        }
    }
}
