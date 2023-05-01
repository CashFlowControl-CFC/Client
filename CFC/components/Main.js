import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, Modal, TextInput, Keyboard  } from "react-native";
import styles from "../styles/MainPage"
import general from "../styles/general";
import { VictoryPie} from "victory-native";
import getImageComponent from "../resources/imageComponent";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../modules/requests";
import {API_URL,
     API_BAG_URL, 
     API_PLUS_URL,
     API_LEFT_ARROW_URL,
     API_RIGHT_ARROW_URL
    } from '@env'
import getImage from "../resources/imageComponent";

export default function Main({navigation}){
    const dispatch = useDispatch();
    const data = useSelector(state => state.transaction.data);
    const isIncome = useSelector(state => state.transaction.isIncome);
    const totalMoney = useSelector(state => state.transaction.totalMoney);
    const [transactionMoney, setTransactionMoney] = useState(0);
    const [value, setValue] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('Day');
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-D"));
    const [filterDate, setFilterDate] = useState(moment(new Date()).format("YYYY-MM-D"));
    const inputRef = useRef(null);
    const [step, setStep] = useState(0);
    const [combinedData, setCombinedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        loadData();
      }, []);
    useEffect(() => {
        if (modalVisible) {
          inputRef.current?.focus();
        }
      }, [modalVisible]);
      useEffect(() => {
        changePeriod();
      }, [selectedPeriod, step]);
      useEffect(() => {
        filter();
      }, [filterDate, isIncome, data]);
    useEffect(() =>{
        sum();
        combine();
    }, [filteredData]);
    const loadData = async () =>{
        dispatch({type: 'SET_DATA', payload: await getData(`${API_URL}/load/1`)});
        dispatch({type: 'SET_CATEGORIES', payload: await getData(`${API_URL}/category`)});

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
    const sum = () =>{
         const total = filteredData?.reduce((acc, cur) => Number(acc) + Number(cur.y), 0);
         setTransactionMoney(total);
    }
    const combine = () =>{
        const newData = filteredData?.reduce((acc, cur) => {
            const index = acc.findIndex(item => item.x === cur.x);
            if (index === -1) {
              acc.push({ x: cur.x, y: Number(cur.y), fill: cur.fill, id: cur.id, image: cur.image, isIncome: cur.isIncome });
            } else {
              acc[index].y = Number(acc[index].y) + Number(cur.y);
            }
            return acc;
          }, []);
          setCombinedData(newData);
    }
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
    return(
        <View style={general.app}>
            <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.pModal} >
                        <View style={styles.sModal}>
                            <TextInput 
                            keyboardType="numeric" 
                            ref={inputRef}
                            style={general.inputMoney}
                            value={value} 
                            onChangeText={(text) => {
                                if (/^[0-9]*[.,]?[0-9]*$/.test(text)) {
                                  setValue(text);
                                }
                              }}
                            />
                            <TouchableWithoutFeedback
                            style={{ padding: 10, alignSelf: 'flex-end' }}
                            onPress={() => {
                                setModalVisible(false);
                                dispatch({type:'SET_TOTALMONEY', payload: value ? Number(value.replace(',', '.')) : 0});
                                }}>
                                <Text style={{ color: '#D8D8D8', fontSize: 20 }}>Save</Text>
                            </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
            <View style={general.header}>
                <TouchableWithoutFeedback onPressIn={() => setModalVisible(true)}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {getImage(API_BAG_URL, 20, 20, '#FFFFFF')}
                        <Text style={[general.generalText, {fontSize: 20}]}>Total:</Text>
                        <Text style={styles.totalMoney}>${totalMoney}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <View style={{flexDirection: "row", alignItems: "center", width: "90%", justifyContent: 'space-around'}}>
                    <TouchableWithoutFeedback onPress={() => dispatch({type:'EXPENSES'})}>
                        <Text style={[general.generalText, {fontSize: 19}, !isIncome ? general.selected : '']}>EXPENSES</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => dispatch({type:'INCOME'})}>
                        <Text style={[general.generalText, {fontSize: 19}, isIncome ? general.selected : '']}>INCOME</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>


            <View style={general.content} >

                <View style={styles.periodBtns}>
                    <TouchableWithoutFeedback onPress={() => {
                        setSelectedPeriod('Day'); 
                        setStep(0)
                        }}>
                        <Text style={[general.generalText, selectedPeriod === 'Day' && general.selected]}>Day</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        setSelectedPeriod('Week'); 
                        setStep(0)
                        }}>
                        <Text style={[general.generalText, selectedPeriod === 'Week' && general.selected]}>Week</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        setSelectedPeriod('Month'); 
                        setStep(0)
                        }}>
                        <Text style={[general.generalText, selectedPeriod === 'Month' && general.selected]}>Month</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        setSelectedPeriod('Year'); 
                        setStep(0)
                        }}>
                        <Text style={[general.generalText, selectedPeriod === 'Year' && general.selected]}>Year</Text>
                    </TouchableWithoutFeedback>
                </View>

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
                

                <View style={{alignItems: "center", justifyContent: 'center'}}>
                    <VictoryPie
                        data={combinedData.length > 0 ? combinedData : [{ y: 1, fill: "#1E1E1E70"}]}
                        width={250}
                        height={250}
                        innerRadius={70}
                        radius={100}
                        padding={{ top: 0, bottom: 0 }}
                        style={{
                        labels: {
                        fill: 'transparent',
                        }, 
                        data:{
                            fill: ({ datum }) => datum.fill,
                        }
                    }}
                    padAngle={3}
                        /> 
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Transaction')}>
                    <View style={general.addBtn}>
                         {getImage(API_PLUS_URL, 30, 30)}
                        </View>
                </TouchableWithoutFeedback>
                <Text style={{
                    position: 'absolute',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 25,
                    }}> ${transactionMoney} </Text>
                </View>

                <View style={{width: "95%", flex: 1}}>
                    <FlatList keyExtractor={item => item.id} 
                        data={combinedData} 
                        renderItem={({item}) =>
                            <View key={item.id}>
                               <TouchableWithoutFeedback>
                                            <View style={[styles.category, {backgroundColor: item.fill + "20"}]}>
                                                <View style={[styles.circle, {backgroundColor: item.fill}]}>
                                                    {getImage(item.image_link, 25, 25, item.image_color)}
                                                </View>
                                                <View style={{width:"70%", flexDirection: "row", justifyContent: "space-between"}}>
                                                    <Text style={styles.categoryText}>{item.x}</Text>
                                                    <Text style={[styles.categoryText, {direction: 'ltr'}]}>${item.y}</Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>      
                            </View>
                            }/>          
                </View>
            </View>
        </View>
    );
}