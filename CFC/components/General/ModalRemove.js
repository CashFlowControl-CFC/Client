import React from "react";
import { Modal, TouchableWithoutFeedback, View, Text } from "react-native";
import {styles, stylesLight} from "../../styles/MainPage";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
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
                                        {getImage(process.env.API_TRASH_URL, 25, 25, '#fa5050')}
                                    </View>
                                    </TouchableWithoutFeedback>
                            </View>
                        </View>
                </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalRemove;