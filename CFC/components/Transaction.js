import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import styles from "../styles/TransactionPage";
import general from "../styles/general";
import { useDispatch, useSelector } from "react-redux";

export default function Transaction({navigation}){
    const dispatch = useDispatch();
    const isIncome = useSelector(state => state.isIncome);
    return(
        <View style={general.app}>
            <View style={general.header}>
                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={[general.generalText, { fontSize: 20  }]}>Add Transactions</Text>
                </View>
                    <View style={{flexDirection: "row", alignItems: "center", width: "90%", justifyContent: 'space-around'}}>
                        <TouchableWithoutFeedback onPress={() => dispatch({type: "EXPENSES"})}>
                            <Text style={[general.generalText, {fontSize: 19}, !isIncome ? general.selected : '']}>EXPENSES</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => dispatch({type: "INCOME"})}>
                            <Text style={[general.generalText, {fontSize: 19}, isIncome ? general.selected : '']}>INCOME</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

            <View style={general.content}>
                <View>
                    
                </View>
            </View>
        </View>
    );
}