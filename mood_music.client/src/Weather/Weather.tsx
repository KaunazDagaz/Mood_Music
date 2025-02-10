import { useState } from "react"
import Button from "../utils/Button";
import { getWeather } from "../api/weatherApi";
import { weatherData } from "./weatherUtils";
import "./Weather.css"

const Weather = () => {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState<weatherData | null>(null);

    const fetchWeather = async () => {
        const data = await getWeather(city) as weatherData;
        setWeather(data);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            fetchWeather();
        }
    };

    return (
        <div className="weather-container">
            <div className="input-container">
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={handleKeyDown} placeholder="Enter city"/>
                <Button onClick={fetchWeather}>Get Weather</Button>
            </div>
            {weather && (
                <div>
                    <div className="weather-header">
                        <img src={`${import.meta.env.VITE_WEATHER_ICON_API_URL}/${weather.weatherIcon}@2x.png`} alt="Weather Icon" /> 
                        <h2>{weather.city}, {weather.country}</h2>
                    </div>
                    <p>Weather: {weather.mainWeather}</p>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Feels Like: {weather.feelTemperature}°C</p>
                    <p>Pressure: {weather.pressure} hPa</p>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind Speed: {weather.windSpeed} m/s</p>
                </div>
            )}
        </div>
    )
}
export default Weather;