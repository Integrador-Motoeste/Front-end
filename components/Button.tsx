import Styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
  buttonColor?: string;
  fontColor?: string;
  buttonWidth?: string;
  buttonHeight?: string;
  fontSize?: string;
  margin?: string;
}

export default function Button({ 
  onPress, title, buttonColor = "#1FD87F", fontColor = "white",
  buttonWidth = "297px", buttonHeight = "47px", fontSize = "16px",
  margin = "10px", ...rest
 }: CustomButtonProps) {
  return (
    <ButtonDefault margin={margin} buttonHeight={buttonHeight} buttonWidth={buttonWidth} onPress={onPress} buttonColor={buttonColor} {...rest}>
      <Text fontSize={fontSize} fontColor={fontColor}>{title}</Text>
    </ButtonDefault>
  );
}

const Text = Styled.Text<{ fontColor: string, fontSize: string }>`
  color: ${(props) => props.fontColor};
  font-size: ${(props) => props.fontSize};
  font-family: "Inter_600SemiBold";
`;

const ButtonDefault = Styled.TouchableOpacity<{ buttonColor: string, buttonWidth: string, buttonHeight: string, margin: string }>`
  border-radius: 47px;
  margin: ${(props) => props.margin};
  width: ${(props) => props.buttonWidth};
  height: ${(props) => props.buttonHeight};
  border: none;
  background-color: ${(props) => props.buttonColor};
  display: flex;
  align-items: center;
  justify-content: center;
  elevation: 10;
`;