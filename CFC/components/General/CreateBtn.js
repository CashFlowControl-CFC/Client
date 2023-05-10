import React from "react";
import { View,  TouchableWithoutFeedback} from "react-native";
import general from "../../styles/general";
import getImage from "../../resources/imageComponent";
import {API_PLUS_URL} from '@env'
import { useDispatch } from "react-redux";

function CreateBtn(props){
    const dispatch = useDispatch();

    const handleAddTransaction = () =>{
        
        console.log(props.selected_category)
        dispatch({type: 'SET_SELECTED', payload: props.selected_category});
        dispatch({type: 'SET_TRANS_CASH', payload: undefined});
        dispatch({type: 'SET_COMMENT', payload: undefined});
        dispatch({type: 'SET_DATE', payload: undefined});
        dispatch({type: 'SET_ISADD', payload: true});

        props.navigation.navigate('Transaction');
    }
    return (
        <TouchableWithoutFeedback onPress={handleAddTransaction}>
            <View>
                {getImage(API_PLUS_URL, 30, 30)}
                </View>
        </TouchableWithoutFeedback>    
    );
}

export default CreateBtn;