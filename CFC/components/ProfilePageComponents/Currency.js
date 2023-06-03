import React, { useState } from "react";
import { TouchableWithoutFeedback, View, Text, Modal, FlatList } from "react-native";
import general from "../../styles/general";
import { useDispatch, useSelector } from "react-redux";

export default function Currency(props){
    const symbols = useSelector(state => state.currency.symbols);
    const current = useSelector(state => state.currency.current);
    const dispatch = useDispatch();
    const onSelect = (id) => {
        const index = symbols.findIndex(item => item.id == id);
        dispatch({type: 'SET_CURRENT', payload: symbols[index].name});
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