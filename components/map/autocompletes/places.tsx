import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Image } from "react-native";
const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string
import { style } from "./styles";
import Marker from "@/assets/SVG/marker";
export default function DestinationInput() {

    return (
        <View style={style.container}>
            <Marker></Marker>
            <GooglePlacesAutocomplete
                placeholder="Para onde Vamos?"
                styles={{
                    container: {
                        flex: 0,
                        width: "80%",
                    },
                    textInput: {
                        height: 50,
                        fontSize: 18,
                        paddingBottom: 0,
                    },
                    textInputContainer: {
                        backgroundColor: "blue",
                    },
                    poweredContainer: {
                        backgroundColor: "red",
                    }
                }}
                query={{
                    key: google_key,
                    language: "pt-br",
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                enablePoweredByContainer={false}
            />
        </View>
    )

}