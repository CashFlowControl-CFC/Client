import React, { useEffect, useState } from "react";
import { View,  TouchableWithoutFeedback, Text, FlatList} from "react-native";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";
import moment from 'moment';
import general from "../../styles/general";
import { useSelector } from "react-redux";

function TargetList(props){
    const targets = useSelector(state => state.target.targets);
    const [updatedData, setUpdatedData] = useState([]);
    useEffect(() => {
        countPercent();
    }, [targets])
    const countPercent = () => {
        setUpdatedData(targets.reduce((acc, cur) => {
            let percent = (cur.cash * 100) / cur.total_cash;
            acc.push({...cur, percent: Math.round(percent)});
            return acc;
        }, []));
    }
    const onClick = () => {
        props.navigation.navigate('TargetForm', {isTarget: true});
    }
    const handleSelectTarget = (id) => {
        const index = targets.findIndex(item => item.id === id);
        if(index != -1){
            props.navigation.navigate('TargetInfo', {target: targets[index]});
        }
    }
    return (
        <View style={{width: "95%", flex: 1}}>
        <FlatList keyExtractor={item => item.id} 
            data={updatedData} 
            renderItem={({item}) =>
            <View style={{gap: 10, marginTop: '5%'}}>
                <Text style={[general.deadlineText]}>Deadline: {moment(item.deadline).format('DD.MM.YYYY')}</Text>
                            <TouchableWithoutFeedback onPress={() => handleSelectTarget(item.id)}>
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