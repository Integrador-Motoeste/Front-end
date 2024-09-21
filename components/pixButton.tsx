import Ionicons from '@expo/vector-icons/Ionicons';
import Styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import PixIcon from '@/assets/SVG/pixIcon';

type props = {
    onPress: () => void;
}

export default function PixButton(props: props) {

    return (
        <Button onPress={() => {props.onPress}}>
            <PixIcon width={22} height={22}/>
            <Text>Sacar</Text>
        </Button>
    );
}

const Button = Styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 5px;
    background-color: white;
    padding: 5px;
    border-radius: 40px;
    width: 80px;
`;

const Text = Styled.Text`
    color: #00BFA5;
    font-size: 15px;
    font-family: "Inter_600SemiBold";
    margin-left: 2px;
`;
