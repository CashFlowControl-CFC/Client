import React, { useState } from "react";
import general from "../../styles/general";
import { View } from "react-native";
import CommonHeader from "../General/CommonHeader";
import { TargetContext } from "../../modules/context";
import TargetList from "../TargetComponents/TargetList";

export default function ScheduledPayments({navigation}){
    const [selectedPeriod, setSelectedPeriod] = useState();

    const contextValue = {
        selectedPeriod,
        setSelectedPeriod
    }
    return(
        <TargetContext.Provider value={contextValue}>
            <View style={general.app}>
                <CommonHeader navigation={navigation} title='Scheduled payments' image_link={process.env.API_PURPOSE_URL}/>

                <View style={general.content}>
                    {/* <TargetList navigation={navigation}/> */}
                </View>
            </View>
        </TargetContext.Provider>
    );
}