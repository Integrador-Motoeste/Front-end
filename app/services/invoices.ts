import { api } from "./api";

export type InvoiceCreate = {
    payment_type: "PIX" | "CREDIT_CARD";
    status: "PENDING" | "RECEIVED" | "CONFIRMED" | "CANCELED";
    value: number;
    pilot_id: number;
    client_id: number;
    ride_id: number;
}

export type InvoiceType = {
    payment_type: "PIX" | "CREDIT_CARD";
    status: "PENDING" | "RECEIVED" | "CONFIRMED" | "CANCELED";
    value: number;
    pilot_id: number;
    client_id: number;
    ride_id: number;
    external_id: number;
    link_payment: string;
    time: string;
}



export default class InvoiceService {
    private axiosClient = api;
    private baseUrl = "invoices/"
    private authToken = "";

    constructor(authToken: string) {
      this.authToken = authToken;
    }

    async createInvoice(data: InvoiceCreate){
        try{
            const response = await this.axiosClient.post(this.baseUrl, data, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            return response
        }catch (error: any){
            console.log("Error creating invoice");
            return error.response;
        }
    }

    async getId(id: number){
        const url = `${this.baseUrl}${id}/`
        try{
            console.log(url)
            const response = await this.axiosClient.get(url, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            return response
        }catch (error: any){
            console.log("Error getting invoice", error);
            return error.response;
        }
    }
}