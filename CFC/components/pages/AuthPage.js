import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import general from "../../styles/general";

export default function AuthPage({navigation}){
    return(
        <View style={general.app}>
            <View style={[general.authContent]}>
                <Text style={[general.generalText, {width: '60%', textAlign: 'center'}]}>
                    In order not to lose data,
                    please, login or registration
                </Text>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('Registration')}> 
                    <View style={[general.addAuthBtn, {backgroundColor: '#FECC7A'}]}>
                        <Text style={general.addText}>Registration</Text>
                    </View>
                </TouchableWithoutFeedback>  

                <TouchableWithoutFeedback onPress={() => navigation.navigate('LogIn')}>
                    <View>
                        <Text style={[general.addText, {color: '#FDCD81'}]}>Sign in</Text>
                    </View>
                </TouchableWithoutFeedback> 
            </View>
        </View>
    );
}