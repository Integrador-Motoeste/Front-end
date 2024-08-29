import { styled } from "styled-components/native";
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function SignUpButton() {
    return (
        <SignUpContent>
            <ContainerSignUpText>
                <TitleSignUp>Sou novo aqui</TitleSignUp>
                <SubTitle>Cadastrar-me</SubTitle>
            </ContainerSignUpText>
                <EvilIcons name="arrow-right" size={50} color="#1FD87F" /> 
        </SignUpContent>
    );
}

const SignUpContent = styled.View`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    bottom: 7%;
    right: 20px;
    align-self: flex-end;
    justify-self: flex-end;
    position: absolute;
`;

const ContainerSignUpText = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    height: auto;
    
`;

const TitleSignUp = styled.Text`
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
    font-family: "Inter_600SemiBold";
`;    



