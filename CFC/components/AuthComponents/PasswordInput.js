import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import general from "../../styles/general";
import getImage from "../../resources/imageComponent";

export default function PasswordInput(props){
    const [isClose, setIsClose] = useState(true);
    return(
        <View style={{width: "100%", marginTop: "7%", alignItems: 'center'}}>
            <Text style={general.generalText}>Enter your password</Text>
            <View style={{width: "90%", direction: 'rtl', marginTop: "5%"}}>
                <Text style={[general.generalText]}>Password</Text> 
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#D8D8D880"
                    textContentType="password"
                    secureTextEntry={isClose}
                    style={[general.inputComment, { width: "100%", zIndex: 0 }]}
                    value={props.password}
                    onChangeText={(text) => {
                        if (/^[a-zA-Z0-9]{0,30}$/.test(text)) {
                            props.setPassword(text);
                        }
                    }}
                />
                <TouchableWithoutFeedback onPress={() => setIsClose(!isClose)}>
                    <View style={{position: 'absolute', zIndex: 1, top: '50%'}}>
                        {getImage( isClose ? process.env.API_CLOSE_URL : process.env.API_OPEN_URL, 20, 20, '#FFFFFF')}
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </View>
    );
}