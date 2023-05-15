import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import general from "../../styles/general";
import EmailInput from "../AuthComponents/EmailInput";
import PasswordInput from "../AuthComponents/PasswordInput";
import getImage from "../../resources/imageComponent";
import AuthHeader from "../AuthComponents/AuthHeader";

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
                       <AuthHeader navigation={navigation} title={'Log In'}/> 

                        <View style={[general.content, {flexDirection: 'column'}]}>
                            <EmailInput email={email} setEmail={setEmail}/>
                            <PasswordInput password={password} setPassword={setPassword}/>
                        </View>
                        <View style={{position: 'absolute', bottom: 25}}>
                                <TouchableWithoutFeedback>
                                    <View style={[general.addAuthBtn, {backgroundColor: '#FECC7A'}]}>
                                        <Text style={general.addText}>Next</Text>
                                    </View>
                                </TouchableWithoutFeedback>   
                            </View>
                    </View>
        </TouchableWithoutFeedback>
    );
}