import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableWithoutFeedback, Text, Keyboard, ActivityIndicator } from "react-native";
import moment from "moment";
import general from "../../styles/general";
import { addData, updateData } from "../../modules/requests";
import AddBtn from "../General/AddBtn";
import CategoryList from "../General/CategoryList";
import MyCalendar from "../TransactionPageComponents/Calendar";
import MoneyInput from "../TransactionPageComponents/MoneyInput";
import DateButtons from "../TransactionPageComponents/DateButtons";
import CommentInput from "../TransactionPageComponents/CommentInput";
import Header from "../General/Header";
import { changeCurrencyFromUAH, changeCurrencyToUAH } from "../../modules/generalFuncs";

export default function Transaction({navigation}){
    const dispatch = useDispatch();
    const isIncome = useSelector(state => state.transaction.isIncome);
    const totalMoney = useSelector(state => state.transaction.totalMoney);
    const transactions = useSelector(state => state.transaction.data);
    const categories = useSelector(state => state.category.categories);
    const selectedCategory = useSelector(state => state.category.selectedCategory);
    const transComment = useSelector(state => state.transData.comment);
    const transCash = useSelector(state => state.transData.cash);
    const transDate = useSelector(state => state.transData.date);
    const isAdd = useSelector(state => state.transData.isAdd);
    const user = useSelector(state => state.user.user);
    const selectedTransaction = useSelector(state => state.transData.selectedTransaction);
    const current = useSelector(state => state.currency.current);
    const currency = useSelector(state => state.currency.currency);

    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(transCash ? transCash : '');
    const [comment, setComment] = useState(transComment ? transComment : '');
    const [selectedDate, setSelectedDate] = useState(moment(new Date()));

    const [data, setData] = useState([]);
    const [isMove, setIsMove] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState(transDate ? 3 : null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const object = {
        value,
        data,
        showDatePicker,
        selectedBtn, 
        comment, 
        selectedDate,
        setIsMove, 
        setComment,
        setSelectedBtn,
        setValue,
        setSelectedDate,
        setShowDatePicker
    };

    useEffect(() => {
        filterCategories();
    }, [isIncome, categories]);

    useEffect(() => {
        const setMoney = async () => {
            console.log('change total cash');
            let res = await updateData(`${process.env.API_URL}/user/${user.uid}`, {total_cash: parseFloat(totalMoney)})
            dispatch({type: 'SET_CURRENCY_MONEY', payload: changeCurrencyFromUAH(totalMoney, currency, current)});
        }
        setMoney();
    }, [totalMoney])

    const filterCategories = () =>{
        setData([...categories?.filter(item => item.isIncome == isIncome || item.isIncome == null)
            .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
            .slice(0, 5), 
        { id: 'add', color: '#FECC7A', image_link: process.env.API_PLUS_URL}]);
    }
    
    const handleAddTransaction = async () => {
        setLoading(true);
        let valueCurrency = value.replace(',', '.');
        if(current != 'UAH'){
            valueCurrency = changeCurrencyToUAH(value.replace(',', '.'), currency, current);
            console.log(valueCurrency);
        }
        if(isIncome){
            dispatch({type: 'ADD_INCOME', payload: parseFloat(valueCurrency)});
        }
        else{
            dispatch({type: 'ADD_EXPENSES', payload: parseFloat(valueCurrency)});
        }
        let result = await addData(`${process.env.API_URL}/transaction`, {
            category_id: selectedCategory, 
            uid: user.uid, 
            date: `${selectedDate.format('YYYY-MM-DD')}`, 
            comment: comment, 
            cash: valueCurrency, 
            isIncome: isIncome
        })
        let newDate = new Date();
        updateData(`${process.env.API_URL}/category/${selectedCategory}`, {lastUsed: newDate});
        let index = categories.findIndex(item => item.id == selectedCategory);
        if(index != -1){
            await dispatch({type: 'UPDATE_CATEGORY', payload: {newItem: {...categories[index], lastUsed: newDate}, index: index}})
        }
        await dispatch({type: 'ADD_TRANSACTION', payload: result});
        setLoading(false);
        navigation.navigate('Main');    
    }

    const handleUpdateTransaction = async () => {
        setLoading(true);
        let valueCurrency = value.replace(',', '.');
        if(current != 'UAH'){
            valueCurrency = changeCurrencyToUAH(value.replace(',', '.'), currency, current);
            console.log(valueCurrency);
        }
        if(isIncome){
            dispatch({type: 'ADD_INCOME', payload: parseFloat(valueCurrency) - parseFloat(transCash)})
        }
        else{
            dispatch({type: 'ADD_EXPENSES', payload: parseFloat(valueCurrency) - parseFloat(transCash)})
        }
        let object = {
            category_id: selectedCategory, 
            uid: user.uid, 
            date: `${selectedDate.format('YYYY-MM-DD')}`, 
            comment: comment, 
            cash: valueCurrency, 
            isIncome: isIncome
        };
        updateData(`${process.env.API_URL}/transaction/${selectedTransaction}`, object);
        let index = await transactions.findIndex(item => Number(item.id) == Number(selectedTransaction));
        if(index != -1){
            let catName = categories.filter(item => item.id == selectedCategory);
            dispatch({type:'UPDATE_DATA', payload: {newItem: {...transactions[index], 
                y: parseFloat(valueCurrency),
                comment: comment, 
                x: catName[0].name, 
                image_color: catName[0].image_color, 
                image_link: catName[0].image_link, 
                fill: catName[0].color, 
                date: `${selectedDate.format('YYYY-MM-DD')}`, 
                category_id: selectedCategory,
                isIncome: isIncome
            }, 
                index: index
            }});
        }
        setLoading(false);
        navigation.goBack();   
    }
    return(
            <TouchableWithoutFeedback 
            onPress={() => {
                Keyboard.dismiss();
                setShowDatePicker(false);
                setIsMove(false);
                }}>
            <View style={[general.app, isMove ? general.isMove : null]}>

                <Header text={'Add Transactions'} navigation={navigation}/>

                <View style={general.content}>
                    <MoneyInput object={object}/>
                    <CategoryList data={data} navigation={navigation}/>
                    <DateButtons object={object}/>
                    <CommentInput object={object}/>
                    <MyCalendar object={object}/>
                </View>
                <View style={{position: 'absolute', bottom: 25}}>
                    {loading ? <ActivityIndicator style={general.addAuthBtn} size="large" color="#fcbe53"/> :
                    <AddBtn action={isAdd ? handleAddTransaction : handleUpdateTransaction} object={object}/>}
                </View>
            </View>
            </TouchableWithoutFeedback>
    );
}