import { lastFmModel, truncateText } from "./lastFmUtils";
import "./LastFmMusic.css";
import Button from "../utils/Button/Button";

interface lastFmMusicProps {
    setTags: (tags: string) => void;
    fetchUserTaggedTracks: () => void;
    tracks: lastFmModel[];
    tags: string;
}

const LastFmMusic = (props: lastFmMusicProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            if (!e.shiftKey) {
                e.preventDefault();
                props.fetchUserTaggedTracks();
            }
        }
    };

    return (
        <div className="music-container">
            <h1>Track List</h1>
            {(props.tags && props.tags.length !== 0) || (props.tracks && props.tracks.length !== 0) ? (
                <div className="tags-container">
                    <textarea
                        value={props.tags}
                        onChange={(e) => props.setTags(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tags"
                    />
                    <Button onClick={props.fetchUserTaggedTracks}>Get Tracks</Button>
                </div>
            ) : (
                <></>
            )}
            {props.tracks && props.tracks.length !== 0 ? (
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
