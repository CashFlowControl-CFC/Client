import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableWithoutFeedback, Text, Keyboard } from "react-native";
import moment from "moment";
import general from "../../styles/general";
import { API_PLUS_URL, API_URL} from '@env';
import { addData } from "../../modules/requests";
import { TransactionContext } from "../../modules/context";
import AddBtn from "../General/AddBtn";
import CategoryList from "../General/CategoryList";
import TransactionType from "../General/TransactionType";
import MyCalendar from "../TransactionPageComponents/Calendar";
import MoneyInput from "../TransactionPageComponents/MoneyInput";
import DateButtons from "../TransactionPageComponents/DateButtons";
import CommentInput from "../TransactionPageComponents/CommentInput";

export default function Transaction({navigation}){
    const dispatch = useDispatch();
    const isIncome = useSelector(state => state.transaction.isIncome);
    const categories = useSelector(state => state.category.categories);

    const [value, setValue] = useState('');
    const [comment, setComment] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment(new Date()));

    const [data, setData] = useState([]);
    const [isMove, setIsMove] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const contextValue = {
        value,
        data,
        selectedCategory,
        showDatePicker,
        selectedBtn, 
        comment, 
        selectedDate,
        setIsMove, 
        setComment,
        setSelectedBtn,
        setValue,
        setSelectedCategory,
        setSelectedDate,
        setShowDatePicker
    };

    useEffect(() => {
        filterCategories();
    }, [isIncome])


    const filterCategories = () =>{
        setData([...categories?.filter(item => item.isIncome == isIncome || item.isIncome == null).slice(0, 5), 
        { id: 'add', color: '#FECC7A',  image_link: API_PLUS_URL}]);
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
        dispatch({type: 'ADD_TRANSACTION', payload: result})
        navigation.navigate('Main')    
    }

    return(
        <TransactionContext.Provider value={contextValue}>
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
                    <TransactionType/>
                </View>

                <View style={general.content}>
                    <MoneyInput/>
                    <CategoryList data={data}/>
                    <DateButtons/>
                    <CommentInput/>
                    <AddBtn action={handleAddTransaction}/>
                    <MyCalendar/>
                </View>

            </View>
            </TouchableWithoutFeedback>
        </TransactionContext.Provider>
    );
}