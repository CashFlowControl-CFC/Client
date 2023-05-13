import React from "react";
import { Modal, TouchableWithoutFeedback, View, Text } from "react-native";
import styles from "../../styles/MainPage";
import general from "../../styles/general";
import getImage from "../../resources/imageComponent";

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
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={general.removeText}>Remove</Text>
                                        {getImage('https://raw.githubusercontent.com/Witcher-MTM/Witcher-MTM.github.io/main/trash.svg', 25, 25, '#fa5252')}
                                    </View>
                                    </TouchableWithoutFeedback>
                            </View>
                        </View>
                </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalRemove;