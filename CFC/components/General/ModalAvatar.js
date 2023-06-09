import React from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import general from "../../styles/general";
import { updateData } from "../../modules/requests";

function ModalAvatar(props) {

    const avatars = useSelector(state => state.avatar.avatars)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const handleSelectedAvatar = async (id) => {
        console.log("in avatar module")
        updateData(`${process.env.API_URL}/user/${user.uid}`,{avatar_id:id})
        user.avatar_id = id;
        dispatch({ type: 'SET_USER', payload: user });
        props.action()
    }
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.modalVisible}>
            <TouchableWithoutFeedback onPress={() => props.close()}>
                <View style={styles.pModal} >
                    <View style={styles.sModal}>
                        <TouchableWithoutFeedback onPress={() => props.action()}>
                            <View style={{ flexDirection: 'row' }}>
                                <FlatList
                                    data={avatars}
                                    renderItem={({ item }) =>
                                        <TouchableWithoutFeedback onPress={() => handleSelectedAvatar(item.id)}>
                                            <View style={{ alignItems: 'center' }}>
                                                    <View style={[styles.catCircle, {backgroundColor: item.color}]}> 
                                                        {getImage(item.image_link, 60, 60, item.image_color)}
                                                    </View>
                                            </View>
                                        </TouchableWithoutFeedback>}
                                keyExtractor={(item) => item.id}
                                numColumns={3}
                                contentContainerStyle={styles.catList}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalAvatar;