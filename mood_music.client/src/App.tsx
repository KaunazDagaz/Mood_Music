import './App.css';
import MusicPage from './MusicPage/MusicPage';

function App() {
    return (
        <div>
            <h1>Welcome to MoodMusic</h1>
            {/Edg/.test(navigator.userAgent) && <p style={{ color: "red", fontWeight: "bold" }}>Following external links in Microsoft Edge will result in an error. Don't do this or use a different browser.</p>}
            <MusicPage />
        </div>
    );
}

export default App;