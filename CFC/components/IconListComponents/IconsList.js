import React  from "react";
import { View, Text, FlatList, TouchableWithoutFeedback} from "react-native";
import general from "../../styles/general";
import styles from "../../styles/TransactionPage";
import getImage from "../../resources/imageComponent";
import { useDispatch, useSelector } from "react-redux";
import {useRoute} from "@react-navigation/native";

function IconsList(props){
    const dispatch = useDispatch();
    const selectedCategory = useSelector(state => state.category.selectedCategory);
    const route = useRoute();

    const handleSelectCategory = (id, catId) => {
        dispatch({type: 'SET_SELECTED', payload: catId});
        dispatch({type: 'SET_SELECTED_ICON', payload: id});
        props.navigation.navigate('CategoryForm');   
    }
    return (
        <View style={[styles.categories, {flex: 1}]}>
        <View>
            <FlatList
                data={props.data}
                renderItem={({item}) => 
                <TouchableWithoutFeedback onPress={() => handleSelectCategory(item.id, item.category_id)}>
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

export default IconsList;