import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback,Text,FlatList, Dimensions, Keyboard } from "react-native";
import general from "../../styles/general";
import Header from "../General/Header";
import CategoryInput from "../CategoryFormComponents/CategoryInput";
import { CategoryFormContext } from "../../modules/context";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/TransactionPage";
const { width, height } = Dimensions.get('window');
import DefaultCategoryList from "../CategoryFormComponents/DefaultCategoryList";
import { addData, getData } from "../../modules/requests";

function CategoryForm({navigation}){
    const [catName, setCatName] = useState('');
    const [disabled, setDisabled] = useState(true);
    const icons = useSelector(state => state.icon.icons);
    const selectedCategory = useSelector(state => state.category.selectedCategory);
    const defaultCategories = useSelector(state => state.category.defaultCategories);
    const selectedIcon = useSelector(state => state.icon.selectedIcon);
    const isIncome = useSelector(state => state.transaction.isIncome);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

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
    }, [catName, selectedCategory]);
    useEffect(()=>{
        filterCategories();
    }, []);
    const filterCategories = async () => {
        setData([...defaultCategories.filter(item => item.image_link != 'tmp'), {id: 'all', name:'All', color: '#FECC7A', image_color: '#483A23', image_link: process.env.API_DOTS_URL}]);
    }
    const handleCreateCategory = async () =>{
        let index = icons.findIndex(item  => item.id == selectedIcon);
        console.log(isIncome)
        if(index != -1){
            let result = await addData(`${process.env.API_URL}/category`, {
                user_id: 3,
                name: catName,
                image_link: icons[index].image_link,
                color: icons[index].color,
                image_color: icons[index].image_color,
                isIncome: isIncome
            });
            dispatch({type: 'ADD_CATEGORY', payload: result});
            dispatch({type: 'SET_SELECTED', payload: null});
            navigation.navigate('Categories');
        }
    }
    return(
        <CategoryFormContext.Provider value={contextValue}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={general.app}>
                    <Header text={'Create Category'} navigation={navigation}/>

                        <View style={general.content} >
                            <CategoryInput/>

                            <View style={{flex: 3, height: 40}}>
                                <DefaultCategoryList data={data} navigation={navigation}/>
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