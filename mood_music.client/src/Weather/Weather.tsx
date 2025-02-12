import Button from "../utils/Button/Button";
import { weatherData } from "./weatherUtils";
import "./Weather.css";
import { useState } from "react";

interface weatherProps {
    fetchWeather: (city: string) => void;
    weather: weatherData | null;
}

const Weather = (props: weatherProps) => {
    const [city, setCity] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.fetchWeather(city);
        }
    };

    return (
        <div className="weather-container">
            <div className="input-container">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter city"
                />
                <Button onClick={() => props.fetchWeather(city)}>Get Weather</Button>
            </div>
            {props.weather && (
                <div>
                    <div className="weather-header">
                        <img src={`${import.meta.env.VITE_WEATHER_ICON_API_URL}/${props.weather.weatherIcon}@2x.png`} alt="Weather Icon" />
                        <h2>{props.weather.city}, {props.weather.country}</h2>
                    </div>
                    <p>Weather: {props.weather.mainWeather}</p>
                    <p>Temperature: {props.weather.temperature}°C</p>
                    <p>Feels Like: {props.weather.feelTemperature}°C</p>
                    <p>Pressure: {props.weather.pressure} hPa</p>
                    <p>Humidity: {props.weather.humidity}%</p>
                    <p>Wind Speed: {props.weather.windSpeed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
