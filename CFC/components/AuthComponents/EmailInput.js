import React from "react";
import { View, Text, TextInput } from "react-native";
import general from "../../styles/general";

export default function EmailInput(props){
    return(
        <View style={{width: "100%", marginTop: "7%", alignItems: 'center'}}>
            <Text style={general.generalText}>Enter your email</Text>
            <View style={{width: "90%", direction: 'rtl', marginTop: "5%"}}>
                <Text style={[general.generalText]}>E-mail</Text> 
                <TextInput          placeholder="E-mail"
                                    placeholderTextColor={props.isValidEmail ? "#D8D8D880" : '#973F3F'}
                                    textContentType='emailAddress'
                                    style={[general.inputComment, {width: "100%", color: props.isValidEmail ?'#D8D8D8' : '#973F3F'}]}
                                    onPressIn={() => props.setIsValidEmail(true)}
                                    value={props.email} 
                                    onChangeText={(text) => {
                                        if(/^[a-zA-Z0-9._%+-@]*$/.test(text)){
                                            props.setEmail(text)
                                        }
                                    }}/>
            </View>
        </View>
    );
}