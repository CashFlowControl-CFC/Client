import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import general from "../../styles/general";
import getImage from "../../resources/imageComponent";

export default function Avatar(props){
    return (
        <TouchableWithoutFeedback>
            <View style={general.avatar}>
                {getImage(process.env.API_PLUS_URL, 90, 90, '#000000')}
            </View>
        </TouchableWithoutFeedback>
    );
}