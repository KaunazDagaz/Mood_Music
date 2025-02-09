import { useEffect, useState } from "react";
import { getTracksByTags } from "../api/lastFmApi";
import { lastFmModel, truncateText } from "./lastFmUtils";
import "./LastFmMusic.css"

const LastFmMusic = () => {
    const [tracks, setTracks] = useState<lastFmModel[]>([])

    const fetchTracks = async () => {
        const data = await getTracksByTags() as lastFmModel[];
        setTracks(data);
    }

    useEffect(() => {
        fetchTracks();
    }, []);

    return (
        <div className="music-container">
            <h1>Track List</h1>
            <ul>
                {tracks.map((track, index) => (
                    <li key={index}>
                        <img src={track.image} alt={track.name} />
                        <div className="track-info">
                            <a href={track.url} target="_blank" rel="noopener noreferrer">{truncateText(track.name, 17)}</a>
                            <p>by <a href={track.artistUrl} target="_blank" rel="noopener noreferrer">{truncateText(track.artistName, 17)}</a></p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LastFmMusic;