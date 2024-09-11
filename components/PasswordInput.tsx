import styled from 'styled-components/native';
import Input from './Input';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  width?: string;
  height?: string;
  outline?: boolean;
}

export default function PasswordInput({ password, setPassword, width, height}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <PasswordContainer width={width} height={height} password={password} setPassword={setPassword}>
      <StyledInput
        value={password}
        placeholder="Senha"
        secureTextEntry={!isPasswordVisible}
        onChangeText={(password: string) => setPassword(password)}
      />
      <IconContainer onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <MaterialIcons
            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
            size={20}
            color={'#767676'}
          />
        
      </IconContainer>
    </PasswordContainer>
  );
}

const PasswordContainer = styled.View<PasswordInputProps>`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  margin: 10px 0px;
  width: ${({ width }) => (width ? width : '297px')};
  height: ${({ height }) => (height ? height : '47px')};
  background-color: white;
  font-size: 16px;
  font-family: 'Inter_500Medium';
  color: '#1FD87F';
  border: ${({ outline }) => (outline ? '2px solid #1FD87F' : 'none')};
`;

const StyledInput = styled.TextInput`
    padding: 12px 6px;
    flex: 1;
    font-size: 16px;
    font-family: 'Inter_500Medium';
    color: '#1FD87F';
`;

const IconContainer = styled.TouchableOpacity`
  background-color: #ececec;
  padding: 4px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 28px;
  
`;