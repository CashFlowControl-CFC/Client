import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableWithoutFeedback, Text, FlatList, Keyboard } from "react-native";
import general from "../../styles/general";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";
import moment from "moment";
import ModalRemove from "../General/ModalRemove";
import { removeData } from "../../modules/requests";
import { API_PLUS_URL, API_URL} from '@env';


export default function TransactionInfo({navigation}){
    const selectedTransaction = useSelector(state => state.transaction.selectedTransaction);
    const data = useSelector(state => state.transaction.data);
    const [filteredData, setFilteredData] = useState([]);
    const [moneySum, setMoneySum] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        filter();
    }, [data])

    const filter = () =>{
        let res = data.filter(item => item.x == selectedTransaction.x && item.isIncome == selectedTransaction.isIncome);
        setFilteredData(res.sort((a, b) => (a.date != b.date) ? new Date(b.date).getTime() - new Date(a.date).getTime() : b.id - a.id));
        const sum = res?.reduce((acc, cur)  => {
            acc.y = Number(acc.y) + Number(cur.y);
            return acc;
        }, {y: 0});
        setMoneySum(sum.y);
    }
    const handleRemove = async () =>{
        let res = await removeData(`${API_URL}/transaction/${selected}`);
        if(res.status == 200){
            let newData = data.filter(item => item.id != selected);
            let filtered = filteredData.filter(item => item.id != selected);
            dispatch({type: 'REMOVE_TRANSACTION', payload: newData});
        
            if(filtered.length <= 0){
                navigation.goBack();
            }
        }
        setModalVisible(false);
    }
    const showModal = (id) =>{
        setModalVisible(true);
        setSelected(id);
    }
    return(
        <View style={general.app}>
            <ModalRemove modalVisible={modalVisible} close={() => setModalVisible(false)} action={handleRemove}/>
            <View style={general.header}>
                    <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', width: '40%'}}>
                             {getImage(selectedTransaction.image_link, 25, 25, '#FFFFFF')}
                            <Text style={[general.generalText, { fontSize: 20  }]}>{selectedTransaction.x}</Text>
                            <Text style={[general.generalText, { fontSize: 20  }]}>${moneySum}</Text>
                    </View>
                </View>

            <View style={general.content} >
                <FlatList keyExtractor={item => item.id} style={{marginTop: 25}}
                    data={filteredData} 
                    renderItem={({item}) =>
                        <TouchableWithoutFeedback onLongPress={() => showModal(item.id)}>
                                    <View>
                                        <Text style={[general.generalText, {color: '#D8D8D8', marginBottom: 10, marginLeft: 15}]}>{moment(item.date).format('MMM DD, YYYY')}</Text>
                                        <View style={[styles.category, {backgroundColor: item.fill + "20"}]}>
                                                <View style={[styles.circle, {backgroundColor: item.fill}]}>
                                                    {getImage(item.image_link, 25, 25, item.image_color)}
                                                </View>
                                                <View style={{width:"70%", flexDirection: "row", justifyContent: "space-between"}}>
                                                    <View>
                                                        <Text style={styles.categoryText}>{item.x}</Text>
                                                        {item.comment ? <Text style={[general.generalText, {fontSize: 15, color: '#D8D8D8'}]}>
                                                            {item.comment}
                                                            </Text> : <></>}
                                                    </View>
                                                    <Text style={[styles.categoryText, {direction: 'ltr', alignSelf: 'center'}]}>${item.y}</Text>
                                                </View>
                                            </View> 
                                    </View>
                                    </TouchableWithoutFeedback>   
                        }/>    
            </View>
        </View>
    );
}