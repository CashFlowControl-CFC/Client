import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import EmailInput from "../AuthComponents/EmailInput";
import PasswordInput from "../AuthComponents/PasswordInput";
import AuthHeader from "../AuthComponents/AuthHeader";
import { FIREBASE_AUTH } from "../../modules/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addData } from "../../modules/requests";
import { saveAccessToken } from "../../modules/storage";

export default function LogIn({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(null);
    const [isValidPassword, setIsValidPassword] = useState(null);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^[a-zA-Z0-9]{8,30}$/;
    const [isPressed, setIsPressed] = useState(false);
    const [loading,setLoading] = useState(false)
    const auth = FIREBASE_AUTH
    const dispatch = useDispatch();
    const authorization = async () =>{
        setLoading(true);
        try {
            if(emailPattern.test(email) && passwordPattern.test(password)){
                const userCredentials = await signInWithEmailAndPassword(auth,email,password)
                console.log("auth/login")
                const result = await addData(`${process.env.API_URL}/auth/login`,userCredentials.user)
                console.log("result login",result)
                await saveAccessToken(result.accesstoken)
                await dispatch({type:"SET_USER",payload:result})
                setIsValidEmail(true);
                setIsValidPassword(true);
            }
            else{
                setIsValidEmail(false);
                setIsValidPassword(false);
            }
        } catch (error) {
            console.log("error", error.message)
            setIsValidEmail(false);
            setIsValidPassword(false);
        }finally{
            setLoading(false)
        }
    }
    const registration = async () =>{
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth,email,password)
        } catch (error) {
            console.log(error.message)
        }finally{
            setLoading(false)
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
                        {loading ? <ActivityIndicator style={general.addAuthBtn} size="large" color="#fcbe53"/>
                            : 
                            <TouchableWithoutFeedback 
                                            onPress={authorization} 
                                            onPressIn={() => setIsPressed(true)} 
                                            onPressOut={() => setIsPressed(false)}>
                                    <View style={[general.addAuthBtn, {backgroundColor: !isPressed ? '#FECC7A' : '#fcbe53'}]}>
                                        <Text style={general.addText}>Next</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            }   
                            </View>
                    </View>
        </TouchableWithoutFeedback>
    );
}