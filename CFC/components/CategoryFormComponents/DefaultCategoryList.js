import React from "react";
import { View, Text, FlatList, TouchableWithoutFeedback} from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import {styles, stylesLight} from "../../styles/TransactionPage";
import getImage from "../../resources/imageComponent";
import { useDispatch, useSelector } from "react-redux";
import {useRoute} from "@react-navigation/native";

function DefaultCategoryList(props){
    const dispatch = useDispatch();
    const selectedCategory = useSelector(state => state.category.selectedCategory);

    const handleSelectCategory = (id) => {
        if (selectedCategory == id){
            dispatch({type: 'SET_SELECTED', payload: null});
        }
        else if(id == 'all'){
            dispatch({type: 'SET_ICON_TYPE', payload: null});
            props.navigation.navigate('Icons');
        }
        else if(id != 'all'){
            dispatch({type: 'SET_ICON_TYPE', payload: id});
            props.navigation.navigate('Icons');
        }
    }
    return (
        <View style={[styles.categories, {flex: 1}]}>
        <Text style={[general.generalText, {direction: 'rtl'}]}>Quick access to icons</Text>
        <View>
            <FlatList
                data={props.data}
                renderItem={({item}) => 
                <TouchableWithoutFeedback onPress={() => handleSelectCategory(item.id)}>
                    <View style={{alignItems: 'center'}}>
                        <View style={[selectedCategory == item.id ? {backgroundColor: item.color + "40"} : null, styles.catItem]}>
                            <View style={[styles.catCircle, {backgroundColor: item.color}]}> 
                            {getImage(item.image_link, 35, 35, item.image_color)}
                            </View>
                        </View>
                        <Text style={[general.generalText, {fontSize: 15}]}>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.catList}
                />
        </View>
    </View>     
    );
}

export default DefaultCategoryList;