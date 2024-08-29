import { View, Text } from "react-native";
import { style } from "./styles";


type propsType = {
    value: string | number
    color?: string
}

export default function Badge(props: propsType) {

    return (
       <View style={[style.container, {
        borderColor: props.color ? props.color : "black"
       }]}>
            <Text style={[style.text, {
                color: props.color ? props.color : "black"
            }]}>{props.value}</Text>
       </View>
    )

}