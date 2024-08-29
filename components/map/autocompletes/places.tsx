import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Image } from "react-native";
const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string
import { style } from "./styles";
import Marker from "@/assets/SVG/marker";
import OriginMarker from "@/assets/SVG/origin-marker";
export default function DestinationInput({ setDestination, placeholder, setIsTyping, isOrigin }) {

    return (
        <View style={style.container}>
            { isOrigin ? 
                <OriginMarker style={{marginTop: 12}}></OriginMarker > 
                : 
                <Marker style={{marginTop: 8}}></Marker>
            }
            <GooglePlacesAutocomplete
                textInputProps={{
                    onFocus: () => setIsTyping(true),
                    onBlur: () => setIsTyping(false),
                }}
                placeholder={placeholder}
                styles={{
                    container: {
                        flex: 0,
                        width: "80%",
                    },
                    textInput: {
                        fontSize: 18,
                        paddingBottom: 0,
                    },
                }}
                query={{
                    key: google_key,
                    language: "pt-br",
                    components: "country:br",
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                fetchDetails={true}
                enablePoweredByContainer={false}
                onPress={(data, details = null) => {
                    setDestination(details?.geometry.location)
                }}
            />
        </View>
    )

}