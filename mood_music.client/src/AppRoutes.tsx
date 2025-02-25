import { Routes, Route } from 'react-router-dom';
import WeatherMusicPage from './WeatherMusicPage/WeatherMusicPage';
import MainPage from './MainPage/MainPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/weathermusicpage" element={<WeatherMusicPage />} />
            <Route path="/" element={<MainPage />} />
        </Routes>
    );
};

export default AppRoutes;