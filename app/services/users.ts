import { api } from "./api";

export type createUser = {
    email: string;
    first_name: string;
    last_name: string;
    id_clerk_user: string;
    password?: string;
}

export default class UserService {
    private axiosClient = api;
    private baseUrl = "users/users/";
    private authToken = "";

    constructor(authToken: string) {
        this.authToken = authToken;
    }

    async createUser(data: createUser){
        const url = `${this.baseUrl}/create_user/`
        try{
            const response = await this.axiosClient.post(url, data, {
                headers: {}
            })
            return response
        }catch (error: any){
            console.error("Error creating user");
            
        }
    }

}