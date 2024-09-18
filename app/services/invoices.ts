import { api } from "./api";

export type InvoiceCreate = {
    payment_type: "PIX" | "CREDIT_CARD";
    status: "completed" | "pending" | "canceled";
    value: number;
    user: number;
    pilot: number;
    ride: number;
}

export type InvoiceType = {
    id: number;
    payment_type: "PIX" | "CREDIT_CARD";
    status: "completed" | "pending" | "canceled";
    value: number;
    pilot_id: number;
    client_id: number;
    ride_id: number;
    external_id: number;
    link_payment: string;
    time: string;
}


export type QRCodeType = {
    encodedImage: string;
    payload: string;
    expirationDate: string;
}


export default class InvoiceService {
    private axiosClient = api;
    private baseUrl = "/api/invoices/"
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
            console.error("Error creating invoice");
            return error.response;
        }
    }

    async get_invoice(id: number){
        const url = `${this.baseUrl}${id}/`
        try{
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

    async get_invoice_by_ride_id(id: number | string | string[]){
        const url = `api/invoices/get_invoice_by_ride_id?id=${id}`
        try{
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

    async process_payment(id: number){
        const url = `/api/transactions/process_payment`
        try{
            const response = await this.axiosClient.post(url, {id: id},{
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            return response
        }catch (error: any){
            console.log("Error processing invoice", error);
            return error.response;
        }
    }

    async get_qr_code(id: number){
        const url = `/api/transactions/get_qr_code`
        try{
            const response = await this.axiosClient.post(url, {id: id},{
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            })
            return response
        }catch (error: any){
            console.log("Error getting QRCode", error);
            return error.response;
        }
    }
}