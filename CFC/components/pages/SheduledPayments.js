import React, { useState } from "react";
import general from "../../styles/general";
import { View } from "react-native";
import CommonHeader from "../General/CommonHeader";
import { TargetContext } from "../../modules/context";
import PaymentList from "../PaymentsComponents/PaymentList";

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
                <View style={{width: "100%", flex: 1, alignItems: 'center', marginTop: '5%'}}>
                        <PaymentList navigation={navigation}/>
                    </View>
                </View>
            </View>
        </TargetContext.Provider>
    );
}