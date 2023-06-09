import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import getImage from "../../resources/imageComponent";
import { useSelector } from "react-redux";

export default function PasswordInput(props){
    const [isClose, setIsClose] = useState(true);
    const theme = useSelector(state => state.user.theme);
    return(
        <View style={{width: "100%", marginTop: "7%", alignItems: 'center'}}>
            <Text style={theme == 'dark' ? general.generalText : generalLight.generalText}>{props.text}</Text>
            <View style={{width: "90%", direction: 'rtl', marginTop: "5%"}}>
                <Text style={[theme == 'dark' ? general.generalText : generalLight.generalText]}>Password</Text> 
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={props.isValidPassword ? "#D8D8D880" : '#973F3F'}
                    textContentType="password"
                    secureTextEntry={isClose}
                    style={[theme == 'dark' ? general.inputComment : generalLight.inputComment, { width: "100%", zIndex: 0, color: props.isValidPassword?'#D8D8D8' : '#973F3F' }]}
                    onPressIn={() => props.setIsValidPassword(true)}
                    value={props.password}
                    onChangeText={(text) => {
                        if (/^[a-zA-Z0-9]{0,30}$/.test(text)) {
                            props.setPassword(text);
                        }
                    }}
                />
                <TouchableWithoutFeedback onPress={() => setIsClose(!isClose)}>
                    <View style={{position: 'absolute', zIndex: 1, top: '50%'}}>
                        {getImage( isClose ? process.env.API_CLOSE_URL : process.env.API_OPEN_URL, 20, 20, theme == 'dark' ? '#FFFFFF' : '#000000')}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}