import { styled } from "styled-components/native";
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function SignUp() {
    return (
        <SignUpContainer>
            <ContainerSignUpText>
                <Title>Sou novo aqui</Title>
                <SubTitle>Cadastrar-me</SubTitle>
            </ContainerSignUpText>
            <EvilIcons name="arrow-right" size={50} color="#1FD87F" />
        </SignUpContainer>
    );
}

const SignUpContainer = styled.View`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    bottom: 0;
`;

const ContainerSignUpText = styled.View`
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
    color: #1FD87F;
    font-size: 30px;
    font-weight: 400;
    font-family: "InterTight_300Light";
    margin-bottom: 0px;
`;

const SubTitle = styled.Text`
    color: #0EC16B; 
    font-size: 20px;
    font-weight: 400;
    font-family: "InterTight_600SemiBold";
`;      



