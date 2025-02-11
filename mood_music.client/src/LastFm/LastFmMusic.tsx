import { lastFmModel, truncateText } from "./lastFmUtils";
import "./LastFmMusic.css";

interface lastFmMusicProps {
    tracks: lastFmModel[];
}

const LastFmMusic = (props: lastFmMusicProps) => {
    return (
        <div className="music-container">
            <h1>Track List</h1>
            {props.tracks.length != 0 ? (
                <ul>
                    {props.tracks.map((track, index) => (
                        <li key={index}>
                            <img src={track.image} alt={track.name} />
                            <div className="track-info">
                                <a href={track.url} target="_blank" rel="noopener noreferrer">{truncateText(track.name, 17)}</a>
                                <p>by <a href={track.artistUrl} target="_blank" rel="noopener noreferrer">{truncateText(track.artistName, 17)}</a></p>
                            </div>
                        </li>
                    ))}
                </ul>
                ) : (
                <h2>Try to get forecast to see tracks;)</h2>
                )}
        </div>
    );
};

export default LastFmMusic;
