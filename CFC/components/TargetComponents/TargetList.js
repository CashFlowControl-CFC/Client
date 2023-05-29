import React, { useContext, useEffect, useState } from "react";
import { View,  TouchableWithoutFeedback, Text, FlatList} from "react-native";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";
import moment from 'moment';
import general from "../../styles/general";
import CreateBtn from "../General/CreateBtn";

function TargetList(props){
    const [data, setData] = useState([
        {
            id: '1',
            name: 'goal 1',
            cash: 100,
            total_cash: 200,
            color: '#9FC9FF',
            image_link: 'https://raw.githubusercontent.com/Witcher-MTM/Witcher-MTM.github.io/main/Home.svg',
            image_color: '#273546',
            deadline: '2023-12-12'
        },
        {
            id: '2',
            name: 'goal 2',
            cash: 443,
            total_cash: 1231,
            color: '#FF8CD8',
            image_link: 'https://raw.githubusercontent.com/Witcher-MTM/Witcher-MTM.github.io/main/Education.svg',
            image_color: '#48263C',
            deadline: '2023-05-16'
        }
    ]);
    const [updatedData, setUpdatedData] = useState([]);
    useEffect(() => {
        countPercent();
    }, [data])
    const countPercent = () => {
        setUpdatedData(data.reduce((acc, cur) => {
            let percent = (cur.cash * 100) / cur.total_cash;
            acc.push({...cur, percent: Math.round(percent)});
            return acc;
        }, []));
    }
    const onClick = () => {
        props.navigation.navigate('TargetForm', {isTarget: true});
    }
    return (
        <View style={{width: "95%", flex: 1}}>
        <FlatList keyExtractor={item => item.id} 
            data={updatedData} 
            renderItem={({item}) =>
            <View style={{gap: 10, marginTop: '5%'}}>
                <Text style={[general.deadlineText]}>Deadline: {moment(item.deadline).format('DD.MM.YYYY')}</Text>
                            <TouchableWithoutFeedback>
                                <View style={[styles.category, {backgroundColor: "#252525"}]}>
                                    <View style={[styles.category, {marginBottom: 0, 
                                        backgroundColor: item.percent >= 10 ? item.color + "20" : "#252525", 
                                        width: item.percent >= 20 ? `${item.percent}%` : '20%'}]}>
                                        <View style={[styles.circle, {backgroundColor: item.color, marginLeft: 10}]}>
                                            {getImage(item.image_link, 25, 25, item.image_color)}
                                        </View>
                                    </View>  
                                        <View style={{width:"70%", flexDirection: "row", justifyContent: "space-between", position: 'absolute', marginLeft: '20%'}}>
                                            <Text style={styles.categoryText}>{item.name}</Text>
                                            <Text style={[styles.categoryText, {color: '#D8D8D890'}]}>{item.percent}%({item.cash}$)</Text>
                                            <Text style={[styles.categoryText, {direction: 'ltr'}]}>{item.total_cash}$</Text>
                                        </View>
                                </View> 
                
                            </TouchableWithoutFeedback> 
            </View> 
                }/>  
                    <TouchableWithoutFeedback onPress={onClick}>
                        <View style={[general.addBtn, {position: 'absolute', bottom: 25, right: 20}]}>
                            {getImage(process.env.API_PLUS_URL, 30, 30)}
                        </View>
                    </TouchableWithoutFeedback>   
        </View>    
    );
}

export default TargetList;