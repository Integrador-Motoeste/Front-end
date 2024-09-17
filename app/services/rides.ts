import { api } from "./api";

interface Ride{
    id: number;
    value: number;
    distance: number;
    duration: number;
    pilot_id: number;
    passenger_id: number;
    start_lat : number;
    start_lng : number;
    end_lat : number;
    end_lng : number;
    time_start: string;
    time_end: string;
    stop_place?: string;
    status: "created" | "started" | "finished" | "canceled";
}



export default class ridesService {
    private axiosClient = api;
    private baseUrl = "/api/rides/"
    private authToken = "";

    constructor(authToken: string) {
      this.authToken = authToken;
    }

    async createRide(data: Ride){
        try{
            const response = await this.axiosClient.post(this.baseUrl, data, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            return response
        }catch (error: any){
            console.error("Error creating ride");
            return error.response;
        }
    }

    async getRide(id: number){
        const url = `${this.baseUrl}${id}/`
        try{
            const response = await this.axiosClient.get(url, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            return response
        }catch (error: any){
            console.log("Error getting ride", error);
            return error.response;
        }
    }

    async get_ride_by_user(id: number){
        const url = `${this.baseUrl}rides_by_passenger?passenger_id=${id}`
        try{
            const response = await this.axiosClient.get(url, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            return response
        }catch (error: any){
            console.log("Error getting ride", error);
            return error.response;
        }
    }

    async get_active_ride_by_user(id: number){
        const url = `${this.baseUrl}active_rides_by_passenger?passenger_id=${id}`
        try{
            const response = await this.axiosClient.get(url, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            return response
        }catch (error: any){
            console.log("Error getting ride", error);
            return error.response;
        }
    }
}