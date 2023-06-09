import React, { useContext, useEffect, useState } from "react";
import { View,  TouchableWithoutFeedback, Text} from "react-native";
import styles from "../../styles/MainPage";
import general from "../../styles/general";
import { MainContext, TargetContext } from "../../modules/context";
import { useSelector } from "react-redux";
import moment from "moment";

function PeriodButtons(){
    const {selectedPeriod, filterDate, setSelectedPeriod, setStep, setFilteredData} = useContext(MainContext);
    const isIncome = useSelector(state => state.transaction.isIncome);
    const data = useSelector(state => state.transaction.data);

    useEffect(() => {
      filter();
    }, [filterDate, isIncome, data]);

    const handleChangePeriod = (period) => {
        setSelectedPeriod(period); 
        setStep(0);
    }
    const filter = async () =>{
        if(selectedPeriod == "Day"){
            setFilteredData(data?.filter((item) => item.isIncome == isIncome && item.date.toString() == filterDate.toString()));
        }
        else if(selectedPeriod == "Week"){
            const startOfWeek = filterDate.startOf('week').format('YYYY-MM-DD');
            const endOfWeek = filterDate.endOf('week').format('YYYY-MM-DD');
            setFilteredData(data?.filter(item => item.isIncome == isIncome && moment(item.date).isBetween(startOfWeek, endOfWeek, null, '[]')));
        }
        else if(selectedPeriod == "Month"){
            const startOfMonth = filterDate.startOf('month').format('YYYY-MM-DD');
            const endOfMonth = filterDate.endOf('month').format('YYYY-MM-DD');
            setFilteredData(data?.filter(item => item.isIncome == isIncome && moment(item.date).isBetween(startOfMonth, endOfMonth, null, '[]')));
        }
        else if(selectedPeriod == "Year"){
            setFilteredData(data?.filter(item => item.isIncome === isIncome && moment(item.date).year() === moment(filterDate).year()));
        }
    }
    return (
        <View style={styles.periodBtns}>
                    <TouchableWithoutFeedback onPress={() => handleChangePeriod('Day')}>
                        <Text style={[general.generalText, selectedPeriod === 'Day' && general.selected]}>Day</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleChangePeriod('Week')}>
                        <Text style={[general.generalText, selectedPeriod === 'Week' && general.selected]}>Week</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleChangePeriod('Month')}>
                        <Text style={[general.generalText, selectedPeriod === 'Month' && general.selected]}>Month</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleChangePeriod('Year')}>
                        <Text style={[general.generalText, selectedPeriod === 'Year' && general.selected]}>Year</Text>
                    </TouchableWithoutFeedback>
                </View>
    );
}

export default PeriodButtons;