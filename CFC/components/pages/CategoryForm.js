import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback,Text,FlatList, Dimensions, Keyboard } from "react-native";
import general from "../../styles/general";
import Header from "../General/Header";
import CategoryInput from "../CategoryFormComponents/CategoryInput";
import { CategoryFormContext } from "../../modules/context";
import { useSelector } from "react-redux";
import CategoryList from "../General/CategoryList";
import styles from "../../styles/TransactionPage";
import getImage from "../../resources/imageComponent";
import AddBtn from "../General/AddBtn";
const { width, height } = Dimensions.get('window');

function CategoryForm({navigation}){
    const [catName, setCatName] = useState('');
    const [disabled, setDisabled] = useState(true);
    const icons = useSelector(state => state.category.icons);
    const selectedCategory = useSelector(state => state.category.selectedCategory);
    const contextValue = {
        catName,
        setCatName
    }
    useEffect(()=>{
        if (catName && selectedCategory) {
            setDisabled(false);
          } else {
            setDisabled(true);
          }
    })
    const handleCreateCategory = () =>{
        
    }
    return(
        <CategoryFormContext.Provider value={contextValue}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={general.app}>
                    <Header text={'Create Category'}/>

                        <View style={general.content} >
                            <CategoryInput/>

                            <View style={{flex: 3, height: 40}}>
                                <CategoryList data={icons} navigation={navigation}/>
                                </View>

                            <View style={{flex: 1}}>
                                <TouchableWithoutFeedback disabled={disabled} onPress={handleCreateCategory}>
                                        <View style={[styles.addBtn, disabled ? {backgroundColor: '#FECC7A50'} : {backgroundColor: '#FECC7A'}, {width: width * 0.7, height: height * 0.05}]}>
                                            <Text style={styles.addText}>Add</Text>
                                        </View>
                                </TouchableWithoutFeedback>   
                            </View>
                        
                        </View>
                </View>
            </TouchableWithoutFeedback>
        </CategoryFormContext.Provider>
    );
}


export default CategoryForm;