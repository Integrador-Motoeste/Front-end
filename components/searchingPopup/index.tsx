import React from 'react';
import { View, Text, Modal} from 'react-native';
import { style } from "./styles";
import Spinner from '../spinnig';
import Button from '../Button';

interface SearchingPilotsPopupProps {
  visible: boolean;
  onCancel?: () => void;
  message: string;
  hasButton?: boolean;
}

export const SearchingPop: React.FC<SearchingPilotsPopupProps> = ({ message, visible, onCancel, hasButton = true }: SearchingPilotsPopupProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={style.centeredView}>
        <View style={style.modalView}>
          <Text style={style.modalText}>{message}</Text>
          <Spinner color="black" size="large" />
          {hasButton &&
            <Button 
              title="Cancelar" 
              onPress={onCancel} 
              buttonColor="#D81F1F"
              fontColor="white"
              buttonWidth="50%"
              buttonHeight="35px"
              fontSize="16px"
              margin="10px"
            />
          }
        </View>
      </View>
    </Modal>
  );
};