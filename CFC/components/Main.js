import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, Image, Dimensions, Modal, TextInput, Keyboard  } from "react-native";
import styles from "../styles/MainPage"
import { VictoryPie} from "victory-native";
import getImageComponent from "../resources/imageComponent";
import BagDollar from "../resources/bagDollar";
const { width, height } = Dimensions.get('window');

export default function Main(){
    const [transactionMoney, setTransactionMoney] = useState(0);
    const [totalMoney, setTotalMoney] = useState(0);
    const [value, setValue] = useState('');
    const [isIncome, setIsIncome] = useState(false);
    const inputRef = useRef(null);
    const [graphicData, setGraphicData] = useState([
    { x: "food", y: 10, fill: "#64EBC2", id: 1, image: "food.js" },
    { x: "family", y: 90, fill: "#FE8664", id: 2, image: "family.js" },
    { x: "health", y: 30, fill: "#8CFF98", id: 3, image: "health.js" },
    { x: "health", y: 30, fill: "#8CFF98", id: 4, image: "health.js" },
    { x: "health", y: 30, fill: "#8CFF98", id: 5, image: "health.js" },
    { x: "health", y: 30, fill: "#8CFF98", id: 6, image: "health.js" },
    { x: "health", y: 30, fill: "#8CFF98", id: 7, image: "health.js" },
    { x: "health", y: 30, fill: "#8CFF98", id: 8, image: "health.js" },
    { x: "health", y: 30, fill: "#8CFF98", id: 9, image: "health.js" },])
    const [combinedData, setCombinedData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() =>{
        combine();
    }, [])
    useEffect(() =>{
        sum();
    }, [combinedData]);
    useEffect(() => {
        if (modalVisible) {
          inputRef.current?.focus();
        }
      }, [modalVisible]);
    const combine = () =>{
        const newData =graphicData.reduce((acc, cur) => {
            const index = acc.findIndex(item => item.x === cur.x);
            if (index === -1) {
              acc.push({ x: cur.x, y: cur.y, fill: cur.fill, id: cur.id, image: cur.image });
            } else {
              acc[index].y += cur.y;
            }
            return acc;
          }, []);
          setCombinedData(newData);
    }
   const sum = () =>{
    const total = combinedData.reduce((acc, cur) => acc + cur.y, 0);
    setTransactionMoney(total);
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
                    <TouchableWithoutFeedback>
                        <Text style={styles.periodText}>Day</Text>
                    </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback>
                        <Text style={styles.periodText}>Week</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Text style={styles.periodText}>Month</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Text style={styles.periodText}>Year</Text>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{marginTop: "7%"}}>
                    <Text style={styles.periodText}>March 26 - Apr 1</Text>
                </View>

                <View style={{alignItems: "center", justifyContent: 'center'}}>
                    <VictoryPie
                        data={combinedData}
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