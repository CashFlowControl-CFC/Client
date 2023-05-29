import React from "react";
import CommonHeader from "../General/CommonHeader";
import { View } from "react-native";
import general from "../../styles/general";
import { useRoute } from "@react-navigation/native";
import ProgressBarCircle from "../TargetComponents/ProgressBarCircle";
import SelectedTarget from "../TargetComponents/SelectedTarget";
import LastInstallment from "../TargetComponents/LastInstallment";

export default function TargetInfo({navigation}){
    const route = useRoute();
    return (
        <View style={general.app}>
                <CommonHeader navigation={navigation} title={`Target: ${route.params?.target.name}`} image_link={process.env.API_PURPOSE_URL}/>
                <View style={general.content}>
                    <View style={{marginTop: '10%'}}>
                        <ProgressBarCircle target={route.params?.target}/>
                    </View>
                    <SelectedTarget target={route.params?.target}/>
                    {route.params?.target.last_installment_date && <LastInstallment target={route.params?.target}/>}
                </View>
            </View>
    );
}