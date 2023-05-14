import React, { useEffect, useState } from "react";
import { View } from "react-native";
import general from "../../styles/general";
import CategoryList from "../General/CategoryList";
import { useSelector } from "react-redux";
import { API_PLUS_URL } from "@env";
import Header from "../General/Header";

function Categories({navigation}){
    const categories = useSelector(state => state.category.categories);
    const isIncome = useSelector(state => state.transaction.isIncome);
    const [data, setData] = useState([]);

    useEffect(() => {
        filterCategories();
    }, [isIncome])


    const filterCategories = () =>{
        setData([...categories?.filter(item => item.isIncome == isIncome || item.isIncome == null)
            .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()), 
        { id: 'create', name:'Create', color: '#FECC7A',  image_link: API_PLUS_URL}]);
    }

    return(
            <View style={general.app}>
                <Header text={'All Categories'}/>

                <View style={general.content} >
                        <CategoryList data={data} navigation={navigation}/>
                </View>
            </View>
    );
}


export default Categories;