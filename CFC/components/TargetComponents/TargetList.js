import React, { useEffect, useState } from "react";
import { View,  TouchableWithoutFeedback, Text, FlatList} from "react-native";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";
import moment from 'moment';
import general from "../../styles/general";
import { useDispatch, useSelector } from "react-redux";
import ModalRemove from "../General/ModalRemove";
import ModalMessage from "../General/ModalMessage";
import { removeData } from "../../modules/requests";

function TargetList(props){
    const dispatch = useDispatch();
    const targets = useSelector(state => state.target.targets);
    const [updatedData, setUpdatedData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [modalRemoveVisible, setModalRemoveVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isCompleted, setIsCompleted] = useState(null);
    const [text, setText] = useState('');

    const object = {
        modalVisible,
        setModalVisible,
        isCompleted,
        text
    }

    useEffect(() => {
        countPercent();
        checkDeadline();
        checkIsCompleted();
    }, [targets]);

    const checkIsCompleted = () => {
        let index = targets.findIndex(item => item.cash >= item.total_cash);

        if(index != -1){
            setIsCompleted(true);
            setText("Wow! YOU ARE GREAT! You completed your goal in time!");
            setModalVisible(true);
            let newData = targets.filter(item => item.id != targets[index].id);
            dispatch({type: 'SET_TARGETS', payload: newData});
        }
    }

    const checkDeadline = () => {
        let index = targets.findIndex(item => moment(item.deadline).format('YYYY-MM-DD') < moment(new Date()).format('YYYY-MM-DD') &&
        item.cash < item.total_cash);

        if(index != -1){
            setIsCompleted(false);
            setText("Oh, unfortunately you didn't complete your goal in time( \nBut don't worry, you'll get it next time");
            setModalVisible(true);
            let newData = targets.filter(item => item.id != targets[index].id);
            dispatch({type: 'SET_TARGETS', payload: newData});
        }
    }
    const countPercent = () => {
        setUpdatedData(targets.reduce((acc, cur) => {
            let percent = (cur.cash * 100) / cur.total_cash;
            acc.push({...cur, percent: Math.round(percent)});
            return acc;
        }, []).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()));
    }
    const onClick = () => { 
        dispatch({type: 'SET_SELECTED', payload: null});
        props.navigation.navigate('TargetForm', {isTarget: true});
    }
    const handleSelectTarget = (id) => {
        const index = updatedData.findIndex(item => item.id === id);
        if(index != -1){
            props.navigation.navigate('TargetInfo', {target: updatedData[index]});
        }
    }
    const handleRemove = async () =>{
        let result = await removeData(`${process.env.API_URL}/goal/${selected}`);
        if(result.status == 200){
            let newData = targets.filter(item => item.id != selected);
            dispatch({type: 'SET_TARGETS', payload: newData});
        }
        setModalRemoveVisible(false);
    }
    return (
        <View style={{width: "95%", flex: 1}}>
        <ModalRemove modalVisible={modalRemoveVisible} close={() => setModalRemoveVisible(false)} action={handleRemove}/>
        <ModalMessage object={object}/>
        <FlatList keyExtractor={item => item.id} 
            data={updatedData} 
            renderItem={({item}) =>
            <View style={{gap: 10, marginTop: '5%'}}>
                <Text style={[general.deadlineText]}>Deadline: {moment(item.deadline).format('DD.MM.YYYY')}</Text>
                            <TouchableWithoutFeedback onPress={() => handleSelectTarget(item.id)} onLongPress={() => {
                                setModalRemoveVisible(true);
                                setSelected(item.id);
                                }}>
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