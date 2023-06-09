import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import getImage from "../../resources/imageComponent";
import { useSelector } from "react-redux";

export default function AuthHeader(props){
    const theme = useSelector(state => state.user.theme);
    return(
        <View style={theme == 'dark' ? general.header : generalLight.header}>
            <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: '90%'}}>
            <TouchableWithoutFeedback onPressIn={() => props.navigation.goBack()}>
                <View style={{position: 'absolute', zIndex: 1,width: '20%'}}>
                    {getImage(process.env.API_POINTER_URL, 20, 20, '#FFFFFF')}
                </View>
            </TouchableWithoutFeedback>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '100%', zIndex: 0}}>
                        <Text style={[theme == 'dark' ? general.generalText : generalLight.generalText, { fontSize: 20  }]}>{props.title}</Text>
                </View>
            </View>
    </View>    
    );
}