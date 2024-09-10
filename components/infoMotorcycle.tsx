import Styled from "styled-components/native";

interface InfoMotorcycleProps {
    motorCycle: {
        image: string;
        brand: string;
        model: string;
        year: number;
    };
}

export default function InfoMotorcycle({ motorCycle }: InfoMotorcycleProps) {
  return (
    <Container>

        <Label>
            Veículos
        </Label>

        <Content>
            <ImageContainer>
              { motorCycle.image !== '' ? (
                  <Image source={{ uri: motorCycle.image }} />
              ) : (
                  <Image source={require("../assets/images/defaultMotorcycle.jpg")} />
              )}
            </ImageContainer>

            <Info>{motorCycle.brand} {motorCycle.model} {motorCycle.year}
            </Info>
        </Content>

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
    align-items: left;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const ImageContainer = Styled.View`
    width: 50px;
    height: 50px;
    border-radius: 50px;
`;

const Image = Styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 50px;
`;

const Info = Styled.Text`
    color: #1FD87F;
    font-size: 18px;
    font-family: "Inter_400Regular";
`;

const Label = Styled.Text`
    color: #7d7d7d86;
    font-size: 15px;
    font-family: "Inter_700Bold";
    margin: 0;
`;

const Content = Styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    elevation: 10;
    gap: 10px;
    width: 100%;
`;