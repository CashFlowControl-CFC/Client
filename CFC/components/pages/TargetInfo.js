import React from "react";
import CommonHeader from "../General/CommonHeader";
import { Text, View } from "react-native";
import general from "../../styles/general";
import { useRoute } from "@react-navigation/native";
import ProgressBarCircle from "../TargetComponents/ProgressBarCircle";

export default function TargetInfo({navigation}){
    const route = useRoute();
    return (
        <View style={general.app}>
                <CommonHeader navigation={navigation} title={`Target: ${route.params?.target.name}`} image_link={process.env.API_PURPOSE_URL}/>
                <View style={general.content}>
                    <View style={{marginTop: '10%'}}>
                        <ProgressBarCircle target={route.params?.target}/>
                    </View>
                </View>
            </View>
    );
}