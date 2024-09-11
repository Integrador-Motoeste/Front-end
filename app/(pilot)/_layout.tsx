import { Link, router, Slot } from "expo-router"
import { styled } from "styled-components/native"
import ProfileIconMenu from "@/assets/SVG/profile-icon-menu"
import ListRidescIcon from "@/assets/SVG/listRides-icon-menu"
import MainIcon from "@/assets/SVG/main-icon-menu"

export default function LayoutPublic(){

    return(
        <>
            <Slot/>
            <MenuContainer>
                <MenuItem onPress={() => router.push("/(pilot)")}>
                        <ListRidescIcon/>
                </MenuItem>
                <MenuItem onPress={() => router.push("/(pilot)")}>
                        <MainIcon/>
                </MenuItem>
                <MenuItem onPress={() => router.push("/(pilot)/profile")}>
                        <ProfileIconMenu/>
                </MenuItem>
            </MenuContainer>
        </>
    )
}

const MenuContainer = styled.View`
    background-color: #1FD87F;
    height: 73px;
    width: 90%;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 30px;
    align-items: center;
    justify-content: space-evenly;
    position: absolute;
    bottom: 2%;
    left: 5%;
`

const MenuItem = styled.TouchableOpacity`
    height: 32px;
    width: auto;
`