import { View, Text } from "react-native";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import Styled from "styled-components/native";

interface customProps extends ActivityIndicatorProps {
    color: string;
    size: number | "small" | "large";
}

export default function Spinner({color = "#1FD87F", size = "large"}: customProps) {

    return (
        <Container>
            <ActivityIndicator size={size} color={color} />
        </Container>
    )

}

const Container = Styled.View`
    justify-content: center;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
    margin: 10px;
`;