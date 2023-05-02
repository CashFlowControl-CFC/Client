import React, { useEffect, useState } from "react";
import general from "../../styles/general";
import styles from "../../styles/TransactionPage";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { View, TouchableWithoutFeedback, Text, TextInput, Keyboard } from "react-native";
import moment from "moment";
import {Calendar} from 'react-native-calendars';
import getImage from "../../resources/imageComponent";
import {API_CALENDAR_URL, API_PLUS_URL, API_URL} from '@env';
import { addData } from "../../modules/requests";

export default function Transaction({navigation}){
    const dispatch = useDispatch();
    const isIncome = useSelector(state => state.transaction.isIncome);
    const categories = useSelector(state => state.category.categories);
    const [value, setValue] = useState('');
    const [comment, setComment] = useState(null);
    const [isMove, setIsMove] = useState(false);
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [dateToday, setDateToday] = useState(moment(new Date()));
    const [selectedDate, setSelectedDate] = useState(moment(new Date()));
    const [lastDate, setLastDate] = useState(moment(new Date()).add(-2, 'days'));
    const [selectedBtn, setSelectedBtn] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        filterCategories();
    }, [isIncome])

    useEffect(() => {
        LastDate();
    }, [selectedDate])

    useEffect(() => {
        if (value > 0 && selectedDate && selectedCategory) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      }, [value, selectedDate, selectedCategory]);

    const SelectCategory = (id) => {
        if (selectedCategory == id){
            setSelectedCategory(null);
        }
        else if(id != 'add'){
            setSelectedCategory(id);
        }
    }
    const filterCategories = () =>{
        setData([...categories?.filter(item => item.isIncome == isIncome || item.isIncome == null).slice(0, 5), 
        { id: 'add', color: '#FECC7A',  image_link: API_PLUS_URL}]);
    }
    const LastDate = () =>{
        if(selectedDate.format('MM/DD') == dateToday.format('MM/DD')){
            setSelectedBtn(1);
            selectedDate.clone().add(-2, 'days').format('MM/DD');
        }
        else if(selectedDate.format('MM/DD') == dateToday.clone().add(-1, 'days').format('MM/DD')){
            setSelectedBtn(2);
            selectedDate.clone().add(-2, 'days').format('MM/DD');
        }
        else{
            setLastDate(selectedDate);
        }
    }
    const SelectDate = (id, date) =>{
        setSelectedBtn(id);
        setSelectedDate(date);
    }
    const handleAddTransaction = async () => {
        if(isIncome){
            dispatch({type: 'ADD_INCOME', payload: value})
        }
        else{
            dispatch({type: 'ADD_EXPENSES', payload: value})
        }
        let result = await addData(`${API_URL}/transaction`, {
            category_id: categories[selectedCategory-1].id, 
            user_id: 1, 
            date: `${selectedDate.format('YYYY-MM-DD')}`, 
            comment: comment, 
            cash: value, 
            isIncome: isIncome
        })
        console.log(result)
        dispatch({type: 'ADD_TRANSACTION', payload: result})
        navigation.navigate('Main')    
    }
    return(
        <TouchableWithoutFeedback 
        onPress={() => {
            Keyboard.dismiss();
            setShowDatePicker(false);
            setIsMove(false);
            }}>
        <View style={[general.app, isMove ? general.isMove : null]}>
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
                                    placeholder='0'
                                    placeholderTextColor={'#D8D8D880'}
                                    keyboardType="numeric" 
                                    style={[general.inputMoney, {width: "50%"}]}
                                    value={value} 
                                    onChangeText={(text) => {
                                        if (/^[0-9]*[.,]?[0-9]*$/.test(text)) {
                                          setValue(text);
                                        }
                                      }}
                                      /> 
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
                                        {getImage(item.image_link, 35, 35, item.image_color)}
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
                    <TouchableWithoutFeedback onPress={() => SelectDate(1, dateToday)}>
                            <View style={[styles.dateBtn, selectedBtn == 1 ? {backgroundColor: '#FDCD8120'} : null]}>
                                <Text style={[general.generalText, {fontSize: 15}]}>{`${dateToday.clone().format('MM/DD')}`}</Text>
                                <Text style={[general.generalText, {fontSize: 15}]}>today</Text>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => SelectDate(2, dateToday.clone().add(-1, 'days'))}>
                            <View style={[styles.dateBtn, selectedBtn == 2 ? {backgroundColor: '#FDCD8120'} : null]}>
                                <Text style={[general.generalText, {fontSize: 15}]}>{`${dateToday.clone().add(-1, 'days').format('MM/DD')}`}</Text>
                                <Text style={[general.generalText, {fontSize: 15}]}>yesterday</Text>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => SelectDate(3, lastDate)}>
                            <View style={[styles.dateBtn, selectedBtn == 3 ? {backgroundColor: '#FDCD8120'} : null]}>
                                <Text style={[general.generalText, {fontSize: 15}]}>{`${lastDate.format('MM/DD')}`}</Text>
                                <Text style={[general.generalText, {fontSize: 15}]}>last</Text>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback  onPress={() => setShowDatePicker(!showDatePicker)}>
                        <View style={styles.calendar}>
                            {getImage(API_CALENDAR_URL, 35, 35, '#FFFFFF')}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                
                    <View style={{width: "90%", marginTop: "5%"}}>
                        <Text style={[general.generalText, {direction: 'rtl'}]}>Comment</Text>
                        <TextInput 
                                    onBlur={() =>setIsMove(false)}
                                    onPressIn={() =>setIsMove(true)}
                                    placeholder="Comment"
                                    placeholderTextColor={"#D8D8D880"}
                                    style={[general.inputComment, {width: "100%"}]}
                                    value={comment} 
                                    onChangeText={(comment) => setComment(comment)}/>    
                    </View>
                <TouchableWithoutFeedback disabled={disabled} onPress={handleAddTransaction}>
                    <View style={[styles.addBtn, disabled ? {backgroundColor: '#FECC7A50'} : {backgroundColor: '#FECC7A'}]}>
                        <Text style={styles.addText}>Add</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.calendarPos}>
                {showDatePicker ? <Calendar 
                        style={{
                            borderRadius: 15,
                            height: 450,
                            width: 300
                        }}
                        maxDate={moment().format('YYYY-MM-DD')}
                        onDayPress={day => {
                            setShowDatePicker(false);
                            SelectDate(3, moment(day.dateString))
                        }}
                        markedDates={{
                            [selectedDate]: {selectedDate: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                        }}
                        theme={{
                            backgroundColor: '#252525',
                            calendarBackground: '#252525',
                            textSectionTitleColor: '#FDCD81',
                            selectedDayTextColor: '#FDCD81',
                            todayTextColor: '#FDCD81',
                            dayTextColor: '#FFFFFF',
                            arrowColor: '#FDCD81',
                            monthTextColor: '#FDCD81',
                            textDisabledColor: '#FDCD8140',
                            
                        }}
                        /> : null}
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}