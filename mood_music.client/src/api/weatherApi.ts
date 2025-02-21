import axios from "axios"

export const getWeather = async (city: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/weather/${city}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getWeatherByLocation = async (lat: number, lon: number) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/weather/location?lat=${lat}&lon=${lon}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}