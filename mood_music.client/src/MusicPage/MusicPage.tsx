import { useState, useEffect } from "react";
import { getTracksByTags, getTracksByUserTags } from "../api/lastFmApi";
import { getWeather } from "../api/weatherApi";
import LastFmMusic from "../LastFm/LastFmMusic";
import { lastFmModel } from "../LastFm/lastFmUtils";
import Weather from "../Weather/Weather";
import { weatherData } from "../Weather/weatherUtils";
import Error from "../utils/Error/Error";

const MusicPage = () => {
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

    return (
        <div>
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

export default MusicPage;