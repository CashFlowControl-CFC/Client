import React, { useEffect, useState } from "react";
import { View,  TouchableWithoutFeedback, Text, FlatList} from "react-native";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";
import moment from 'moment';
import general from "../../styles/general";
import { useDispatch, useSelector } from "react-redux";
import ModalRemove from "../General/ModalRemove";
import ModalMessage from "../General/ModalMessage";

function PaymentList(props){
    const dispatch = useDispatch();
    const [modalRemoveVisible, setModalRemoveVisible] = useState(false);
    const [selected, setSelected] = useState(false);
    const [filteredData, setFilteredData] = useState(false);
    const payments = useSelector(state => state.payment.payments);

    useEffect(() => {
        setFilteredData(payments.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()));
    }, [payments]);

    const handleRemove = async () =>{
         let newData = payments.filter(item => item.id != selected);
         dispatch({type: 'SET_PAYMENTS', payload: newData});
         setModalRemoveVisible(false);
    }
    const onClick = () => {
        dispatch({type: 'SET_SELECTED', payload: null});
        props.navigation.navigate('TargetForm', {isTarget: false});
    }
    return (
        <View style={{width: "95%", flex: 1}}>
        <ModalRemove modalVisible={modalRemoveVisible} close={() => setModalRemoveVisible(false)} action={handleRemove}/>
        
        <FlatList keyExtractor={item => item.id} 
            data={filteredData} 
            renderItem={({item}) =>
            <View style={{gap: 10, marginTop: '5%'}}>
                            <TouchableWithoutFeedback onPress={() => handleSelectTarget(item.id)} onLongPress={() => {
                                setModalRemoveVisible(true);
                                setSelected(item.id);
                                }}>
                                 <View style={[styles.category, {backgroundColor: item.color + "20"}]}>
                                    <View style={[styles.circle, {backgroundColor: item.color}]}>
                                        {getImage(item.image_link, 25, 25, item.image_color)}
                                    </View>
                                    <View style={{width:"70%", flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.categoryText}>{item.name}</Text>
                                            <Text style={[styles.categoryText, {color: '#D8D8D890'}]}>{moment(item.deadline).format('DD.MM.YYYY')}</Text>
                                            <Text style={[styles.categoryText, {direction: 'ltr'}]}>{item.cash}$</Text>
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

export default PaymentList;