import React from "react";
import { View, Text, TextInput } from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import { useSelector } from "react-redux";

export default function VerifiedInput(props){
    const theme = useSelector(state => state.user.theme);
    return(
        <View style={{width: "100%", marginTop: "7%", alignItems: 'center'}}>
            <Text style={theme == 'dark' ? general.generalText : generalLight.generalText}>Enter verification code</Text>
            <TextInput style={theme == 'dark' ? general.inputComment : generalLight.inputComment} value={props.value} onChangeText={(e)=>props.setUserCode(e)}></TextInput>
        </View>
    )
}