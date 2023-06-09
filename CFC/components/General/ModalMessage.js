import React from "react";
import { Modal, TouchableWithoutFeedback, View, Text } from "react-native";
import {styles, stylesLight} from "../../styles/MainPage";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import getImage from "../../resources/imageComponent";

function ModalMessage(props){
    return(
        <Modal
                animationType='fade'
                transparent={true}
                visible={props.object.modalVisible}>
                <TouchableWithoutFeedback onPress={() => props.object.setModalVisible(false)}>
                        <View style={styles.pModal}>
                            <View style={[styles.sModal, {height: '25%', backgroundColor: props.object.isCompleted ? '#FBCA76' : '#FB7676'}]}>
                                    <View style={{width: '85%', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={[general.generalText, {color: '#000000', textAlign: 'center', fontSize: 20, fontWeight: 500}]}>{props.object.text}</Text>
                                        {getImage(props.object.isCompleted ? process.env.API_SMILE_LIKE : process.env.API_SMILE_SAD, 65, 65, '#2F2F2F')}
                                    </View>
                            </View>
                        </View>
                </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalMessage;