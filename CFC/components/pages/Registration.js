import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import general from "../../styles/general";
import EmailInput from "../AuthComponents/EmailInput";
import PasswordInput from "../AuthComponents/PasswordInput";
import AuthHeader from "../AuthComponents/AuthHeader";
import { FIREBASE_AUTH, auth } from "../../modules/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export default function Registration({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPass, setRepeatedPass] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(null);
    const [isValidPassword, setIsValidPassword] = useState(null);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^[a-zA-Z0-9]{8,30}$/;
    const [isValidRepeatedPass, setIsValidRepeatedPass] = useState(null);
    const [isPressed, setIsPressed] = useState(false);

    const [loading,setLoading] = useState(false)
    const auth = FIREBASE_AUTH

    const isValid = async () =>{
        if(emailPattern.test(email)){
            setIsValidEmail(true);
        }
        else{
            setIsValidEmail(false);
        }
        if(passwordPattern.test(password)){
            setIsValidPassword(true);
        }
        else{
            setIsValidPassword(false);
        }
        if(password === repeatedPass){
            setIsValidRepeatedPass(true);
        }
        else{
            setIsValidRepeatedPass(false);
        }
    }
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={general.app}>
                
                       <AuthHeader navigation={navigation} title={'Registration'}/> 
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
                            text={'Enter your password'}
                            />
                            <PasswordInput password={repeatedPass} 
                            setPassword={setRepeatedPass} 
                            isValidPassword={isValidRepeatedPass === false ? isValidRepeatedPass : true}
                            setIsValidPassword={setIsValidRepeatedPass}
                            text={'Repeat your password'}
                            />
                            <View style={{position: 'absolute', bottom: 25}}>
                            <TouchableWithoutFeedback 
                                            onPress={isValid} 
                                            onPressIn={() => setIsPressed(true)} 
                                            onPressOut={() => setIsPressed(false)}>
                                    <View style={[general.addAuthBtn, {backgroundColor: !isPressed ? '#FECC7A' : '#fcbe53'}]}>
                                        <Text style={general.addText}>Next</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
        </TouchableWithoutFeedback>
    );
}