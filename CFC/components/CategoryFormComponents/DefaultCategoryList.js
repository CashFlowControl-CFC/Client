import React from "react";
import { View, Text, FlatList, TouchableWithoutFeedback} from "react-native";
import general from "../../styles/general";
import styles from "../../styles/TransactionPage";
import getImage from "../../resources/imageComponent";
import { useDispatch, useSelector } from "react-redux";
import {useRoute} from "@react-navigation/native";

function DefaultCategoryList(props){
    const dispatch = useDispatch();
    const selectedCategory = useSelector(state => state.category.selectedCategory);
    const route = useRoute();

    const handleSelectCategory = (id) => {
        if (selectedCategory == id){
            dispatch({type: 'SET_SELECTED', payload: null});
        }
        else if(id == 'add'){
            props.navigation.navigate('Categories');
        }
        else if(id == 'create'){
            props.navigation.navigate('CategoryForm');
        }
        else if(id != 'add'){
            dispatch({type: 'SET_SELECTED', payload: id});
            if(route.name == 'Categories'){
                props.navigation.navigate('Transaction');
            }
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