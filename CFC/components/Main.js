import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import styles from "../styles/MainPage"
import { VictoryPie } from "victory-native";

export default function Main(){
    const [graphicData, setGriphicData] = useState([
    { y: 10, fill: "#64EBC2" },
    { y: 90, fill: "#FE8664" },
    { y: 30, fill: "#2582FB" },])
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

                <View style={{marginTop: "7%", alignItems: "center", justifyContent: 'center'}}>
                    <VictoryPie
                        data={graphicData}
                        width={200}
                        height={200}
                        innerRadius={70}
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
                        
                <Text style={{
                    position: 'absolute',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 24,
                    }}> $345 </Text>
                </View>
            </View>
        </View>
    );
}