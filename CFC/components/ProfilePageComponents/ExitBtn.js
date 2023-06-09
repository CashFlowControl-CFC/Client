import React from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import { FIREBASE_AUTH } from "../../modules/FirebaseConfig";
import { useDispatch } from "react-redux";
import { removeAccessToken } from "../../modules/storage";

export default function ExitBtn(props){
    const dispatch = useDispatch();
    const logOut = async () =>{
        console.log("log out")
        FIREBASE_AUTH.signOut()
        await removeAccessToken()
        await dispatch({type:"SET_USER",payload:null})
    }
    return (
        <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 70,}}>
            <TouchableWithoutFeedback onPress={logOut}>
                    <View style={{width: '90%', alignSelf: 'flex-start'}}>
                        <Text style={[general.addText, {color: '#FDCD81', fontSize: 20, fontWeight: 500}]}>Exit</Text>
                    </View>
            </TouchableWithoutFeedback>
        </View>
    );
}