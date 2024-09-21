import CurrencyInput from "react-native-currency-input";
import { CurrencyInputProps } from "react-native-currency-input";
import styled from "styled-components/native";


interface CustomProps extends CurrencyInputProps{
    width?: string;
    height?: string;
    outline?: boolean;
}


export function CustomCurrencyInput({prefix, delimiter, separator, precision, minValue, ...rest}: CustomProps) {

    return (
            <Container>
                <CurrencyInput 
                    prefix="R$ "
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}
                    {...rest}
                    style={{
                        
                        borderRadius: 10,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        fontSize: 16,
                        textAlign: 'center',
                        fontFamily: 'Inter_500Medium',
                        color: '#1FD87F',
                    }}
                />
            </Container>
    );
}


const Container = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 2px solid #1FD87F;
`;