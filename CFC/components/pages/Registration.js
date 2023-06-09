import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import general from "../../styles/general";
import EmailInput from "../AuthComponents/EmailInput";
import PasswordInput from "../AuthComponents/PasswordInput";
import AuthHeader from "../AuthComponents/AuthHeader";

import { addData } from "../../modules/requests";


export default function Registration({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPass, setRepeatedPass] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(null);
    const [isValidPassword, setIsValidPassword] = useState(null);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^[a-zA-Z0-9]{8,30}$/;
    const [isValidRepeatedPass, setIsValidRepeatedPass] = useState(null);
    const [isPressed, setIsPressed] = useState(false);
    const [loading, setLoading] = useState(false)


    const isValid = async () => {

        setLoading(true)
        try {
            if (emailPattern.test(email) && passwordPattern.test(password) && password === repeatedPass) {
                setIsValidEmail(true);
                setIsValidPassword(true);
                setIsValidRepeatedPass(true);
                const result = await addData(`${process.env.API_URL}/mail/codesend`,{email:email})
                console.log('answer server',result.code)
                navigation.navigate("Verified",{password:password,email:email,code:result.code})
            }
            else {
                setIsValidEmail(false);
                setIsValidPassword(false);
                setIsValidRepeatedPass(false);
            }
        } catch (error) {
            console.log("error", error)
            setIsValidEmail(false);
            setIsValidPassword(false);
            setIsValidRepeatedPass(false);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={general.app}>

                <AuthHeader navigation={navigation} title={'Registration'} />
                <View style={[general.content, { flexDirection: 'column' }]}>
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
                    <View style={{ position: 'absolute', bottom: 25 }}>
                        {loading ? <ActivityIndicator style={general.addAuthBtn} size="large" color="#fcbe53" /> :
                            <TouchableWithoutFeedback
                                onPress={isValid}
                                onPressIn={() => setIsPressed(true)}
                                onPressOut={() => setIsPressed(false)}>
                                <View style={[general.addAuthBtn, { backgroundColor: !isPressed ? '#FECC7A' : '#fcbe53' }]}>
                                    <Text style={general.addText}>Next</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}