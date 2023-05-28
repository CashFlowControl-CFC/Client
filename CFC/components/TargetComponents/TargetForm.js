import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableWithoutFeedback, Text, Keyboard } from "react-native";
import moment from "moment";
import general from "../../styles/general";
import { addData } from "../../modules/requests";
import AddBtn from "../General/AddBtn";
import CategoryList from "../General/CategoryList";
import MyCalendar from "../TransactionPageComponents/Calendar";
import MoneyInput from "../TransactionPageComponents/MoneyInput";
import DateButtons from "../TransactionPageComponents/DateButtons";
import CommonHeader from '../General/CommonHeader';


export default function TargetForm({navigation}){
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);
    const selectedCategory = useSelector(state => state.category.selectedCategory);
    const transComment = useSelector(state => state.transData.comment);
    const transCash = useSelector(state => state.transData.cash);
    const transDate = useSelector(state => state.transData.date);

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
    }, [categories]);

    const filterCategories = () =>{
        setData([...categories?.sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
            .slice(0, 5), 
        { id: 'add', color: '#FECC7A', image_link: process.env.API_PLUS_URL}]);
    }
    
    const handleAddTarget = async () => {
        navigation.navigate('Target')    
    }

    return(
            <TouchableWithoutFeedback 
            onPress={() => {
                Keyboard.dismiss();
                setShowDatePicker(false);
                setIsMove(false);
                }}>
            <View style={[general.app, isMove ? general.isMove : null]}>

                <CommonHeader title={'Add Target'} navigation={navigation}/>

                <View style={general.content}>
                    <MoneyInput object={object}/>
                    <CategoryList data={data} navigation={navigation}/>
                    <DateButtons object={object}/>
                    <MyCalendar object={object}/>
                </View>
                <View style={{position: 'absolute', bottom: 30}}>
                    <AddBtn action={handleAddTarget} object={object}/>
                </View>
            </View>
            </TouchableWithoutFeedback>
    );
}