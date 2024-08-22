import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Image } from "react-native";
const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string
import { style } from "./styles";
import Marker from "@/assets/SVG/marker";

export default function DestinationInput({ setDestination, placeholder }) {

    return (
        <View style={style.container}>
            <Marker></Marker>
            <GooglePlacesAutocomplete
                placeholder={placeholder}
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
                }}
                query={{
                    key: google_key,
                    language: "pt-br",
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                fetchDetails={true}
                enablePoweredByContainer={false}
                onPress={(data, details = null) => {
                    setDestination(details?.geometry.location)
                }}
            />
        </View>
    )

}