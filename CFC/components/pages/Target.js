import React from "react";
import general from "../../styles/general";
import { View } from "react-native";
import CommonHeader from "../General/CommonHeader";

export default function Target({navigation}){
    return(
        <View style={general.app}>
            <CommonHeader navigation={navigation} title='Purpose' image_link={process.env.API_PURPOSE_URL}/>
        </View>
    );
}