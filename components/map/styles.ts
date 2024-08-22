import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    map: {
        width: "100%",
        height: "80%",
        borderBottomRightRadius: 25,
        position: "relative",
        zIndex: -1,
    },
    googlePlaces: {
        backgroundColor: "black",
        width: "100%",
    },
    overmapfull: {
        position: "absolute",
        bottom: 120,
        alignItems: "center",
        width: "100%"
    },
    overmap: {
        position: "absolute",
        bottom: 132,
        alignItems: "center",
        width: "100%"
    },
    confirmPopup: {
        width: "80%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        margin: 12,
        elevation: 2,
        height: 200,
        backgroundColor: "white",
        borderRadius: 16,
    },
})