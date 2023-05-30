import React, { useEffect, useState } from "react";
import CommonHeader from "../General/CommonHeader";
import { TouchableWithoutFeedback, View } from "react-native";
import general from "../../styles/general";
import { useRoute } from "@react-navigation/native";
import ProgressBarCircle from "../TargetComponents/ProgressBarCircle";
import SelectedTarget from "../TargetComponents/SelectedTarget";
import LastInstallment from "../TargetComponents/LastInstallment";
import getImage from "../../resources/imageComponent";
import ModalCash from "../MainPageComponents/ModalCash";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ModalRemove from "../General/ModalRemove";

export default function TargetInfo({navigation}){
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const targets = useSelector(state => state.target.targets);
    const [target, setTarget] = useState(route.params?.target);

   useEffect(() => {
    let index = targets.findIndex(item => item.cash >= target.total_cash);
    if(index != -1){
        navigation.goBack();
    }
   }, [targets])
    const handleAddMoney = (value) => {
        console.log(value);
        let index = targets.findIndex(item => item.id === target.id);
        if(index != -1){
            dispatch({type: 'UPDATE_TARGET', payload: {newItem: {...targets[index], 
                cash: Number(target.cash) + Number(value),
                last_cash: value,
                last_installment_date: moment(new Date()).format('YYYY-MM-DD')
            }, 
                index: index}});
            setTarget({...targets[index], 
                cash: Number(target.cash) + Number(value),
                last_cash: value > 0 ? value : target.last_cash,
                last_installment_date: moment(new Date()).format('YYYY-MM-DD'),
                percent: Math.round(((Number(target.cash)+ Number(value)) * 100) / Number(route.params?.target.total_cash))
            });
        }
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
                <CommonHeader navigation={navigation} title={`Target: ${target.name}`} image_link={process.env.API_PURPOSE_URL}/>
                <View style={general.content}>
                    <View style={{marginTop: '10%'}}>
                        <ProgressBarCircle target={target}/>
                    </View>
                    <SelectedTarget target={target}/>
                    {target.last_installment_date && <LastInstallment target={target}/>}

                    <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                        <View style={[general.addBtn, {position: 'absolute', bottom: 25, right: 20}]}>
                            {getImage(process.env.API_PLUS_URL, 30, 30)}
                        </View>
                    </TouchableWithoutFeedback>   
                </View>
            </View>
    );
}