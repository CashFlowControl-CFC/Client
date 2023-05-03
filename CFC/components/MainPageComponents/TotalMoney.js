import React, { useContext, useEffect } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import general from "../../styles/general";
import styles from "../../styles/MainPage";
import { MainContext } from "../../modules/context";
import {API_BAG_URL} from '@env';
import getImage from "../../resources/imageComponent";
import { useDispatch, useSelector } from "react-redux";
import TransactionType from "../General/TransactionType";

function TotalMoney(){
    const {setModalVisible} = useContext(MainContext);
    const totalMoney = useSelector(state => state.account.cash);
    const activeAccount = useSelector(state => state.account.activeAccount);
    const accounts = useSelector(state => state.account.accounts);
    const dispatch = useDispatch();
    useEffect(()=>{
        setCash();
    }, [accounts, activeAccount])
    const setCash = async () =>{
        let res = await accounts.filter(item => item.id == activeAccount);
        dispatch({type: 'SET_CASH', payload: res[0].cash});
    }
    return(
        <View style={general.header}>
                <TouchableWithoutFeedback onPressIn={() => setModalVisible(true)}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {getImage(API_BAG_URL, 20, 20, '#FFFFFF')}
                        <Text style={[general.generalText, {fontSize: 20}]}>Total:</Text>
                        <Text style={styles.totalMoney}>${totalMoney}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TransactionType/>
            </View>
    );
}

export default TotalMoney;