﻿using DotNetEnv;
using Mood_Music.Server.Exceptions;
using Mood_Music.Server.Models;
using Newtonsoft.Json.Linq;

namespace Mood_Music.Server.Services
{
    public class WeatherService
    {


        private readonly HttpClient httpClient;
        private readonly string apiKey;
        private readonly string baseUrl;

        public WeatherService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
            this.apiKey = Env.GetString("WEATHER_API_KEY");
            this.baseUrl = Env.GetString("WEATHER_API_URL");
        }

        public async Task<WeatherModel> GetCurrentWeatherAsync(string city)
        {
            var url = $"{baseUrl}/weather?q={city}&appid={apiKey}&units=metric";
            var response = await httpClient.GetAsync(url);
            try
            {
                response.EnsureSuccessStatusCode();
            } catch (HttpRequestException ex)
            {
                throw new WeatherException($"Failed to fetch weather data for {city}: {ex.Message}");
            } catch (Exception ex)
            {
                throw new Exception($"An unexpected error occured: {ex.Message}");
            }

            var content = await response.Content.ReadAsStringAsync();

            return WeatherParser(content);
        }

        public async Task<WeatherModel> GetCurrentWeatherByLocationAsync(double lat, double lon)
        {
            var url = $"{baseUrl}/weather?lat={lat}&lon={lon}&appid={apiKey}&units=metric";
            var response = await httpClient.GetAsync(url);
            try
            {
                response.EnsureSuccessStatusCode();
            }
            catch (HttpRequestException ex)
            {
                throw new WeatherException($"Failed to fetch weather data for {lat}, {lon}: {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"An unexpected error occured: {ex.Message}");
            }

            var content = await response.Content.ReadAsStringAsync();

            return WeatherParser(content);
        }

        private WeatherModel WeatherParser(string content)
        {
            var weatherJson = JObject.Parse(content);

            var weatherData = new WeatherModel
            {
                MainWeather = weatherJson["weather"]?[0]?["main"]?.ToString() ?? string.Empty,
                WeatherDescription = weatherJson["weather"]?[0]?["description"]?.ToString() ?? string.Empty,
                Temperature = (double?)weatherJson["main"]?["temp"] ?? 0.0,
                FeelTemperature = (double?)weatherJson["main"]?["feels_like"] ?? 0.0,
                Pressure = (int?)weatherJson["main"]?["pressure"] ?? 0,
                Humidity = (int?)weatherJson["main"]?["humidity"] ?? 0,
                WindSpeed = (double?)weatherJson["wind"]?["speed"] ?? 0.0,
                City = weatherJson["name"]?.ToString() ?? string.Empty,
                Country = weatherJson["sys"]?["country"]?.ToString() ?? string.Empty,
                WeatherIcon = weatherJson["weather"]?[0]?["icon"]?.ToString() ?? string.Empty
            };
            return weatherData;
        }
    }
}
