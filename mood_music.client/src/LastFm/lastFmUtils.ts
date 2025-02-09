export interface lastFmModel {
    name: string;
    url: string;
    artistName: string;
    artistUrl: string;
    image: string;
}

export const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
}