import { api } from "./api";
import axios from "axios";

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
        cnh: string;
    }
    motorcycle: {
        model: string;
        year: number;
        plate: string;
        color: string;
        brand: string;
        onwer: number;
        picture: any;
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

    async turn_pilot(data: TurnPilot) {
        const formData = new FormData();
    
        // Adiciona os dados do piloto diretamente ao formData
        formData.append("cnh", data.pilot.cnh);
    
        // Adiciona os dados da motocicleta diretamente ao formData
        formData.append("model", data.motorcycle.model);
        formData.append("year", data.motorcycle.year.toString());
        formData.append("plate", data.motorcycle.plate);
        formData.append("color", data.motorcycle.color);
        formData.append("brand", data.motorcycle.brand);
        formData.append("onwer", data.motorcycle.onwer.toString());
    
        // Adiciona a imagem da motocicleta
        formData.append("picture", {
            uri: data.motorcycle.picture,  // Caminho da imagem
            type: "image/jpeg",            // Tipo do arquivo
            name: "motorcycle_picture.jpg", // Nome do arquivo
        });
    
        try {
            // Faz a requisição POST
            const response = await this.axiosClient.post(`/api/turn_pilot/post/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${this.authToken}`,
                },
            });
            
            return response;
        } catch (error: any) {
            console.error("Error turning user into pilot:", error.message);
            return error.response;
        }
    }

    async get_pilot(id: number){
        try{
            const response = await this.axiosClient.get(`${this.baseUrl}get_pilot_info?id=${id}`)
            return response
        }catch (error: any){
            console.error("Error signing in user", error.message);
            return error.response;
        }
    }
}