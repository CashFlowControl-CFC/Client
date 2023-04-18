import React, { useState } from "react";
import general from "../styles/general";
import styles from "../styles/TransactionPage";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import getImageComponent from "../resources/imageComponent";
import { View, TouchableWithoutFeedback, Text, TextInput, Keyboard } from "react-native";
import moment from "moment";
import Calendar from "../resources/calendar";

export default function Transaction({navigation}){
    const dispatch = useDispatch();
    const isIncome = useSelector(state => state.isIncome);
    const [value, setValue] = useState('0');
    const [categories, setCategories] = useState([
        {id: 1, name: 'Family', image: 'family.js', color: "#FF9876", isIncome: false},
        {id: 2, name: 'Products', image: 'products.js', color: "#6BEBDC", isIncome: false},
        {id: 3, name: 'Transport', image: 'transport.js', color: "#9FC9FF", isIncome: false},
        {id: 4, name: 'Sport', image: 'sport.js', color: "#6BEBB2", isIncome: false},
        {id: 5, name: 'Gifts', image: 'gift.js', color: "#FF8C8C", isIncome: false},
    ]);
    const data = [...categories.slice(0, 5), { id: 'add', color: '#FECC7A',  image: 'plus'}];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [dateToday, setDateToday] = useState(moment(new Date()));
    const [selectedDate, setSelectedDate] = useState(moment(new Date()));
    const SelectCategory = (id) => {
        if (selectedCategory == id){
            setSelectedCategory(null);
        }
        else if(id != 'add'){
            setSelectedCategory(id);
        }
    }
    const SelectDate = () =>{
        if(selectedDate.format('MM/DD') == dateToday.format('MM/DD')){
            return selectedDate.clone().add(-2, 'days').format('MM/DD');
        }
        return selectedDate.clone().add(-3, 'days').format('MM/DD');
    }
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
                            <TouchableWithoutFeedback onPress={() => SelectCategory(item.id)}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={[selectedCategory == item.id ? {backgroundColor: item.color + "40"} : null, styles.catItem]}>
                                        <View style={[styles.catCircle, {backgroundColor: item.color}]}> 
                                            {getImageComponent(item.image, 40, 40)}
                                        </View>
                                    </View>
                                    <Text style={[general.generalText, {fontSize: 15}]}>{item.name}</Text>
                                </View>
                            </TouchableWithoutFeedback>}
                            keyExtractor={(item) => item.id}
                            numColumns={3}
                            contentContainerStyle={styles.catList}
                            />
                    </View>
                </View>
                <View style={styles.dateRow}>
                    <TouchableWithoutFeedback>
                            <View style={styles.dateBtn}>
                                <Text style={[general.generalText, {fontSize: 15}]}>{`${dateToday.clone().format('MM/DD')}`}</Text>
                                <Text style={[general.generalText, {fontSize: 15}]}>today</Text>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                            <View style={styles.dateBtn}>
                                <Text style={[general.generalText, {fontSize: 15}]}>{`${dateToday.clone().add(-1, 'days').format('MM/DD')}`}</Text>
                                <Text style={[general.generalText, {fontSize: 15}]}>yesterday</Text>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                            <View style={styles.dateBtn}>
                                <Text style={[general.generalText, {fontSize: 15}]}>{`${SelectDate()}`}</Text>
                                <Text style={[general.generalText, {fontSize: 15}]}>last</Text>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Calendar width={30} height={30}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}