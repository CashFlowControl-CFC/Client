import React, { useRef, useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, Image } from "react-native";
import styles from "../styles/MainPage"
import { VictoryPie} from "victory-native";
import SvgComponent from "../resources/plus-svgrepo-com";

export default function Main(){
    const [transactionMoney, setTransactionMoney] = useState(345);
    const [graphicData, setGraphicData] = useState([
    { x: "food", y: 10, fill: "#64EBC2", id: 1 },
    { x: "family", y: 90, fill: "#FE8664", id: 2 },
    { x: "health", y: 30, fill: "#2582FB", id: 3 },])
    return(
        <View style={styles.app}>
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
                        data={graphicData}
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
                        <SvgComponent width={30} height={30}/>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={{
                    position: 'absolute',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 24,
                    }}> ${transactionMoney} </Text>
                </View>

                <View style={{width: "95%"}}>
                    <FlatList keyExtractor={item => item.id} data={graphicData} renderItem={({item}) =>
                            <View>
                               <TouchableWithoutFeedback>
                                            <View style={[styles.category, {backgroundColor: item.fill + "30"}]}>
                                                <View style={[styles.circle, {backgroundColor: item.fill}]}>
                                                </View>
                                                <Text style={styles.categoryText}>{item.x}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>      
                            </View>
                            }/>          
                </View>
            </View>
        </View>
    );
}