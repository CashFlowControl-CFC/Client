import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, Modal, TextInput, Keyboard  } from "react-native";
import styles from "../styles/MainPage"
import general from "../styles/general";
import { VictoryPie} from "victory-native";
import getImageComponent from "../resources/imageComponent";
import BagDollar from "../resources/bagDollar";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../modules/requests";
import {API_URL} from '@env'

export default function Main({navigation}){
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const isIncome = useSelector(state => state.isIncome);
    const [transactionMoney, setTransactionMoney] = useState(0);
    const totalMoney = useSelector(state => state.totalMoney);
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
        getData();
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
    const getData = async () =>{
        dispatch({type: 'SET_DATA', payload: await getTransactions(`${API_URL}/load/1`)});
    }
    const filter = async () =>{
        if(selectedPeriod == "Day"){
            setFilteredData(data.filter((item) => item.isIncome == isIncome && item.date.toString() == filterDate.toString()));
        }
        else if(selectedPeriod == "Week"){
            const startOfWeek = filterDate.startOf('week').format('YYYY-MM-DD');
            const endOfWeek = filterDate.endOf('week').format('YYYY-MM-DD');
            setFilteredData(data.filter(item => item.isIncome == isIncome && moment(item.date).isBetween(startOfWeek, endOfWeek, null, '[]')));
        }
        else if(selectedPeriod == "Month"){
            const startOfMonth = filterDate.startOf('month').format('YYYY-MM-DD');
            const endOfMonth = filterDate.endOf('month').format('YYYY-MM-DD');
            setFilteredData(data.filter(item => item.isIncome == isIncome && moment(item.date).isBetween(startOfMonth, endOfMonth, null, '[]')));
        }
        else if(selectedPeriod == "Year"){
            setFilteredData(data.filter(item => item.isIncome === isIncome && moment(item.date).year() === moment(filterDate).year()));
        }
    }
    const sum = () =>{
         const total = filteredData.reduce((acc, cur) => Number(acc) + Number(cur.y), 0);
         setTransactionMoney(total);
    }
    const combine = () =>{
        const newData = filteredData.reduce((acc, cur) => {
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
                        <BagDollar/>
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
                        <Text style={[general.generalText, {fontSize: 23}]}>{'<'}</Text>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={general.generalText}>{`${date.toString()}`}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => setStep(step + 1)}>
                    <Text style={[general.generalText, {fontSize: 23}]}>{'>'}</Text>
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
                         {getImageComponent("plus", 30, 30)}
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
                                                    {getImageComponent(item.image, 25, 25)}
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