import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, TouchableWithoutFeedback, View, TextInput, Text, Keyboard } from "react-native";
import styles from "../../styles/MainPage";
import general from "../../styles/general";
import { MainContext } from "../../modules/context";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../modules/requests";

function ModalCash(){
    const {modalVisible, setModalVisible} = useContext(MainContext);
    const totalMoney = useSelector(state => state.transaction.totalMoney);
    const [value, setValue] = useState('0');
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (modalVisible) {
          inputRef.current?.focus();
          setValue(totalMoney && totalMoney > 0 ? `${totalMoney}` : '');
        }
      }, [modalVisible]);
    const handleSetMoney = async () =>{
            let res = await updateData(`${process.env.API_URL}/account/1`, {cash: parseFloat(value)})
            if(res.status == 200){
                dispatch({type:'SET_TOTALMONEY', payload: value ? Number(value.replace(',', '.')) : Number(totalMoney)});
                setModalVisible(false);
            }
        }
    return(
        <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}>
                <TouchableWithoutFeedback onPress={() => Keyboard.isVisible() ? Keyboard.dismiss() : setModalVisible(false)}>
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
                                onPress={handleSetMoney}>
                                    <Text style={{ color: '#D8D8D8', fontSize: 20 }}>Save</Text>
                                </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalCash;