import React, { useState } from "react";
import general from "../styles/general";
import styles from "../styles/TransactionPage";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import getImageComponent from "../resources/imageComponent";
import { View, TouchableWithoutFeedback, Text, TextInput, Keyboard } from "react-native";

export default function Transaction({navigation}){
    const dispatch = useDispatch();
    const isIncome = useSelector(state => state.isIncome);
    const [value, setValue] = useState('0');
    const [categories, setCategories] = useState([
        {id: 1, name: 'Family', image: 'family.js', color: "#FF9876", isIncome: false},
        {id: 2, name: 'Food', image: 'food.js', color: "#6BEBDC", isIncome: false},
        {id: 3, name: 'Transport', image: 'transport.js', color: "#9FC9FF", isIncome: false},
        {id: 4, name: 'Sport', image: 'sport.js', color: "#6BEBB2", isIncome: false},
        {id: 5, name: 'Gifts', image: 'gifts.js', color: "#FF8C8C", isIncome: false},
        {id: 13, name: 'Transport', image: 'transport.js', color: "#9FC9FF", isIncome: false},
    ]);
    const data = [...categories.slice(0, 5), { id: 'add', color: '#FECC7A',  image: 'plus'}];
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={general.app} >
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
                <View style={{width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: "5%"}}>
                        <TextInput 
                                keyboardType="numeric" 
                                style={[general.inputMoney, {width: "50%"}]}
                                value={value} 
                                onChangeText={(value) => setValue(value)}/>         
                </View>
                <View style={styles.categories}>
                    <Text style={[general.generalText, {direction: 'rtl'}]}>Categories</Text>
                    <View>
                        <FlatList
                            data={data}
                            renderItem={({item}) => 
                            <View style={[styles.catCircle, {backgroundColor: item.color}]}> 
                                {getImageComponent(item.image, 40, 40)}
                            </View>}
                            keyExtractor={(item) => item.id}
                            numColumns={3}
                            contentContainerStyle={styles.catList}
                            />
                    </View>
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}