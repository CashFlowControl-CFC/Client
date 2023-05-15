import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import general from "../../styles/general";
import EmailInput from "../AuthComponents/EmailInput";
import PasswordInput from "../AuthComponents/PasswordInput";

export default function LogIn({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^[a-zA-Z0-9]{8,30}$/;
    const isValidEmail = () =>{
        return emailPattern.test(email);
    }
    const isValidPassword = () =>{
        return passwordPattern.test(password);
    }
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={general.app}>
                        <View style={general.header}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={[general.generalText, { fontSize: 20  }]}>Log In</Text>
                                    </View>
                            </View>     
                        <View style={[general.content]}>
                            <EmailInput email={email} setEmail={setEmail}/>
                            <PasswordInput password={password} setPassword={setPassword}/>
                        </View>
                    </View>
        </TouchableWithoutFeedback>
    );
}