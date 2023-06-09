import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Text} from "react-native";
import getImage from "../../resources/imageComponent";
import general from "../../styles/general";
import styles from "../../styles/TransactionPage";
import moment from "moment";
import { useSelector } from "react-redux";

function DateBtns(props){
    const transDate = useSelector(state => state.transData.date);
    const [lastDate, setLastDate] = useState(transDate ? moment(transDate) : moment(new Date()).add(2, 'days'));
    const dateToday = moment(new Date());

    useEffect(() => {
        changeLastDate();
    }, [props.object.selectedDate]);

    const handleSelectDate = (id, date) =>{
        props.object.setSelectedBtn(id);
        props.object.setSelectedDate(date);
    };
    const changeLastDate = () =>{
        if(props.object.selectedDate.format('MM/DD') == dateToday.format('MM/DD')){
            props.object.setSelectedBtn(1);
            props.object.selectedDate.clone().add(2, 'days').format('MM/DD');
        }
        else if(props.object.selectedDate.format('MM/DD') == dateToday.clone().add(1, 'days').format('MM/DD')){
            props.object.setSelectedBtn(2);
            props.object.selectedDate.clone().add(2, 'days').format('MM/DD');
        }
        else{
            setLastDate(props.object.selectedDate);
        }
    };
    return (
        <View style={styles.dateRow}>
                    <TouchableWithoutFeedback onPress={() => handleSelectDate(1, dateToday)}>
                            <View style={[styles.dateBtn, props.object.selectedBtn == 1 ? {backgroundColor: '#FDCD8120'} : null]}>
                                <Text style={[general.generalText, {fontSize: 15}]}>{`${dateToday.clone().format('MM/DD')}`}</Text>
                                <Text style={[general.generalText, {fontSize: 15}]}>today</Text>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleSelectDate(2, dateToday.clone().add(1, 'days'))}>
                            <View style={[styles.dateBtn, props.object.selectedBtn == 2 ? {backgroundColor: '#FDCD8120'} : null]}>
                                <Text style={[general.generalText, {fontSize: 15}]}>{`${dateToday.clone().add(1, 'days').format('MM/DD')}`}</Text>
                                <Text style={[general.generalText, {fontSize: 15}]}>tomorrow</Text>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleSelectDate(3, lastDate)}>
                            <View style={[styles.dateBtn, props.object.selectedBtn == 3 ? {backgroundColor: '#FDCD8120'} : null]}>
                                <Text style={[general.generalText, {fontSize: 15}]}>{`${lastDate.format('MM/DD')}`}</Text>
                                <Text style={[general.generalText, {fontSize: 15}]}>last</Text>
                            </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback  onPress={() => props.object.setShowDatePicker(!props.object.showDatePicker)}>
                        <View style={styles.calendar}>
                            {getImage(process.env.API_CALENDAR_URL, 35, 35, '#FFFFFF')}
                        </View>
                    </TouchableWithoutFeedback>
                </View>     
    );
}

export default DateBtns;