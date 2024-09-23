import React, { useState } from 'react';
import { View, Text, Modal, Image, TouchableOpacity } from 'react-native';
import { style } from "./styles";
import Button from '@/components/Button';

interface RatingComponentProps  {
    visible: boolean;
    // name: string;
    // userImage: string;
    onCancel: () => void;
    onConfirm: (rating: number) => void;
    message: string;
}

export const RatingComponent: React.FC<RatingComponentProps> = ({ onCancel, onConfirm, message, visible }: RatingComponentProps) => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleRatingSelect = (rating: number) => {
        setSelectedRating(rating);
    };

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={style.modalBackground}>
                <View style={style.modalContainer}>
                    <Text style={[style.title]}>{message}</Text>

                    {/* <View style={style.userInfoContainer}>
                        <View style={[style.userInfo]}>
                            <Image source={{ uri: userImage }} style={style.userImage} />
                            <Text style={style.userName}>{name}</Text>
                        </View>
                    </View> */}

                    <View style={[style.ratingContainer]}>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <TouchableOpacity
                                key={rating}
                                onPress={() => handleRatingSelect(rating)}
                                style={[
                                    style.ratingButton,
                                    selectedRating === rating && style.selectedRatingButton
                                ]}
                            >
                                <Text
                                    style={[
                                        style.ratingText,
                                        selectedRating === rating && style.selectedRatingText
                                    ]}
                                >
                                    {rating}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={style.buttonsContainer}>
                        <Button
                            title="Cancelar"
                            onPress={onCancel}
                            buttonColor="#D81F1F"
                            fontColor="white"
                            buttonWidth="100px"
                            buttonHeight="40px"
                            margin="5px"
                        />
                        <Button
                            title="Confirmar"
                            onPress={() => selectedRating !== null && onConfirm(selectedRating)}
                            buttonColor="#1FD87F"
                            fontColor="white"
                            buttonWidth="100px"
                            buttonHeight="40px"
                            margin="5px"
                            disabled={selectedRating === null}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
