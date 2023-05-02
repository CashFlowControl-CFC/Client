import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, TouchableWithoutFeedback, View, TextInput, Text, Keyboard } from "react-native";
import styles from "../../styles/MainPage";
import general from "../../styles/general";
import { MainContext } from "../../modules/context";
import { useDispatch } from "react-redux";

function ModalCash(){
    const {modalVisible, setModalVisible} = useContext(MainContext);
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (modalVisible) {
          inputRef.current?.focus();
        }
      }, [modalVisible]);
    return(
        <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={styles.pModal} >
                            <View style={styles.sModal}>
                                <TextInput 
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
                                onPress={() => {
                                    setModalVisible(false);
                                    dispatch({type:'SET_TOTALMONEY', payload: value ? Number(value.replace(',', '.')) : 0});
                                    }}>
                                    <Text style={{ color: '#D8D8D8', fontSize: 20 }}>Save</Text>
                                </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalCash;