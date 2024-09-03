import React from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView, ActivityIndicator, Clipboard } from "react-native";
import InvoiceService, { InvoiceType, QRCodeType } from "@/app/services/invoices";
import { useState, useEffect } from "react";
import { 
    Header, HeaderName, Container, QRImage, PixContainer, PixInputContainer, PixCode,
    PixLabel, ValueContainer, Value, ValueLabel, InstructionText
} from "./styles";
import { truncateName } from "@/components/utils/truncate-text";
import { to_br_real } from "@/components/utils/to-real";
import CopyPastIcon from "@/assets/SVG/copypaste";
import CheckIcon from "@/assets/SVG/check";
import Spinner from "@/components/spinnig";

export default function RideHistory (){
    const invoiceService = new InvoiceService("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1NDA0NDA0LCJpYXQiOjE3MjU0MDM1MDQsImp0aSI6IjA0ZjUzM2EyNGE5MzQwYjFhYzRiMjhmN2M3YjQzZDFlIiwidXNlcl9pZCI6MX0.yW3fwkgfX4_27yict-BdQS9nZIyazEMYs_06DkuLEUA")
    const [invoice, setInvoice] = useState<InvoiceType>()
    const [qrcode, setQrcode] = useState<QRCodeType>()
    const [isLoading, setIsLoafing] = useState<boolean>(false)
    const [isFinished, setIsFinished] = useState<boolean>(true)	

    // Pega a fatura da corrida
    async function updateInvoice(){
        const response = await invoiceService.get_invoice(2)
        if (response.status === 200){
            setInvoice(response.data)
        }
    }

    // Processa a fatura
    async function process_invoice(){
        const response = await invoiceService.process_payment(2)
        console.log(response.data, response.status)
    }

    // Pega o QRCode da fatura
    async function get_qrcode(){
        const response = await invoiceService.get_qr_code(2)
        setQrcode(response.data)
    }

    // Copia o payload para a área de transferência
    const copyToClipboard = () => {
        Clipboard.setString(qrcode?.payload || " ");
    };

    useEffect(() => {
        updateInvoice()
        get_qrcode()
    },[])

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar style="auto"/>
            <Header>
                <TouchableOpacity onPress={get_qrcode}>
                    <HeaderName>Pagamento</HeaderName>
                </TouchableOpacity>
            </Header>
                {qrcode?.encodedImage && (
                <Container>
                    <InstructionText>
                    {isFinished ?
                        ("Confirmado! Obrigado por utilizar nossos serviços."):
                        ("Sua corrida foi finalizada! É possível realizar o pagamento com o código PIX abaixo.")}
                    </InstructionText>
                    <ValueContainer>
                        <ValueLabel>
                            Valor
                        </ValueLabel>
                        <Value>
                            {to_br_real(invoice?.value || 0)}
                        </Value>
                    </ValueContainer>
                    { isLoading ? (
                            <Spinner size={100} color="#1FD87F"/>
                        ) : isFinished ? (
                            <View style={{
                                margin: 20,
                            }}>
                                <CheckIcon/>
                            </View>
                        ) : (
                            <PixContainer>
                                <PixLabel>
                                    Chave PIX
                                </PixLabel>
                                <PixInputContainer onPress={copyToClipboard}>
                                    <PixCode>
                                        {truncateName(qrcode?.payload || "", 20)}
                                    </PixCode>
                                    <CopyPastIcon/>
                                </PixInputContainer>
                            </PixContainer>
                        )
                    }
                </Container>
                )}
        </SafeAreaView>
    )
}