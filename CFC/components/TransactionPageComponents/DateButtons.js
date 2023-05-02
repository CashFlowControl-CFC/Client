import React, { useContext, useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Text} from "react-native";
import getImage from "../../resources/imageComponent";
import general from "../../styles/general";
import styles from "../../styles/TransactionPage";
import { TransactionContext } from "../../modules/context";
import { API_CALENDAR_URL } from '@env';
import moment from "moment";

function DateButtons(){
    const {showDatePicker, selectedDate, setSelectedDate, setShowDatePicker, selectedBtn, setSelectedBtn} = useContext(TransactionContext);
    const [lastDate, setLastDate] = useState(moment(new Date()).add(-2, 'days'));
    const [dateToday, setDateToday] = useState(moment(new Date()));

    useEffect(() => {
        changeLastDate();
    }, [selectedDate]);

    const handleSelectDate = (id, date) =>{
        setSelectedBtn(id);
        setSelectedDate(date);
    };
    const changeLastDate = () =>{
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
    };
    return (
        <View style={styles.dateRow}>
                    <TouchableWithoutFeedback onPress={() => handleSelectDate(1, dateToday)}>
                            <View style={[styles.dateBtn, selectedBtn == 1 ? {backgroundColor: '#FDCD8120'} : null]}>
                                <Text style={[general.generalText, {fontSize: 15}]}>{`${dateToday.clone().format('MM/DD')}`}</Text>
                                <Text style={[general.generalText, {fontSize: 15}]}>today</Text>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleSelectDate(2, dateToday.clone().add(-1, 'days'))}>
                            <View style={[styles.dateBtn, selectedBtn == 2 ? {backgroundColor: '#FDCD8120'} : null]}>
                                <Text style={[general.generalText, {fontSize: 15}]}>{`${dateToday.clone().add(-1, 'days').format('MM/DD')}`}</Text>
                                <Text style={[general.generalText, {fontSize: 15}]}>yesterday</Text>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleSelectDate(3, lastDate)}>
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
    );
}

export default DateButtons;