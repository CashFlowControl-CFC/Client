import React, { useContext, useEffect, useState } from "react";
import { View,  TouchableWithoutFeedback, Text} from "react-native";
import general from "../../styles/general";
import { VictoryPie } from "victory-native";
import { MainContext } from "../../modules/context";
import getImage from "../../resources/imageComponent";
import {API_PLUS_URL} from '@env'
import { useDispatch } from "react-redux";

function PieChart(){
    const {combinedData, filteredData, navigation} = useContext(MainContext);
    const [transactionMoney, setTransactionMoney] = useState(0);
    const dispatch = useDispatch();
    useEffect(() =>{
        sum();
    }, [filteredData]);
    const sum = () =>{
         const total = filteredData?.reduce((acc, cur) => Number(acc) + Number(cur.y), 0);
         setTransactionMoney(total);
    }
    const handleAddTransaction = () =>{
        
        dispatch({type: 'SET_SELECTED', payload: null});
        dispatch({type: 'SET_TRANS_CASH', payload: undefined});
        dispatch({type: 'SET_COMMENT', payload: undefined});
        dispatch({type: 'SET_DATE', payload: undefined});
        dispatch({type: 'SET_ISADD', payload: true});

        navigation.navigate('Transaction');
    }
    return (
            <View style={{alignItems: "center", justifyContent: 'center'}}>
            <VictoryPie
                data={combinedData?.length > 0 ? combinedData : [{ y: 1, fill: "#1E1E1E70"}]}
                width={250}
                height={250}
                innerRadius={70}
                radius={100}
                padding={{ top: 0, bottom: 0 }}
                style={{
                labels: {
                fill: 'transparent',
                }, 
                data:{
                    fill: ({ datum }) => datum.fill,
                }
            }}
            padAngle={3}
                /> 
        <TouchableWithoutFeedback onPress={handleAddTransaction}>
            <View style={general.addBtn}>
                {getImage(API_PLUS_URL, 30, 30)}
                </View>
        </TouchableWithoutFeedback>
        <Text style={{
            position: 'absolute',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 25,
            }}> ${transactionMoney} </Text>
        </View>     
    );
}

export default PieChart;