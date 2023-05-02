import React, { useContext } from "react";
import { View, Text, FlatList, TouchableWithoutFeedback} from "react-native";
import { TransactionContext } from "../../modules/context";
import general from "../../styles/general";
import styles from "../../styles/TransactionPage";
import getImage from "../../resources/imageComponent";

function CategoryList(props){
    const {selectedCategory, setSelectedCategory} = useContext(TransactionContext);

    const SelectCategory = (id) => {
        if (selectedCategory == id){
            setSelectedCategory(null);
        }
        else if(id != 'add'){
            setSelectedCategory(id);
        }
    }
    return (
        <View style={styles.categories}>
        <Text style={[general.generalText, {direction: 'rtl'}]}>Categories</Text>
        <View>
            <FlatList
                data={props.data}
                renderItem={({item}) => 
                <TouchableWithoutFeedback onPress={() => SelectCategory(item.id)}>
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

export default CategoryList;