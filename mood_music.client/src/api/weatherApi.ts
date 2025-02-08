import axios from "axios"

export const getWeather = async (city: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/weather/${city}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data!", error);
    }
}