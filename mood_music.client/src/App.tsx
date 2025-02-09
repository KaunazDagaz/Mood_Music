import './App.css';
import LastFmMusic from './LastFm/LastFmMusic';
import Weather from './Weather/Weather';

function App() {
    return (
        <div>
            <h1>Welcome to MoodMusic</h1>
            <Weather />
            <LastFmMusic />
        </div>
    );
}

export default App;