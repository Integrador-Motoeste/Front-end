import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        borderBottomRightRadius: 25,
        position: "relative",
        zIndex: -1,
    },
    mapContainer: {
        width: '100%',
        height: '85%',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        backgroundColor: 'black',
        overflow: 'hidden',
    },
    googlePlaces: {
        backgroundColor: "black",
        width: "100%",
    },
    overmapfull: {
        position: "absolute",
        bottom: 25,
        alignItems: "center",
        width: "100%"
    },
    overmap: {
        position: "absolute",
        bottom: "10.5%",
        alignItems: "center",
        width: "100%"
    },
    confirmPopup: {
        width: "80%",
        height: "40%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        margin: 12,
        elevation: 10,
        backgroundColor: "white",
        borderRadius: 16,
    },
})