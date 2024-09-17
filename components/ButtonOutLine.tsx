import  Styled  from "styled-components/native";
import { TouchableOpacityProps, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    onPress?: () => void;
    isLoading?: boolean
    icon?: keyof typeof Ionicons.glyphMap
    }

export default function ButtonOutLine({isLoading, onPress , title, icon, ...rest}: CustomButtonProps) {
  return (
    <ButtonDefault disabled={isLoading} activeOpacity={0.7} onPress={onPress} {...rest} >
      { isLoading ? (
        <ActivityIndicator color="#1FD87F" />
      ) : (
      <>
        <Ionicons name={icon} size={20} color="#1FD87F" />
          <Text>{title}</Text>
      </>
      )
    }
    </ButtonDefault>
  );
}

const Text = Styled.Text`
    color: #1FD87F;
    font-size: 16px;
    font-family: "Inter_600SemiBold";
    margin-left: 5px;
    `;

const ButtonDefault = Styled.TouchableOpacity`
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
    flex-direction: row;
    `;
