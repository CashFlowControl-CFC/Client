import React, { useEffect, useState } from "react";
import { View,  TouchableWithoutFeedback, Text, FlatList} from "react-native";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";
import moment from 'moment';
import general from "../../styles/general";
import { useDispatch, useSelector } from "react-redux";
import ModalRemove from "../General/ModalRemove";
import { removeData } from "../../modules/requests";
import { changeCurrencyFromUAH } from "../../modules/generalFuncs";

function PaymentList(props){
    const dispatch = useDispatch();
    const [modalRemoveVisible, setModalRemoveVisible] = useState(false);
    const [selected, setSelected] = useState(false);
    const [filteredData, setFilteredData] = useState(false);
    const payments = useSelector(state => state.payment.payments);
    const currentSymb = useSelector(state => state.currency.currentSymb);
    const current = useSelector(state => state.currency.current);
    const currency = useSelector(state => state.currency.currency);

    useEffect(() => {
        setFilteredData(payments?.reduce((acc, cur) => {
            acc.push({...cur, 
                cash: current == 'UAH' ? Number(cur.cash).toFixed(2) : changeCurrencyFromUAH(Number(cur.cash), currency, current),
            });
            return acc;
        }, []).sort((a, b) => new Date(a.dateRemainde).getTime() - new Date(b.dateRemainde).getTime()));
     }, [payments]);

    const handleRemove = async () =>{
         let result = await removeData(`${process.env.API_URL}/remainder/${selected}`);
         if(result.status == 200){
            let newData = payments.filter(item => item.id != selected);
            dispatch({type: 'SET_PAYMENTS', payload: newData});
         }
         else{
            alert('Sorry, unable to remove!\nWe are already working on it :)');
        }
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
            <View style={{gap: 10, marginTop: '2%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[general.deadlineText, {color: '#D8D8D8'}]}>Expired date: </Text>
                            <Text style={[general.deadlineText, {color: '#D8D8D8', marginLeft: 0, fontWeight: 600}]}>{moment(item.dateRemainde).format('DD.MM.YYYY')}</Text>
                        </View>
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
                                            <Text style={[styles.categoryText, {direction: 'ltr'}]}>{item.cash}{currentSymb}</Text>
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