import { styled } from "styled-components/native";
import  Button from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Rides() {
    return (
        <Container>
        <Header>
            <Logo>MOTOCAR</Logo>
        </Header>
    
        <MainRides>
            <Title>Viagens</Title>
            <ContainerButtons>
            <Button title="Nova Viagem" />
            <Button title="Ver Viagens" />
            </ContainerButtons>
        </MainRides>
    
        </Container>
    );
}

const MainRides = styled.View`
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

const ContainerButtons = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
    position: relative;
    margin-top: 12%;
`;

const Title = styled.Text`
    color: #ffffff;
    font-size: 30px;
    font-weight: 400;
    font-family: "InterTight_500Medium";
    margin-bottom: 25px;
`;

const Header = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    position: absolute;
    z-index: 1;
    top: 10%;
`;

const Logo = styled.Text`
    color: #fff;
    font-size: 30px;
    font-weight: 900;
    font-family: "Inter_900Black";
`;

const Container = styled(SafeAreaView)`
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

