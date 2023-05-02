import React, { useContext, useEffect, useState } from "react";
import { View,  TouchableWithoutFeedback, Text, FlatList} from "react-native";
import styles from "../../styles/MainPage";
import { MainContext } from "../../modules/context";
import getImage from "../../resources/imageComponent";

function TransactionList(){
    const {combinedData} = useContext(MainContext);
    return (
        <View style={{width: "95%", flex: 1}}>
        <FlatList keyExtractor={item => item.id} 
            data={combinedData} 
            renderItem={({item}) =>
                <View key={item.id}>
                   <TouchableWithoutFeedback>
                                <View style={[styles.category, {backgroundColor: item.fill + "20"}]}>
                                    <View style={[styles.circle, {backgroundColor: item.fill}]}>
                                        {getImage(item.image_link, 25, 25, item.image_color)}
                                    </View>
                                    <View style={{width:"70%", flexDirection: "row", justifyContent: "space-between"}}>
                                        <Text style={styles.categoryText}>{item.x}</Text>
                                        <Text style={[styles.categoryText, {direction: 'ltr'}]}>${item.y}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>      
                </View>
                }/>          
        </View>    
    );
}

export default TransactionList;