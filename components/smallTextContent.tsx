import React, { ReactNode } from 'react';
import { styled } from 'styled-components/native';

interface SmallTextContentProps {
    children?: ReactNode;
    label: string;
    text: string;
}

export default function SmallTextContent({ children, label, text }: SmallTextContentProps) {
    return (
    <Container>
        <Label>
            {label}
        </Label>
        <ContentText>
            <Text>
                {text}
            </Text>
            {children}
        </ContentText>
    </Container>
  );
}


const Container = styled.View`
    min-width: 160px;
    width: auto;
    max-width: fit-content;
    display: flex;
    flex-direction: column;
`

const Label = styled.Text`
    color: #7d7d7d86;
    font-size: 15px;
    font-family: "Inter_700Bold";
    margin: 0;
`;

const ContentText = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    background-color: #1FD87F;
    border-radius: 10px;
`;

const Text = styled.Text`
    color: white;
    font-size: 18px;
    font-family: "Inter_400Regular";
    margin: 0;
`;