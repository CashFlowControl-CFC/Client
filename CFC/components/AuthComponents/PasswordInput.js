import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, Platform } from "react-native";
import general from "../../styles/general";
import getImage from "../../resources/imageComponent";

export default function PasswordInput(props){
    const [isClose, setIsClose] = useState(true);
    return(
        <View style={{width: "100%", marginTop: "7%", alignItems: 'center'}}>
            <Text style={general.generalText}>{props.text}</Text>
            <View style={{width: "90%", direction: 'rtl', marginTop: "5%"}}>
                <Text style={[general.generalText]}>Password</Text> 
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={props.isValidPassword ? "#D8D8D880" : '#973F3F'}
                    textContentType="password"
                    secureTextEntry={isClose}
                    style={[general.inputComment, { width: "100%", zIndex: 0, color: props.isValidPassword?'#D8D8D8' : '#973F3F' }]}
                    onPressIn={() => props.setIsValidPassword(true)}
                    value={props.password}
                    onChangeText={(text) => {
                        if (/^[a-zA-Z0-9]{0,30}$/.test(text)) {
                            props.setPassword(text);
                        }
                    }}
                />
                <TouchableWithoutFeedback onPress={() => setIsClose(!isClose)}>
                    {Platform.OS == 'ios' ?  <View style={{fontSize: 20, position: 'absolute', left: 10, bottom: 10}}>
                        {getImage( isClose ? process.env.API_CLOSE_URL : process.env.API_OPEN_URL, 20, 20, '#FFFFFF')}
                    </View>
                    :
                    <View style={{fontSize: 20, position: 'absolute', right: 10, bottom: 10}}>
                        {getImage( isClose ? process.env.API_CLOSE_URL : process.env.API_OPEN_URL, 20, 20, '#FFFFFF')}
                    </View>
                }
                   
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}