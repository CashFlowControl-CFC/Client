import React, { useEffect, useState } from "react";
import { View } from "react-native";
import general from "../../styles/general";
import CategoryList from "../General/CategoryList";
import { useDispatch, useSelector } from "react-redux";
import Header from "../General/Header";
import ModalRemove from "../General/ModalRemove";
import { removeData } from "../../modules/requests";

function Categories({navigation}){
    const categories = useSelector(state => state.category.categories);
    const selectedCategory = useSelector(state => state.category.selectedCategory);
    const isIncome = useSelector(state => state.transaction.isIncome);
    dispatch = useDispatch();
    
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        filterCategories();
    }, [isIncome, categories])


    const filterCategories = () =>{
        setData([...categories?.filter(item => (item.isIncome == isIncome || item.isIncome == null) && item.image_link != 'tmp')
            .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()), 
        { id: 'create', name:'Create', color: '#FECC7A',  image_link: process.env.API_PLUS_URL}]);
    }

    const handleRemove = async () =>{
        let res = await removeData(`${process.env.API_URL}/category/${selectedCategory}`);
        if(res.status == 200){
            let newData = categories.filter(item => item.id != selectedCategory);
            dispatch({type: 'SET_CATEGORIES', payload: newData});
            dispatch({type: 'SET_SELECTED', payload: null});
        } else{
            alert('Sorry, unable to remove!\nWe are already working on it :)');
        }
        setModalVisible(false);
    }

    return(
            <View style={general.app}>
                <ModalRemove modalVisible={modalVisible} close={() => setModalVisible(false)} action={handleRemove}/>

                <Header text={'All Categories'} navigation={navigation}/>

                <View style={general.content} >
                        <CategoryList data={data} navigation={navigation} modalVisible={() => setModalVisible(true)}/>
                </View>
            </View>
    );
}


export default Categories;