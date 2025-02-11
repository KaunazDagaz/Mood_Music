using DotNetEnv;
using Mood_Music.Server.Models;
using Newtonsoft.Json;
using System.Text;

namespace Mood_Music.Server.Services
{
    public class GeminiService
    {
        private readonly HttpClient httpClient;
        private readonly string apiKey;
        private readonly string baseUrl;

        public GeminiService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
            this.apiKey = Env.GetString("GEMINI_API_KEY");
            this.baseUrl = Env.GetString("GEMINI_API_URL");
        }

        public async Task<string> GetMusicTagsAsync(WeatherModel weather)
        {
            string prompt = $"Based on the following weather conditions: " +
                            $"Main: {weather.MainWeather}, Description: {weather.WeatherDescription}, " +
                            $"Temperature: {weather.Temperature}°C, Feels Like: {weather.FeelTemperature}°C, " +
                            $"Pressure: {weather.Pressure} hPa, Humidity: {weather.Humidity}%, " +
                            $"Wind Speed: {weather.WindSpeed} m/s, " +
                            $"City: {weather.City}, Country: {weather.Country}. " +
                            $"Provide existing Last.fm music tags that match this weather mood. " +
                            $"Format response as: tag,tag,tag. Decide how many tags there will be, but no more than ten. " +
                            $"Do not include any extra words or characters.";

            var requestBody = new
            {
                contents = new[]
            {
                new { parts = new[] { new { text = prompt } } }
            }
            };

            var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
            HttpResponseMessage response = await httpClient.PostAsync($"{baseUrl}?key={apiKey}", content);
            response.EnsureSuccessStatusCode();
            string result = await response.Content.ReadAsStringAsync();

            return result;
        }
    }
}
