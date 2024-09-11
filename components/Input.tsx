import { styled } from "styled-components/native";
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  placeholder: string;
  value?: string;
  width?: string;
  height?: string;
  }

export default function Input({ placeholder, value, ...rest }: InputProps) {
return (
  
  <TextInput placeholderTextColor='#acacac' placeholder={placeholder} value={value} {...rest} />

);
}

const TextInput = styled.TextInput<InputProps>`
  padding: 12px 6px;
  border-radius: 10px;
  margin: 10px 0px;
  width: ${({ width }) => width ? width : "297px"};
  height: ${({ height }) => height ? height : "47px"};
  border: none;
  background-color: white;
  font-size: 16px;
  font-family: "Inter_500Medium";
  color: '#1FD87F';
  `;