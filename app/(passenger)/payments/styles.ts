import styled from "styled-components/native";
import { Dimensions } from "react-native";


export const HeaderName = styled.Text`
    font-size: 32px;
    font-weight: bold;
    color: #FFFFFF;
    padding-left: 10%;
    font-family: 'Inter_400Regular';
`;


export const Header = styled.View`
    display: flex;
    align-items: left;
    justify-content: center;
    width: 100%;
    height: 20%;
    background-color: #34C17D;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
`;