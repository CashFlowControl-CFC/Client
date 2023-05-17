import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import general from "../../styles/general";
import EmailInput from "../AuthComponents/EmailInput";
import PasswordInput from "../AuthComponents/PasswordInput";
import AuthHeader from "../AuthComponents/AuthHeader";
import { login } from "../../modules/requests";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogIn({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(null);
    const [isValidPassword, setIsValidPassword] = useState(null);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^[a-zA-Z0-9]{8,30}$/;
    const [isPressed, setIsPressed] = useState(false);

    const authorization = async () =>{
        if(emailPattern.test(email) && passwordPattern.test(password)){
            let res = await login(`${process.env.API_URL}/auth/login`, {
                email: email,
                password: password
            })
            if(res.status == 200){
                
                setIsValidEmail(true);
                setIsValidPassword(true);
            }
            else{
                setIsValidEmail(false);
                setIsValidPassword(false);
            }
        }
        else{
            setIsValidEmail(false);
            setIsValidPassword(false);
        }
    }
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={general.app}>
                       <AuthHeader navigation={navigation} title={'Log In'}/> 

                        <View style={[general.content, {flexDirection: 'column'}]}>
                            <EmailInput email={email} 
                            setEmail={setEmail} 
                            isValidEmail={isValidEmail === false ? isValidEmail : true}
                            setIsValidEmail={setIsValidEmail}
                            />
                            <PasswordInput password={password} 
                            setPassword={setPassword} 
                            isValidPassword={isValidPassword === false ? isValidPassword : true}
                            setIsValidPassword={setIsValidPassword}
                            />
                        </View>
                        <View style={{position: 'absolute', bottom: 25}}>
                                <TouchableWithoutFeedback 
                                            onPress={authorization} 
                                            onPressIn={() => setIsPressed(true)} 
                                            onPressOut={() => setIsPressed(false)}>
                                    <View style={[general.addAuthBtn, {backgroundColor: !isPressed ? '#FECC7A' : '#fcbe53'}]}>
                                        <Text style={general.addText}>Next</Text>
                                    </View>
                                </TouchableWithoutFeedback>   
                            </View>
                    </View>
        </TouchableWithoutFeedback>
    );
}