import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import general from "../../styles/general";

function TransactionType(){
    const dispatch = useDispatch();
    const isIncome = useSelector(state => state.transaction.isIncome);
    return (
        <View style={{flexDirection: "row", alignItems: "center", width: "90%", justifyContent: 'space-around'}}>
        <TouchableWithoutFeedback onPress={() => dispatch({type:'EXPENSES'})}>
            <Text style={[general.generalText, {fontSize: 19}, !isIncome ? general.selected : '']}>EXPENSES</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => dispatch({type:'INCOME'})}>
            <Text style={[general.generalText, {fontSize: 19}, isIncome ? general.selected : '']}>INCOME</Text>
        </TouchableWithoutFeedback>
    </View>     
    );
}

export default TransactionType;