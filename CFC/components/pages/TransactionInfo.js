import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableWithoutFeedback, Text, FlatList } from "react-native";
import general from "../../styles/general";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";
import moment from "moment";


export default function TransactionInfo(){
    const selectedTransaction = useSelector(state => state.transaction.selectedTransaction);
    const data = useSelector(state => state.transaction.data);
    const [filteredData, setFilteredData] = useState();
    const [moneySum, setMoneySum] = useState(0);

    useEffect(() => {
        filter();
    }, [])

    const filter = () =>{
        let res = data.filter(item => item.x == selectedTransaction.x && item.isIncome == selectedTransaction.isIncome);
        setFilteredData(res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        const sum = res?.reduce((acc, cur)  => {
            acc.y = Number(acc.y) + Number(cur.y);
            return acc;
        }, {y: 0});
        setMoneySum(sum.y);
    }

    return(
        <View style={general.app}>

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
                        <TouchableWithoutFeedback>
                                    <View>
                                        <Text style={[general.generalText, {color: '#D8D8D8', marginBottom: 10, marginLeft: 15}]}>{moment(item.date).format('MMM DD, YYYY')}</Text>
                                        <View style={[styles.category, {backgroundColor: item.fill + "20"}]}>
                                                <View style={[styles.circle, {backgroundColor: item.fill}]}>
                                                    {getImage(item.image_link, 25, 25, item.image_color)}
                                                </View>
                                                <View style={{width:"70%", flexDirection: "row", justifyContent: "space-between"}}>
                                                    <Text style={styles.categoryText}>{item.x}</Text>
                                                    <Text style={[styles.categoryText, {direction: 'ltr'}]}>${item.y}</Text>
                                                </View>
                                            </View>   
                                    </View>
                                    </TouchableWithoutFeedback>   
                        }/>    
            </View>
        </View>
    );
}