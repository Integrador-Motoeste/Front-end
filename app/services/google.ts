import axios from "axios";

const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string;

export default class GoogleMapsService {
    private axiosClient = axios.create({
        baseURL: 'https://maps.googleapis.com/maps/api',    
    });

    async getPlaceFromCoordinates(latitude: number, longitude: number) {
        const url = `/geocode/json?latlng=${latitude},${longitude}&key=${google_key}`;

        try {
            const response = await this.axiosClient.get(url);
            if (response.data.results && response.data.results.length > 0) {
                return response.data.results[0].formatted_address;
            } else {
                throw new Error('No address found for the given coordinates.');
            }
        } catch (error: any) {
            console.log("Error getting place from coordinates", error);
            return error.response;
        }
    }
}