import  Styled  from "styled-components/native";


export const Container = Styled.View`
    width: 75%;
    height: 50%;
    padding: 20px;

    top: 25%;
    bottom: 50%;

    display: flex;
    flexDirection: column;
    align-items: center;
    justifyContent: space-between;
    background-color: white;

    elevation: 20;
    border-radius: 15px;
`;


export const Icon = Styled.View`
    position: absolute;
    top: -10%;
`;


export const Place = Styled.Text`
    font-size: 16px;
    margin: 5px;
    fontFamily: 'Inter_600SemiBold';
    text-align: center;
`;


export const PlacesContainer = Styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 12.5%;
    `;

export const ProfileMainContainer = Styled.View`
    display: flex;
    flexDirection: column;
    alignItems: center;
    margin-top: 20%;
`;

export const BadgeContainer = Styled.View`
    display: flex;
    flexDirection: row;
    align-items: center;
    margin-bottom: 2%;
`;

export const ProfileContainer = Styled.View`
    display: flex;
    flexDirection: row;
    alignItems: center;
    gap: 8px;
    width: 90%;
    height: "fit-content";
    elevation: 8;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
`;

export const ProfileInfoContainer = Styled.View`
    display: flex;
    flexDirection: row;
    alignItems: center;
    gap: 8px;
    flex: 1;
`;

export const ProfileImg = Styled.Image`
    width: 50px;
    height: 50px;
    borderRadius: 25px;
`;

export const ProfileName = Styled.Text`
    fontFamily: 'Inter_500Medium';
    font-size: 15px;
    color: #34C17D;
    width: 70%;
`;

export const StarContainer = Styled.View`
    display: flex;
    flexDirection: row;
    justifyContent: flex-end;
    width: 100%;
    alignItems: center;
    gap: 4px;
    padding: 4px;
    padding-bottom: 0px;
    top: -2.5%;
    right: 3%;
    position: absolute;
`;

export const StarNumber = Styled.Text`
    fontFamily: 'Inter_700Bold';
    font-size: 12px;
    color: #34C17D;
`;

export const StarImg = Styled.Image`
    width: 12px;
    height: 12px;
`;


export const ButtonContainer = Styled.View`
    display: flex;
    justifyContent: space-around;
    flexDirection: row;
    width: 100%;
    margin: 8px;
`;


export const ModalContainer = Styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: rgba(0, 0, 0, 0.5);
`;


export const ModalContent = Styled.View`
    width: 75%;
    height: 50%;
    padding: 20px;

    display: flex;
    flexDirection: column;
    align-items: center;
    justifyContent: space-between;
    background-color: white;

    elevation: 20;
    border-radius: 15px;
`;


export const VehicleLeftInfoContainer = Styled.View`
    display: flex;
    flexDirection: row;
    width: 50%;
    gap: 8px;
    justifyContent: left;
    alignItems: center;
`;
export const VehicleRightInfoContainer = Styled.View`
    display: flex;
    flexDirection: row;
    width: 50%;
    height: 100%;
    gap: 8px;
    justifyContent: flex-end;
    alignItems: center;
`;


export const VehicleInfoText = Styled.Text`
    fontFamily: 'Inter_600SemiBold';
    font-size: 12px;
    text-align: center;
    font-weight: bold;
    color: #34C17D;
`;


export const VehicleContainer = Styled.View`
    display: flex;
    flexDirection: column;
    alignItems: center;
    width: 100%;

    height: 50%;
    padding: 10px;
`;

export const VehicleImageContainer = Styled.View`
    display: flex;
    flexDirection: row;
    alignItems: center;
    gap: 8px;
    width: 100%;
    height: 60%;
    padding: 10px;
    elevation: 20;
    border-radius: 10px;
    elevation: 8;
    background-color: white;
    position: relative;
`;

export const VehicleMainInfoContainer = Styled.View`
    display: flex;
    flexDirection: column;
`;

export const VehicleName = Styled.Text`
    front-size: 16px;
    fontFamily: 'Inter_700Bold';
    color: #34C17D;
`;


export const VehicleColor = Styled.Text`
    font-size: 12px;
    fontFamily: 'Inter_400Regular';
    color: #34C17D;
`;