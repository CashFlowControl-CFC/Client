import React, { useState } from "react";
import { TouchableWithoutFeedback, View, Text, Modal, FlatList } from "react-native";
import general from "../../styles/general";
import { useDispatch, useSelector } from "react-redux";

export default function Currency(props){
    const symbols = useSelector(state => state.currency.symbols);
    const current = useSelector(state => state.currency.current);
    const currency = useSelector(state => state.currency.currency);
    const totalMoney = useSelector(state => state.transaction.totalMoney);
    const dispatch = useDispatch();

    const onSelect = async (id) => {
        const index = symbols.findIndex(item => item.id == id);
        const currencyIndex = currency.findIndex(item => item.ccy == symbols[index].name);
        dispatch({type: 'SET_CURRENT', payload: symbols[index].name});
        if(currencyIndex != -1){
            dispatch({type: 'SET_CURRENCY_MONEY', payload: Math.round(Number(totalMoney) / Number(currency[currencyIndex].sale))})
        }
        else{
            dispatch({type: 'SET_CURRENCY_MONEY', payload: Number(totalMoney)})
        }
    }
    
    return (
        <View style={{width: '90%', justifyContent: 'center', alignItems: 'center'}}>
                {!props.showModal ? 
                <TouchableWithoutFeedback onPress={() => props.setShowModal(true)}>
                    <View style={{width: '25%', marginTop: '5%', alignSelf: 'flex-start'}}>
                        <Text style={[general.generalText, {color: '#D8D8D8', textDecorationLine: 'underline'}]}>Currency</Text>
                        <Text style={[general.generalText, {fontSize: 19, marginTop: 5}]}>{symbols.findLast(item => item.name == current).symb} {current}</Text>
                    </View> 
                </TouchableWithoutFeedback>
                :
                    <View style={general.modalCurrency}>
                        <Text style={[general.generalText, {color: '#D8D8D8'}]}>Currency</Text>
                        
                        <FlatList keyExtractor={item => item.id}
                            data={symbols} 
                            renderItem={({item}) => 
                            <TouchableWithoutFeedback onPress={() => onSelect(item.id)}>
                                <Text style={[general.generalText, 
                                    {fontSize: 19, marginTop: 5},
                                    current === item.name && general.selected
                                ]}>{item.symb} {item.name}</Text>
                            </TouchableWithoutFeedback>}
                        />
                    </View>
                }
                
        </View>
    );
}