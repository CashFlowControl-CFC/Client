import React, { useContext, useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Text, Dimensions} from "react-native";
import styles from "../../styles/TransactionPage";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get('window');

function AddBtn(props){
    const selectedCategory = useSelector(state => state.category.selectedCategory);
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
      console.log(props.object.value)
        if (props.object.value.replace(',', '.') > 0 && props.object.selectedDate && selectedCategory) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      }, [props.object.value, props.object.selectedDate, selectedCategory]);
    return (
        <TouchableWithoutFeedback disabled={disabled} onPress={() => props.action()}>
                    <View style={[styles.addBtn, disabled ? {backgroundColor: '#FECC7A50'} : {backgroundColor: '#FECC7A'}, {width: width * 0.7, height: height * 0.05}]}>
                        <Text style={styles.addText}>Add</Text>
                    </View>
                </TouchableWithoutFeedback>  
    );
}

export default AddBtn;