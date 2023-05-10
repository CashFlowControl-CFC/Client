import React from "react";
import { Modal, TouchableWithoutFeedback, View, Text } from "react-native";
import styles from "../../styles/MainPage";
import general from "../../styles/general";

function ModalRemove(props){
    return(
        <Modal
                animationType='fade'
                transparent={true}
                visible={props.modalVisible}>
                <TouchableWithoutFeedback onPress={() => props.close()}>
                        <View style={styles.pModal} >
                            <View style={styles.sModal}>
                                <TouchableWithoutFeedback onPress={() => props.action()}>
                                    <Text style={general.removeText}>Remove</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalRemove;