import { api } from "./api";

export type UserType = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    cpf: string;
    cnh: string;
    picture: string;
    status: "INACTIVE" | "ACTIVE" | "BUSY";
}

export type UserCreate = {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

export type UserSignIn = {
    email: string;
    password: string;
}

export type TurnPilot = {
    pilot: {
        cpf: string;
        cnh: string;
    }
    motorcycle: {
        model: string;
        year: number;
        plate: string;
        color: string;
        brand: string;
        onwer: number;
        picture: string;
    }
}

export default class UserService {
    private axiosClient = api;
    private baseUrl = "api/users/"
    private authToken = "";

    constructor(authToken: string) {
      this.authToken = authToken;
    }

    async getUser(id: number){
        const url = `${this.baseUrl}${id}/`
        try{
            const response = await this.axiosClient.get(url, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            return response
        }catch (error: any){
            console.log("Error getting user", error.message);
            return error.response;
        }
    }

    async updateUser(id: number, data: any){
        const url = `${this.baseUrl}${id}/`
        try{
            const response = await this.axiosClient.patch(url, data, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            return response
        }catch (error: any){
            console.log("Error updating user", error.message);
            return error.response;
        }
    }

    async signUpUser(data: UserCreate){
        try{
            const response = await this.axiosClient.post(`${this.baseUrl}signUp/`, data)
            return response
        }catch (error: any){
            console.error("Error creating user", error.message);
            return error.response;
        }
    }

    async signInUser(data: UserSignIn){
        try{
            const response = await this.axiosClient.post(`token/`, data)
            return response
        }catch (error: any){
            console.error("Error signing in user", error.message);
            return error.response;
        }
    }

    async turn_pilot(data: TurnPilot){
        try{
            const response = await this.axiosClient.get(`turn_pilot/post/`, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            return response
        }catch (error: any){
            console.error("Error turning user into pilot", error.message);
            return error.response;
        }
    }

}