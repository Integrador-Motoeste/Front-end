import { styled } from "styled-components/native";
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  placeholder: string;
  value?: string;
  outline?: boolean;
}

export default function Input({ placeholder, value, outline, ...rest }: InputProps) {
  return (
    <TextInput outline={outline} placeholder={placeholder} value={value} {...rest} />
  );
}

const TextInput = styled.TextInput<InputProps>`
  padding: 12px 6px;
  border-radius: 10px;
  margin: 10px;
  width: 297px;
  height: 47px;
  border: ${({ outline }) => (outline ? "1px solid #1FD87F" : "none")};
  background-color: white;
  font-size: 16px;
  font-family: "InterTight_500Medium";
  color: '#1FD87F';
  ::placeholder {
    color: #DADADA;
  }
`;