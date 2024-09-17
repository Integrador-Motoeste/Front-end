import { api } from "./api";


export type SignIn = {
    email: string;
    password: string;
}

export type UserCreate = {
    email: string;
    password1: string;
    password2: string;
    first_name: string;
    last_name: string;
}

export default class AuthService {
    private axiosClient = api;
    private baseUrl = "dj-rest-auth/";
    private authToken = "";
  
    constructor(authToken: string) {
      this.authToken = authToken;
    }
  
    async getUser() {
      const url = `${this.baseUrl}user/`;
      try {
        const response = await this.axiosClient.get(url, {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        });
        return response;
      } catch (error: any) {
        console.error("Error getting user:", error.message);
        return error.response;
      }
    }
  
    async login(data: SignIn) {
      const url = `${this.baseUrl}login/`;
      try {
        const response = await this.axiosClient.post(url, data);
        return response;
      } catch (error: any) {
        console.error("Error logging in:", error.message);
        return error.response;
      }
    }
  
    async signUpUser(data: UserCreate) {
      const url = `${this.baseUrl}registration/`;
      try {
        const response = await this.axiosClient.post(url, data);
        return response;
      } catch (error: any) {
        console.error("Error creating user:", error.message);
        return error.response;
      }
    }
  }

