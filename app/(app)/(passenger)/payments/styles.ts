import Styled from "styled-components/native";
import { Dimensions } from "react-native";


export const HeaderName = Styled.Text`
    font-size: 32px;
    font-weight: bold;
    color: #FFFFFF;
    padding-left: 10%;
    font-family: 'Inter_500Medium';
`;

export const Header = Styled.View`
    display: flex;
    align-items: left;
    justify-content: center;
    width: 100%;
    height: 20%;
    background-color: #34C17D;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
`;

export const Container = Styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: 20px;
`;


export const QRImage = Styled.Image`
    width: ${Dimensions.get('window').width - 128}px;
    height: ${Dimensions.get('window').width - 128}px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
`;


export const PixContainer = Styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    gap: 6px;
`;

export const PixLabel = Styled.Text`
    color: #7D7D7D;
    font-size: 10px;
    font-weight: bold;
    text-align: left;
    width: 100%;
    font-family: 'Inter_700Bold';
`;

export const PixInputContainer = Styled.TouchableOpacity.attrs((props) => ({
    onPress: props.onPress
}))`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #1FD87F;
    border-radius: 10px;
    padding: 10px;
`;

export const PixCode = Styled.Text`
    font-size: 18px;
    text-align: left;
    color: white;
    width: 80%;
    font-family: 'Inter_400Regular';
`;


export const ValueContainer = Styled.View`
    elevation: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    width: 80%;
    height: 15%;
    border-radius: 20px;
`;


export const InstructionText = Styled.Text`
    text-align: center;
    font-size: 16px;
    color: #7D7D7D;
    font-family: 'Inter_600SemiBold';
    width: 80%;
`;

export const ValueLabel = Styled.Text`
    font-size: 18px;
    color: #1FD87F;
    font-family: 'Inter_600SemiBold';
`;

export const Value = Styled.Text`
    font-size: 24px;
    color: #1FD87F;
    font-family: 'Inter_600SemiBold';
`;