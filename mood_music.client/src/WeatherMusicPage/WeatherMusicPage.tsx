import { useState, useEffect } from "react";
import { getTracksByTags, getTracksByUserTags } from "../api/lastFmApi";
import { getWeather, getWeatherByLocation } from "../api/weatherApi";
import LastFmMusic from "../LastFm/LastFmMusic";
import { lastFmModel } from "../LastFm/lastFmUtils";
import Weather from "../Weather/Weather";
import { weatherData } from "../Weather/weatherUtils";
import Error from "../utils/Error/Error";
import "./WeatherMusicPage.css"

const WeatherMusicPage = () => {
    const [weather, setWeather] = useState<weatherData | null>(null);
    const [tracks, setTracks] = useState<lastFmModel[]>([]);
    const [tags, setTags] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (city: string) => {
        try {
            const data = await getWeather(city) as weatherData;
            setWeather(data);
            setError(null);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while fetching the weather.');
            }
        }
    };

    const fetchWeatherByLocation = async (lat: number, lon: number) => {
        try {
            const data = await getWeatherByLocation(lat, lon) as weatherData;
            setWeather(data);
            setError(null);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while fetching the weather by location.');
            }
        }
    };

    const fetchTracks = async () => {
        try {
            const data = await getTracksByTags();
            setTracks(data.tracks);
            setTags(data.tags);
            setError(null);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while fetching tags or tracks.');
            }
        }
    };

    const fetchUserTaggedTracks = async () => {
        try {
            const data = await getTracksByUserTags(tags);
            setTracks(data);
            setError(null);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while fetching user tagged tracks.');
            }
        }
    };

    useEffect(() => {
        if (weather) {
            fetchTracks();
        }
    }, [weather]);

    useEffect(() => {
        let ignore = false;
    
        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (ignore) return; //prevent double calls in dev mode (because of the strict mode). In prod should work fine without it
                fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
            },
            (_: any) => setError('Unable to retrieve your location.')
        );
    
        return () => { ignore = true; };
    }, []);
    

    return (
        <div className="weather-music-page-container">
            {error && <Error message={error} />}
            <Weather fetchWeather={fetchWeather} weather={weather} />
            <LastFmMusic
                setTags={setTags}
                fetchUserTaggedTracks={fetchUserTaggedTracks}
                tracks={tracks}
                tags={tags}
            />
        </div>
    );
}

export default WeatherMusicPage;