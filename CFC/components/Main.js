import React, { useRef, useState } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList, Image, Dimensions } from "react-native";
import styles from "../styles/MainPage"
import { VictoryPie} from "victory-native";
import getImageComponent from "../resources/imageComponent";
import BagDollar from "../resources/bagDollar";
const { width, height } = Dimensions.get('window');

export default function Main(){
    const [transactionMoney, setTransactionMoney] = useState(345);
    const [totalMoney, setTotalMoney] = useState(1457);
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
    return(
        <View style={styles.app}>
            <View style={styles.header}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <BagDollar/>
                    <Text style={[styles.periodText, {fontSize: 20}]}>Total:</Text>
                    <Text style={styles.totalMoney}>${totalMoney}</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", width: "90%", justifyContent: 'space-around'}}>
                    <TouchableWithoutFeedback>
                        <Text style={[styles.periodText, {fontSize: 21}]}>Expences</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Text style={[styles.periodText, {fontSize: 21}]}>Income</Text>
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
                        <Image source={require(`../resources/plus-svgrepo-com.png`)} style={{width: 30, height: 30}} />
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
                    <FlatList keyExtractor={item => item.id} 
                        data={graphicData} 
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