import React, { useContext, useEffect, useState } from "react";
import { View,  TouchableWithoutFeedback, Text} from "react-native";
import styles from "../../styles/MainPage";
import general from "../../styles/general";
import { MainContext } from "../../modules/context";
import getImage from "../../resources/imageComponent";
import {API_LEFT_ARROW_URL, API_RIGHT_ARROW_URL} from '@env';
import moment from "moment";

function Period(){
    const {selectedPeriod, step, setStep, setFilterDate} = useContext(MainContext);
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-D"));

    useEffect(() => {
        changePeriod();
      }, [selectedPeriod, step]);
    
      const changePeriod = () =>{
        let newDate = moment(new Date());
        if (selectedPeriod == "Day"){
            newDate.add(step, "days");
            setFilterDate(newDate.format('YYYY-MM-DD'));
            setDate(`${newDate.format('MMM D')}`);
        }
        else if(selectedPeriod == "Week"){
            newDate.add(step, "weeks");
            setFilterDate(newDate);
            setDate(`${newDate.startOf('week').format('MMM D')} - ${newDate.endOf('week').format('MMM D')}`);
        }
        else if(selectedPeriod == "Month"){
            newDate.add(step, "months");
            setFilterDate(newDate);
            setDate(`${newDate.startOf('month').format('MMM D')} - ${newDate.endOf('month').format('MMM D')}`);
        }
        else if(selectedPeriod == "Year"){
            newDate.add(step, "years");
            setFilterDate(newDate);
            setDate(`${newDate.format('YYYY')}`);
        }
    }
    return (
            <View  style={styles.date}>
            <TouchableWithoutFeedback onPress={() => setStep(step - 1)}>
                <View>
                    {getImage(API_LEFT_ARROW_URL, 20, 20, '#FFFFFF')}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={general.generalText}>{`${date.toString()}`}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => setStep(step + 1)}>
                <View>
                    {getImage(API_RIGHT_ARROW_URL, 20, 20, '#FFFFFF')}
                </View>
            </TouchableWithoutFeedback>
        </View>      
    );
}

export default Period;