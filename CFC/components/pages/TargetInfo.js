import React, { useState } from "react";
import CommonHeader from "../General/CommonHeader";
import { TouchableWithoutFeedback, View } from "react-native";
import general from "../../styles/general";
import { useRoute } from "@react-navigation/native";
import ProgressBarCircle from "../TargetComponents/ProgressBarCircle";
import SelectedTarget from "../TargetComponents/SelectedTarget";
import LastInstallment from "../TargetComponents/LastInstallment";
import getImage from "../../resources/imageComponent";
import ModalCash from "../MainPageComponents/ModalCash";
import { useDispatch } from "react-redux";

export default function TargetInfo({navigation}){
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    const handleAddMoney = (value) => {
        console.log(value);
        setModalVisible(false);
    }

    const object = {
        modalVisible: modalVisible, 
        setModalVisible: setModalVisible, 
        action: handleAddMoney,
        isTotalCash: false
    }
    return (
        <View style={general.app}>
                <ModalCash object={object}/>
                <CommonHeader navigation={navigation} title={`Target: ${route.params?.target.name}`} image_link={process.env.API_PURPOSE_URL}/>
                <View style={general.content}>
                    <View style={{marginTop: '10%'}}>
                        <ProgressBarCircle target={route.params?.target}/>
                    </View>
                    <SelectedTarget target={route.params?.target}/>
                    {route.params?.target.last_installment_date && <LastInstallment target={route.params?.target}/>}

                    <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                        <View style={[general.addBtn, {position: 'absolute', bottom: 25, right: 20}]}>
                            {getImage(process.env.API_PLUS_URL, 30, 30)}
                        </View>
                    </TouchableWithoutFeedback>   
                </View>
            </View>
    );
}