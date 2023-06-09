import React, { useEffect, useState } from "react";
import CommonHeader from "../General/CommonHeader";
import { TouchableWithoutFeedback, View } from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import { useRoute } from "@react-navigation/native";
import ProgressBarCircle from "../TargetComponents/ProgressBarCircle";
import SelectedTarget from "../TargetComponents/SelectedTarget";
import LastInstallment from "../TargetComponents/LastInstallment";
import getImage from "../../resources/imageComponent";
import ModalCash from "../MainPageComponents/ModalCash";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateData } from "../../modules/requests";
import { changeCurrencyFromUAH, changeCurrencyToUAH } from "../../modules/generalFuncs";

export default function TargetInfo({navigation}){
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const targets = useSelector(state => state.target.targets);
    const [target, setTarget] = useState(route.params?.target);
    const current = useSelector(state => state.currency.current);
    const currency = useSelector(state => state.currency.currency);

   useEffect(() => {
    let valueCurrency = Number(target.total_cash);
    if(current != 'UAH'){
        valueCurrency = changeCurrencyToUAH(Number(target.total_cash), currency, current);
    }
    let index = targets.findIndex(item => item.cash >= Number(valueCurrency));
    if(index != -1){
        navigation.goBack();
    }
   }, [targets])
    const handleAddMoney = async (value) => {
        let valueCurrency = value.replace(',', '.');
        if(current != 'UAH'){
            valueCurrency = changeCurrencyToUAH(value.replace(',', '.'), currency, current);
        }
        let result = await updateData(`${process.env.API_URL}/goal/${target.id}`, {
            cash:current != 'UAH' ? changeCurrencyToUAH(Number(target.cash) + Number(value.replace(',', '.')), currency, current) : Number(target.cash) + Number(valueCurrency),
            last_income: Number(valueCurrency),
            date_last_income: moment(new Date()).format('YYYY-MM-DD')
        });
        console.log(result.status)
        if(result.status == 200){
            let index = targets.findIndex(item => item.id === target.id);
            if(index != -1){
                dispatch({type: 'UPDATE_TARGET', payload: {newItem: {...targets[index], 
                    cash: current != 'UAH' ? changeCurrencyToUAH(Number(target.cash) + Number(value.replace(',', '.')), currency, current) : (Number(target.cash) + Number(valueCurrency)).toFixed(2),
                    last_income: Number(valueCurrency),
                    date_last_income: moment(new Date()).format('YYYY-MM-DD')
                }, 
                    index: index}});
                    if(current != 'UAH'){
                        setTarget({...targets[index], 
                            total_cash: changeCurrencyFromUAH(Number(target.total_cash), currency, current),
                            cash: (Number(target.cash) + Number(value.replace(',', '.'))).toFixed(2),
                            last_income: Number(value.replace(',', '.')) > 0 ? Number(value).toFixed(2) : Number(target.last_cash).toFixed(2),
                            date_last_income: moment(new Date()).format('YYYY-MM-DD'),
                            percent: Math.round(((target.cash + Number(value.replace(',', '.'))) * 100) / Number(route.params?.target.total_cash))
                        });
                    }
                    else{
                        setTarget({...targets[index], 
                            cash: (Number(target.cash) + Number(valueCurrency)).toFixed(2),
                            last_income: Number(valueCurrency) > 0 ? Number(valueCurrency).toFixed(2) : target.last_cash.toFixed(2),
                            date_last_income: moment(new Date()).format('YYYY-MM-DD'),
                            percent: Math.round(((Number(target.cash)+ Number(valueCurrency)) * 100) / Number(route.params?.target.total_cash))
                        });
                    }
            }
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
                    {target.date_last_income && <LastInstallment target={target}/>}

                    <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                        <View style={[general.addBtn, {position: 'absolute', bottom: 25, right: 20}]}>
                            {getImage(process.env.API_PLUS_URL, 30, 30)}
                        </View>
                    </TouchableWithoutFeedback>   
                </View>
            </View>
    );
}