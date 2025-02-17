import axios from "axios"

export const getTracksByTags = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/lastfm/tags`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getTracksByUserTags = async (tags: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/lastfm/tags/${tags}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}