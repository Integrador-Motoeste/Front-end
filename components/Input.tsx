import { styled } from "styled-components/native";
import { TextInputProps } from "react-native";
import  primaryColor from "../constants/Colors";

interface InputProps extends TextInputProps {
    placeholder: string;
    value?: string;
    }

export default function Input({ placeholder, value, ...rest }: InputProps) {
  return (
    
    <TextInput placeholder={placeholder} value={value} {...rest} />

  );
}

const TextInput = styled.TextInput`
    padding: 12px 6px;
    border-radius: 10px;
    margin: 10px;
    width: 297px;
    height: 47px;
    border: none;
    background-color: white;
    font-size: 16px;
    font-family: "InterTight_500Medium";
    color: '#1FD87F';
    ::placeholder {
        color: #DADADA;     
    }
    `;