import Ionicons from '@expo/vector-icons/Ionicons';
import Styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function ExitButton() {
    const { logout } = useContext(AuthContext); 

    return (
        <Button onPress={() => {logout()}}>
            <Ionicons name="exit-outline" size={22} color="#c41b1b" />
            <Text>Sair</Text>
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
    color: #c41b1b;
    font-size: 15px;
    font-family: "Inter_600SemiBold";
    margin-left: 2px;
`;
