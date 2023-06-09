import React, { useEffect, useRef, useState } from "react";
import { Modal, TouchableWithoutFeedback, View, TextInput, Text, Keyboard } from "react-native";
import {styles, stylesLight} from "../../styles/MainPage";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import { useDispatch, useSelector } from "react-redux";

function ModalCash(props){
    const totalMoney = useSelector(state => state.transaction.totalMoney);
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.object.modalVisible && props.object.isTotalCash) {
          inputRef.current?.focus();
          setValue(totalMoney && totalMoney > 0 ? `${totalMoney}` : '');
        }
        else{
            setValue('');
        }
      }, [props.object.modalVisible]);
    
    return(
        <Modal
                animationType='fade'
                transparent={true}
                visible={props.object.modalVisible}>
                <TouchableWithoutFeedback onPress={() => Keyboard.isVisible() ? Keyboard.dismiss() : props.object.setModalVisible(false)}>
                        <View style={styles.pModal} >
                            <View style={styles.sModal}>
                                <TextInput 
                                placeholder='0'
                                placeholderTextColor={'#D8D8D880'}
                                keyboardType="numeric" 
                                ref={inputRef}
                                style={general.inputMoney}
                                value={value} 
                                onChangeText={(text) => {
                                    if (/^[0-9]*[.,]?[0-9]*$/.test(text)) {
                                    setValue(text);
                                    }
                                }}
                                />
                                <TouchableWithoutFeedback
                                style={{ padding: 10, alignSelf: 'flex-end' }}
                                onPress={() => props.object.action(value)}>
                                    <Text style={{ color: '#D8D8D8', fontSize: 20 }}>Save</Text>
                                </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalCash;