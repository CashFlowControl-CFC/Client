import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, Image, Modal, TextInput, Keyboard  } from "react-native";
import styles from "../styles/MainPage"
import { VictoryPie} from "victory-native";
import getImageComponent from "../resources/imageComponent";
import BagDollar from "../resources/bagDollar";
import moment from 'moment';

export default function Main(){
    const [transactionMoney, setTransactionMoney] = useState(0);
    const [totalMoney, setTotalMoney] = useState(0);
    const [value, setValue] = useState('');
    const [isIncome, setIsIncome] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('Day');
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-D"));
    const [filterDate, setFilterDate] = useState(moment(new Date()).format("YYYY-MM-D"));
    const inputRef = useRef(null);
    const [step, setStep] = useState(0);
    const [graphicData, setGraphicData] = useState([
    { x: "food", y: 10, fill: "#64EBC2", id: 1, image: "food.js", isIncome: false, date: '2023-04-10' },
    { x: "family", y: 90, fill: "#FE8664", id: 2, image: "family.js", isIncome: false, date: '2023-04-09' },
    { x: "health", y: 30, fill: "#8CFF98", id: 3, image: "health.js", isIncome: false, date: '2023-04-10' },
    { x: "health", y: 30, fill: "#8CFF98", id: 4, image: "health.js", isIncome: true, date: '2023-04-08' },
    { x: "health", y: 30, fill: "#8CFF98", id: 5, image: "health.js", isIncome: false, date: '2023-03-30' },
    { x: "health", y: 30, fill: "#8CFF98", id: 6, image: "health.js", isIncome: true, date: '2023-04-10' },
    { x: "health", y: 30, fill: "#8CFF98", id: 7, image: "health.js", isIncome: true, date: '2023-04-07' },
    { x: "health", y: 30, fill: "#8CFF98", id: 8, image: "health.js", isIncome: false, date: '2023-04-06' },
    { x: "health", y: 30, fill: "#8CFF98", id: 9, image: "health.js", isIncome: false, date: '2023-04-07' },])
    const [combinedData, setCombinedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    
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
      }, [filterDate, isIncome]);
    useEffect(() =>{
        sum();
        combine();
    }, [filteredData]);
    const filter = () =>{
        if(selectedPeriod == "Day"){
            console.log(filterDate.toString());
            setFilteredData(graphicData.filter((item) => item.isIncome == isIncome && item.date.toString() == filterDate.toString()));
        }
        else if(selectedPeriod == "Week"){
            const startOfWeek = filterDate.startOf('week').format('YYYY-MM-DD');
            const endOfWeek = filterDate.endOf('week').format('YYYY-MM-DD');
            setFilteredData(graphicData.filter(item => item.isIncome == isIncome && moment(item.date).isBetween(startOfWeek, endOfWeek, null, '[]')));
        }
        else if(selectedPeriod == "Month"){
            const startOfMonth = filterDate.startOf('month').format('YYYY-MM-DD');
            const endOfMonth = filterDate.endOf('month').format('YYYY-MM-DD');
            setFilteredData(graphicData.filter(item => item.isIncome == isIncome && moment(item.date).isBetween(startOfMonth, endOfMonth, null, '[]')));
        }
        else if(selectedPeriod == "Year"){
            setFilteredData(graphicData.filter(item => item.isIncome === isIncome && moment(item.date).year() === moment(filterDate).year()));
        }
    }
    const sum = () =>{
         const total = filteredData.reduce((acc, cur) => acc + cur.y, 0);
         setTransactionMoney(total);
    }
    const combine = () =>{
        const newData = filteredData.reduce((acc, cur) => {
            const index = acc.findIndex(item => item.x === cur.x);
            if (index === -1) {
              acc.push({ x: cur.x, y: cur.y, fill: cur.fill, id: cur.id, image: cur.image, isIncome: cur.isIncome });
            } else {
              acc[index].y += cur.y;
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
        <View style={styles.app}>
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
                            style={styles.inputMoney}
                            value={value} 
                            onChangeText={(value) => setValue(value)}/>
                            <TouchableWithoutFeedback
                            style={{ padding: 10, backgroundColor: 'red', alignSelf: 'flex-end' }}
                            onPress={() => {
                                setModalVisible(false);
                                setTotalMoney(value ? Number(value) : 0);
                                }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Save</Text>
                            </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
            <View style={styles.header}>
                <TouchableWithoutFeedback onPressIn={() => setModalVisible(true)}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <BagDollar/>
                        <Text style={[styles.periodText, {fontSize: 20}]}>Total:</Text>
                        <Text style={styles.totalMoney}>${totalMoney}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <View style={{flexDirection: "row", alignItems: "center", width: "90%", justifyContent: 'space-around'}}>
                    <TouchableWithoutFeedback onPress={() => setIsIncome(false)}>
                        <Text style={[styles.periodText, {fontSize: 19}, !isIncome ? styles.selected : '']}>EXPENSES</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setIsIncome(true)}>
                        <Text style={[styles.periodText, {fontSize: 19}, isIncome ? styles.selected : '']}>INCOME</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>


            <View style={styles.content} >

                <View style={styles.periodBtns}>
                    <TouchableWithoutFeedback onPress={() => {
                        setSelectedPeriod('Day'); 
                        setStep(0)
                        }}>
                        <Text style={[styles.periodText, selectedPeriod === 'Day' && styles.selected]}>Day</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        setSelectedPeriod('Week'); 
                        setStep(0)
                        }}>
                        <Text style={[styles.periodText, selectedPeriod === 'Week' && styles.selected]}>Week</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        setSelectedPeriod('Month'); 
                        setStep(0)
                        }}>
                        <Text style={[styles.periodText, selectedPeriod === 'Month' && styles.selected]}>Month</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        setSelectedPeriod('Year'); 
                        setStep(0)
                        }}>
                        <Text style={[styles.periodText, selectedPeriod === 'Year' && styles.selected]}>Year</Text>
                    </TouchableWithoutFeedback>
                </View>

                 <View  style={styles.date}>
                    <TouchableWithoutFeedback onPress={() => setStep(step - 1)}>
                        <Text style={[styles.periodText, {fontSize: 23}]}>{'<'}</Text>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={styles.periodText}>{`${date.toString()}`}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => setStep(step + 1)}>
                    <Text style={[styles.periodText, {fontSize: 23}]}>{'>'}</Text>
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
                <TouchableWithoutFeedback>
                    <View style={styles.addBtn}>
                        <Image source={require(`../resources/plus-svgrepo-com.png`)} style={{width: 25, height: 25}} />
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
                                                    {getImageComponent(item.image)}
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