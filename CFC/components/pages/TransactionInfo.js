import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableWithoutFeedback, Text, FlatList, Keyboard } from "react-native";
import general from "../../styles/general";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";
import moment from "moment";
import ModalRemove from "../General/ModalRemove";
import { removeData } from "../../modules/requests";
import { updateData } from "../../modules/requests";
import CreateBtn from "../General/CreateBtn";
import CommonHeader from "../General/CommonHeader";


export default function TransactionInfo({navigation}){
    const selectedTransaction = useSelector(state => state.transaction.selectedTransaction);
    const totalMoney = useSelector(state => state.transaction.totalMoney);
    const data = useSelector(state => state.transaction.data);
    const selected = useSelector(state => state.transData.selectedTransaction);

    const [moneySum, setMoneySum] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

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
        let res = await removeData(`${process.env.API_URL}/transaction/${selected}`);
        if(res.status == 200){
            let money = data.filter(item => item.id == selected)
            let newData = data.filter(item => item.id != selected);
            let filtered = filteredData.filter(item => item.id != selected);

            dispatch({type:'ADD_INCOME', payload: money[0].y});
            dispatch({type: 'SET_DATA', payload: newData});
            
            updateData(`${process.env.API_URL}/account/1`, {cash: totalMoney + money[0].y});
        
            if(filtered.length <= 0){
                navigation.goBack();
            }
        }
        setModalVisible(false);
    }
    const showModal = (id) =>{
        setModalVisible(true);
        dispatch({type: 'SET_SELECTED_TRANS', payload: id});
    }
    const handleEdit = (id) =>{
        try{
            let filtered = filteredData.filter(item => item.id == id);

            dispatch({type: 'SET_SELECTED', payload: filtered[0].category_id});
            dispatch({type: 'SET_TRANS_CASH', payload: filtered[0].y.toString()});
            dispatch({type: 'SET_COMMENT', payload: filtered[0].comment ? filtered[0].comment.toString() : undefined});
            dispatch({type: 'SET_DATE', payload: filtered[0].date ? filtered[0].date : undefined});
            dispatch({type: 'SET_ISADD', payload: false});
            dispatch({type: 'SET_SELECTED_TRANS', payload: Number(filtered[0].id)});
    
            navigation.navigate('Transaction');
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <View style={general.app}>
            <ModalRemove modalVisible={modalVisible} close={() => setModalVisible(false)} action={handleRemove}/>

            <CommonHeader navigation={navigation} title={`${selectedTransaction.x} $${moneySum}`} image_link={selectedTransaction.image_link}/>

            <View style={general.content} >
                <FlatList keyExtractor={item => item.id} style={{marginTop: 25}}
                    data={filteredData} 
                    renderItem={({item}) =>
                        <TouchableWithoutFeedback onLongPress={() => showModal(item.id)} onPress={() => handleEdit(item.id)}>
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
            <View style={[ general.transAddBtn, general.addBtn]}>
                <CreateBtn navigation={navigation} selected_category={selectedTransaction.category_id}/>
            </View>
        </View>
    );
}