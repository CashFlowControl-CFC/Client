import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback,Keyboard } from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import VerifiedInput from "../AuthComponents/VerifiedInput";
import { useRoute } from "@react-navigation/native";
import { addData } from "../../modules/requests";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { saveAccessToken } from "../../modules/storage";
import AuthHeader from "../AuthComponents/AuthHeader";
import { useDispatch } from "react-redux";
import { FIREBASE_AUTH } from "../../modules/FirebaseConfig";
export default function VerifiedEmail({navigation}){
    const route = useRoute();
    const [password,setPassword]=useState(route.params?.password)
    const [email,setEmail]=useState(route.params?.email)
    const [code,setCode]=useState(route.params?.code)
    const [usercode,setUserCode]=useState('')
    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useDispatch();
    const auth = FIREBASE_AUTH
    const isVerified=async()=>{
        console.log("User email:",email,"\npass",password,"\ncode:",code,"\ncode input",usercode)
        if(code===usercode){
            var userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            userCredentials.user.emailVerified=true
            const user = await addData(`${process.env.API_URL}/auth/register`,userCredentials.user)
            await saveAccessToken(user.accesstoken)
            await dispatch({type:"SET_USER",payload:user})
        }
        else{
            alert("Code is uncorrect")
        }
        const result = addData(`${process.env.API_URL}/mail/codeverified`,{usercode:usercode})
    }
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={general.app}>
                <AuthHeader navigation={navigation} title={'Verified'} />
                <View style={[general.content, { flexDirection: 'column' }]}>
                    <VerifiedInput value={usercode} setUserCode={setUserCode}></VerifiedInput>
                    <TouchableWithoutFeedback
                                onPress={isVerified}
                                onPressIn={() => setIsPressed(true)}
                                onPressOut={() => setIsPressed(false)}>
                                <View style={[general.addAuthBtn, { backgroundColor: !isPressed ? '#FECC7A' : '#fcbe53' }]}>
                                    <Text style={general.addText}>Verified</Text>
                                </View>
                            </TouchableWithoutFeedback>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
