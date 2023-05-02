import React, { useContext } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import general from "../../styles/general";
import styles from "../../styles/MainPage";
import { MainContext } from "../../modules/context";
import {API_BAG_URL} from '@env';
import getImage from "../../resources/imageComponent";
import { useDispatch, useSelector } from "react-redux";


function TotalMoney(){
    const {setModalVisible} = useContext(MainContext);
    const dispatch = useDispatch();
    const totalMoney = useSelector(state => state.transaction.totalMoney);
    const isIncome = useSelector(state => state.transaction.isIncome);
    return(
        <View style={general.header}>
                <TouchableWithoutFeedback onPressIn={() => setModalVisible(true)}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {getImage(API_BAG_URL, 20, 20, '#FFFFFF')}
                        <Text style={[general.generalText, {fontSize: 20}]}>Total:</Text>
                        <Text style={styles.totalMoney}>${totalMoney}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <View style={{flexDirection: "row", alignItems: "center", width: "90%", justifyContent: 'space-around'}}>
                    <TouchableWithoutFeedback onPress={() => dispatch({type:'EXPENSES'})}>
                        <Text style={[general.generalText, {fontSize: 19}, !isIncome ? general.selected : '']}>EXPENSES</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => dispatch({type:'INCOME'})}>
                        <Text style={[general.generalText, {fontSize: 19}, isIncome ? general.selected : '']}>INCOME</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
    );
}

export default TotalMoney;