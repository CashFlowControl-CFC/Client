import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, TouchableWithoutFeedback, View, TextInput, Text, Keyboard } from "react-native";
import styles from "../../styles/MainPage";
import general from "../../styles/general";
import { MainContext } from "../../modules/context";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../modules/requests";
import {API_URL} from '@env';

function ModalCash(){
    const {modalVisible, setModalVisible} = useContext(MainContext);
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const activeAccount = useSelector(state => state.account.activeAccount);
    const accounts = useSelector(state => state.account.accounts);
    useEffect(() => {
        if (modalVisible) {
          inputRef.current?.focus();
        }
      }, [modalVisible]);

      const handleSaveCash = async () =>{
        let res = await updateData(`${API_URL}/account/${Number(activeAccount)}`, {
            cash: value ? Number(value.replace(',', '.')) : 0
        });
            if(res.status == 200){
                setModalVisible(false);
                let index = await accounts.findIndex(item => item.id == activeAccount);
                    if(index != -1){
                        dispatch({type:'UPDATE_ACCOUNT', payload: {newItem: {...accounts[index], cash: value ? Number(value.replace(',', '.')) : 0}, index: index}});
                    }
                 }
        }
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
                                onPress={handleSaveCash}>
                                    <Text style={{ color: '#D8D8D8', fontSize: 20 }}>Save</Text>
                                </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalCash;