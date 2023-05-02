import React, { useContext } from "react";
import { View } from "react-native";
import { TransactionContext } from "../../modules/context";
import styles from "../../styles/TransactionPage";
import moment from "moment";
import {Calendar} from 'react-native-calendars';

function MyCalendar(){
    const {selectedDate, showDatePicker, setShowDatePicker, setSelectedBtn, setSelectedDate} = useContext(TransactionContext);
    const handleSelectDate = (id, date) =>{
        setSelectedBtn(id);
        setSelectedDate(date);
    }
    return (
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
                            handleSelectDate(3, moment(day.dateString))
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
    );
}

export default MyCalendar;