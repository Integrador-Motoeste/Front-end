import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ContentProfile = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 5% 0 5%;
`;

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

export const TitleContext = styled.View`
  justify-content: space-between;
  display: flex;
  align-items: baseline;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  color: white;
  font-size: 26px;
  font-family: "Inter_500Medium";
`;

export const ProfileSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  height: 70px;
  width: 100%;
  gap: 10px;
`;

export const ProfileImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 40px;
  background-color: #fff;
  margin: 0;
  align-items: center;
  justify-content: center;
`;

export const ProfileImageContainer = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

export const ProfileInfo = styled.View`
  height: 100%;
  width: 100%;
  align-items: left;
  justify-content: center;
`;

export const Rating = styled.Text`
  color: white;
  font-size: 16px;
  position: absolute;
  top: -20%;
  right: 23%;
  margin: 0;
  padding: 0;
`;

export const NameUser = styled.Text`
  color: white;
  font-size: 18px;
  font-family: "Inter_400Regular";
  width: 78%;
`;

export const InfoGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;

export const VehicleCard = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;


export const ButtonContainer = styled.View`
  flex-direction: row;
  width: 50%;
  margin-top: 10px;
  justify-content: flex-end;
  gap: 6px;
`;

export const WithdrawContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 75%;
`;


export const CurrencyInputContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: blue;
  width: 90%;
  height: 10%;
`;