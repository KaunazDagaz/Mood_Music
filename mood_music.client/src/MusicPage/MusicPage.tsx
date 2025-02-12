import { useState, useEffect } from "react";
import { getTracksByTags } from "../api/lastFmApi";
import { getWeather } from "../api/weatherApi";
import LastFmMusic from "../LastFm/LastFmMusic";
import { lastFmModel } from "../LastFm/lastFmUtils";
import Weather from "../Weather/Weather";
import { weatherData } from "../Weather/weatherUtils";
import Error from "../utils/Error/Error";

const MusicPage = () => {
    const [weather, setWeather] = useState<weatherData | null>(null);
    const [tracks, setTracks] = useState<lastFmModel[]>([]);
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
                setError('An error occurred while fetching the weather or tags.');
            }
        }
    };

    const fetchTracks = async () => {
        try {
            const data = await getTracksByTags() as lastFmModel[];
            setTracks(data);
            setError(null);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while fetching tracks.');
            }
        }
    };

    useEffect(() => {
        if (weather) {
            fetchTracks();
        }
    }, [weather]);

    return (
        <div>
            {error && <Error message={error} />}
            <Weather fetchWeather={fetchWeather} weather={weather} />
            <LastFmMusic tracks={tracks} />
        </div>
    );
}

export default MusicPage;