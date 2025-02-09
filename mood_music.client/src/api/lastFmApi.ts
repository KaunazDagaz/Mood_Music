import axios from "axios"

export const getTracksByTags = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/lastfm/tags`);
        return response.data;
    } catch (error) {
        console.error("Error fetching music data from Last.fm!", error);
    }
}