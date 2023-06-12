import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import general from "../../styles/general";
import getImage from "../../resources/imageComponent";

export default function CommonHeader(props){
    return(
        <View style={general.header}>
            <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: '90%'}}>
            <TouchableWithoutFeedback onPressIn={() => props.navigation.goBack()}>
                <View style={{position: 'absolute', zIndex: 1,width: '20%'}}>
                    {getImage(process.env.API_POINTER_URL, 23, 23, '#FFFFFF')}
                </View>
            </TouchableWithoutFeedback>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '100%', zIndex: 0, gap: 10}}>
                        {props.image_link && getImage(props.image_link, 20, 20, '#FFFFFF')}
                        <Text style={[general.generalText, { fontSize: 20  }]}>{props.title}</Text>
                </View>
            </View>
    </View>    
    );
}