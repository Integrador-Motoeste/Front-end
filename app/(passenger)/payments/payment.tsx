import React from "react";
import { Header, HeaderName } from "./styles";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import InvoiceService, { InvoiceType } from "@/app/services/invoices";
import { useState, useEffect } from "react";
import axios from "axios";


export default function RideHistory (){
    const invoiceService = new InvoiceService("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MzQyMjAxLCJpYXQiOjE3MjUzNDEzMDEsImp0aSI6ImRjY2UyNzBhNDVlMjQyMGQ5MDBjZjdlMDg0ZTc0MTUxIiwidXNlcl9pZCI6MX0.RSqpU_CRuaQhcWGuaSdA3O3KWGU03-VTQtYhtTR8KTA")
    const [invoice, setInvoice] = useState<InvoiceType>()

    async function updateInvoice(){
        const response = await axios.get("https://rickandmortyapi.com/api/characters")
        console.log(response)
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar style="auto"/>
            <Header>
                <TouchableOpacity onPress={updateInvoice}>
                    <HeaderName>Pagamentovghvgv</HeaderName>
                </TouchableOpacity>
            </Header>
        </SafeAreaView>
    )
}