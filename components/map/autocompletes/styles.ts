import { StyleSheet } from "react-native";


export const style = StyleSheet.create({
    container: {
        width: "80%",
        borderWidth: 2,
        flexDirection: "row",
        margin: 12,
        borderRadius: 12,
        alignItems: "center",
        gap: 12,
    },
    map: {
        width: "100%",
        height: "80%",
        borderBottomRightRadius: 25,
        position: "relative",
    },
    googlePlaces: {
        backgroundColor: "black",
        width: "100%",
    }
})