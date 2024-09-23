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
    cpf: string;
    picture: any;
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
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password1", data.password1);
      formData.append("password2", data.password2);
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("cpf", data.cpf);
      formData.append("picture", {
        uri: data.picture,
        type: "image/jpeg",
        name: "profile.jpg",
      });
  
      try {
        const response = await this.axiosClient.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // transformRequest: (data, headers) => {
          //   delete headers.common["Content-Type"];
          //   return data;
          // },
        });
        return response;
      } catch (error: any) {
        if (error.response) {
          console.error("Error creating user:", error.response.data);
        } else if (error.request) {
          console.error("Error creating user: No response received", error.request);
        } else {
          console.error("Error creating user:", error.message);
        }
        return error.response;
      }
    }

    async logout() {
      const url = `${this.baseUrl}logout/`;
      try {
        const response = await this.axiosClient.post(url, {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        });
        return response;
      }
      catch (error: any) {
        console.error("Error logging out:", error.message);
        return error.response;
      }
    }

    
}

