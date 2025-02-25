import LinkButton from "../utils/LinkButton/LinkButton";
import WeatherMusicPage from "../WeatherMusicPage/WeatherMusicPage";

const MainPage = () => {
    return (
        <div>
            <h1>Welcome to MoodMusic</h1>
            {/Edg/.test(navigator.userAgent) && <p style={{ color: "red", fontWeight: "bold" }}>Following external links in Microsoft Edge will result in an error. Don't do this or use a different browser.</p>}
            <LinkButton component={WeatherMusicPage} text="Weather Music" />
        </div>
    )
}

export default MainPage;