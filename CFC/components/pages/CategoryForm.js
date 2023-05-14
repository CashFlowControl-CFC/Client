import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback,Text,FlatList, Dimensions, Keyboard } from "react-native";
import general from "../../styles/general";
import Header from "../General/Header";
import CategoryInput from "../CategoryFormComponents/CategoryInput";
import { CategoryFormContext } from "../../modules/context";
import { useSelector } from "react-redux";
import CategoryList from "../General/CategoryList";
import styles from "../../styles/TransactionPage";
const { width, height } = Dimensions.get('window');
import { addData, getData } from "../../modules/requests";
import { API_URL, API_DOTS_URL } from "@env";
import DefaultCategoryList from "../CategoryFormComponents/DefaultCategoryList";

function CategoryForm({navigation}){
    const [catName, setCatName] = useState('');
    const [disabled, setDisabled] = useState(true);
    const icons = useSelector(state => state.category.icons);
    const selectedCategory = useSelector(state => state.category.selectedCategory);
    const categories = useSelector(state => state.category.categories);
    const isIncome = useSelector(state => state.transaction.isIncome);
    const [data, setData] = useState([]);

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
    });
    const filterCategories = async () => {
        //const res = await getData(`${API_URL}/defaultcategory`);
        //setData([...res, {id: 'all', name:'All', color: '#FECC7A',  image_link: API_DOTS_URL}]);
    }
    const handleCreateCategory = async () =>{
        let index = icons.findIndex(item  => item.id == selectedCategory);
        if(index != -1){
            // let result = await addData(`${API_URL}/category`, {
            //     user_id: 1,
            //     name: catName,
            //     image_link: icons[index].image_link,
            //     color: icons[index].color,
            //     isIncome: isIncome
            // });
        }
    }
    return(
        <CategoryFormContext.Provider value={contextValue}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={general.app}>
                    <Header text={'Create Category'}/>

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