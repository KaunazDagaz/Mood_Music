import { useState, useEffect } from "react";
import { getTracksByTags } from "../api/lastFmApi";
import { getWeather } from "../api/weatherApi";
import LastFmMusic from "../LastFm/LastFmMusic";
import { lastFmModel } from "../LastFm/lastFmUtils";
import Weather from "../Weather/Weather";
import { weatherData } from "../Weather/weatherUtils";

const MusicPage = () => {
    const [weather, setWeather] = useState<weatherData | null>(null);
    const [tracks, setTracks] = useState<lastFmModel[]>([]);

    const fetchWeather = async (city: string) => {
        const data = await getWeather(city) as weatherData;
        setWeather(data);
    };

    const fetchTracks = async () => {
        const data = await getTracksByTags() as lastFmModel[];
        setTracks(data);
    };

    useEffect(() => {
        if (weather) {
            fetchTracks();
        }
    }, [weather]);

    return (
        <div>
            <Weather fetchWeather={fetchWeather} weather={weather} />
            <LastFmMusic tracks={tracks} />
        </div>
    );
}

export default MusicPage;