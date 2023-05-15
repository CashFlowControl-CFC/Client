import React from "react";
import { View, Text, TextInput } from "react-native";
import general from "../../styles/general";

export default function PasswordInput(props){
    return(
        <View style={{width: "100%", marginTop: "7%", alignItems: 'center'}}>
            <Text style={general.generalText}>Enter your password</Text>
            <View style={{width: "90%", direction: 'rtl', marginTop: "5%"}}>
                <Text style={[general.generalText]}>Password</Text> 
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#D8D8D880"
                    textContentType="password"
                    style={[general.inputComment, { width: "100%" }]}
                    value={props.password}
                    onChangeText={(text) => {
                        if (/^[a-zA-Z0-9]{0,30}$/.test(text)) {
                            props.setPassword(text);
                        }
                    }}
                />
            </View>
        </View>
    );
}