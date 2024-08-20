import  Styled  from "styled-components/native";
import { TouchableOpacityProps } from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    onPress?: () => void;
    }

export default function ButtonOutLine({ onPress , title,...rest}: CustomButtonProps) {
  return (
    <ButtonDefault onPress={onPress} {...rest} >
        <Text>{title}</Text>
    </ButtonDefault>
  );
}

const Text = Styled.Text`
    color: #1FD87F;
    font-size: 16px;
    font-family: "InterTight_600SemiBold";
    `;

const ButtonDefault = Styled.TouchableOpacity`
    padding: 12px 6px;
    border-radius: 47px;
    margin: 10px;
    width: 297px;
    height: 47px;
    border: 2px solid #1FD87F;
    background-color: white;
    align-items: center;
    justify-content: center;
    display: flex;
    elevation: 10;
    `;
