﻿namespace Mood_Music.Server.Models
{
    public class WeatherModel
    {
        public required string MainWeather { get; set; }
        public string? WeatherDescription { get; set; }
        public double Temperature { get; set; }
        public double FeelTemperature { get; set; }
        public int Pressure { get; set; }
        public int Humidity { get; set; }
        public double WindSpeed { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }
        public string? WeatherIcon { get; set; }
    }
}
