import React from "react";
import { View } from "react-native";
import styles from "../../styles/TransactionPage";
import moment from "moment";
import {Calendar} from 'react-native-calendars';

function CustomCalendar(props){
    const handleSelectDate = (id, date) =>{
        props.object.setSelectedBtn(id);
        props.object.setSelectedDate(date);
    }
    return (
        <View style={styles.calendarPos}>
                {props.object.showDatePicker ? <Calendar 
                        style={{
                            borderRadius: 15,
                            height: 450,
                            width: 300
                        }}
                        minDate={moment().format('YYYY-MM-DD')}
                        onDayPress={day => {
                            props.object.setShowDatePicker(false);
                            handleSelectDate(3, moment(day.dateString))
                        }}
                        markedDates={{
                            [props.object.selectedDate]: {selectedDate: true, disableTouchEvent: true, selectedDotColor: 'orange'}
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

export default CustomCalendar;