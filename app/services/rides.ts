import { api } from "./api";

export interface Ride{
    distance: number;
    duration: number;
    pilot: number;
    client: number;
    start_lat : number;
    start_lng : number;
    end_lat : number;
    end_lng : number;
    time_start: string;
    time_end: string;
    stop_place?: string;
    origin?: string;
    destination?: string;
    status: "created" | "started" | "finished" | "canceled";
}


export interface RideCreate{
    distance: number;
    duration: number;
    pilot: number;
    passenger: number;
    start_lat : number;
    start_lng : number;
    end_lat : number;
    end_lng : number;
    origin?: string;
    destination?: string;
    status: "created" | "started" | "finished" | "canceled";
}



export default class ridesService {
    private axiosClient = api;
    private baseUrl = "/api/rides/"
    private authToken = "";

    constructor(authToken: string) {
      this.authToken = authToken;
    }

    async createRide(data: RideCreate){
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

    async get_rides(){
        const url = `${this.baseUrl}my_rides/`
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

    async get_active_ride(){
        const url = `${this.baseUrl}get_active_ride/`
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