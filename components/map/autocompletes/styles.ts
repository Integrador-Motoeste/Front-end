import { StyleSheet } from "react-native";


export const style = StyleSheet.create({
    container: {
        width: "80%",
        flexDirection: "row",
        margin: 8,
        padding: 10,
        elevation: 10,
        backgroundColor: "white",
        borderRadius: 16,
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