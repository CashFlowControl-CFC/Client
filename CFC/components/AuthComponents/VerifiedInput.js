import React from "react";
import { View, Text, TextInput } from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";

export default function VerifiedInput(props){
    return(
        <View style={{width: "100%", marginTop: "7%", alignItems: 'center'}}>
                      <Text style={general.generalText}>Enter verification code</Text>
            <TextInput style={general.inputComment} value={props.value} onChangeText={(e)=>props.setUserCode(e)}></TextInput>
        </View>
    )
}