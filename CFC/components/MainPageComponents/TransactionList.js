import React, { useContext } from "react";
import { View,  TouchableWithoutFeedback, Text, FlatList} from "react-native";
import {styles, stylesLight} from "../../styles/MainPage";
import { MainContext } from "../../modules/context";
import getImage from "../../resources/imageComponent";
import { useDispatch, useSelector } from "react-redux";

function TransactionList(){
    const {combinedData, navigation} = useContext(MainContext);
    const currentSymb = useSelector(state => state.currency.currentSymb);
    const dispatch = useDispatch();

    const handleSelectTransaction = (id) =>{
        let res = combinedData.filter(item => item.id == id)
        dispatch({type: 'SET_SELECTED_TRANSACTION', payload: res[0]})
        navigation.navigate('TransactionInfo');
    }
    return (
        <View style={{width: "95%", flex: 1}}>
        <FlatList keyExtractor={item => item.id} 
            data={combinedData} 
            renderItem={({item}) =>
                   <TouchableWithoutFeedback onPress={() => handleSelectTransaction(item.id)}>
                                <View style={[styles.category, {backgroundColor: item.fill + "20"}]}>
                                    <View style={[styles.circle, {backgroundColor: item.fill}]}>
                                        {getImage(item.image_link, 25, 25, item.image_color)}
                                    </View>
                                    <View style={{width:"70%", flexDirection: "row", justifyContent: "space-between"}}>
                                        <Text style={styles.categoryText}>{item.x}</Text>
                                        <View style={[styles.categoryText, {direction: 'ltr', flexDirection: "row", gap: 20}]}>
                                            <Text style={[styles.categoryText, {color: '#D8D8D8'}]}>{item.percent}%</Text>
                                            <Text style={[styles.categoryText]}>{currentSymb}{item.y}</Text>
                                        </View>
                                    </View>
                                </View>   
                
                            </TouchableWithoutFeedback>   
                }/>          
        </View>    
    );
}

export default TransactionList;