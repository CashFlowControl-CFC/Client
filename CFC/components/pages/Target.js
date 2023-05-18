import React, { useState } from "react";
import general from "../../styles/general";
import { View } from "react-native";
import CommonHeader from "../General/CommonHeader";
import { TargetContext } from "../../modules/context";
import TargetPeriodButtons from "../TargetComponents/TargetPeriodBtns";
import LineChart from "../TargetComponents/LineChart";

export default function Target({navigation}){
    const [selectedPeriod, setSelectedPeriod] = useState();
    const contextValue = {
        selectedPeriod,
        setSelectedPeriod
    }
    return(
        <TargetContext.Provider value={contextValue}>
            <View style={general.app}>
                <CommonHeader navigation={navigation} title='Purpose' image_link={process.env.API_PURPOSE_URL}/>

                <View style={general.content}>
                    <TargetPeriodButtons/>
                    <LineChart/>
                </View>
            </View>
        </TargetContext.Provider>
    );
}