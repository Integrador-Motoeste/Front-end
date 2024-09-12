import  Styled  from "styled-components/native";

interface BigTextContentProps {
    label: string;
    text: string;
}

export default function BigTextContent({label, text}: BigTextContentProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <Text>{text}</Text>
    </Container>
  );
}

const Container = Styled.View`
    width: 100%;
    margin-bottom: 20px;
    margin-top: 20px;
    padding: 15px 0 15px 0;
    border-radius: 20px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    elevation: 10;
`;

const Label = Styled.Text`
  color: #1FD87F;
  font-size: 16px;
  font-family: "Inter_400Regular";
`;

const Text = Styled.Text`
  color: #1FD87F;
  font-size: 24px;
  font-family: "Inter_600SemiBold";
`;