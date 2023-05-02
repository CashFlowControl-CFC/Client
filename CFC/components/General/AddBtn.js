import React, { useContext, useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Text} from "react-native";
import { TransactionContext } from "../../modules/context";
import styles from "../../styles/TransactionPage";

function AddBtn(props){
    const {value, selectedDate, selectedCategory} = useContext(TransactionContext);
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        if (value > 0 && selectedDate && selectedCategory) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      }, [value, selectedDate, selectedCategory]);
    return (
        <TouchableWithoutFeedback disabled={disabled} onPress={() => props.action()}>
                    <View style={[styles.addBtn, disabled ? {backgroundColor: '#FECC7A50'} : {backgroundColor: '#FECC7A'}]}>
                        <Text style={styles.addText}>Add</Text>
                    </View>
                </TouchableWithoutFeedback>  
    );
}

export default AddBtn;