import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ContainerButtons = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
    position: relative;
    margin-top: 12%;
`;

export const Title = styled.Text`
    color: #ffffff;
    font-size: 30px;
    font-weight: 400;
    font-family: "Inter_400Regular";
    margin-bottom: 25px;
`;

export const MainLogin = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
    position: absolute;
    z-index: 1;
    top: 32%;
`;

export const Header = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    position: absolute;
    z-index: 1;
    top: 10%;
`;

export const Logo = styled.Text`
    color: #fff;
    font-size: 30px;
    font-weight: 900;
    font-family: "Inter_900Black";
`;

export const Container = styled(SafeAreaView)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #ffffff;
    position: relative;
    width: 100%;
    flex: 1;
`;