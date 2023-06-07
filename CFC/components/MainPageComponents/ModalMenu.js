import React, { useContext } from "react";
import { Modal, TouchableWithoutFeedback, View, Text } from "react-native";
import styles from "../../styles/MainPage";
import { MainContext } from "../../modules/context";
import general from "../../styles/general";
import getImage from "../../resources/imageComponent";
import { FIREBASE_AUTH } from "../../modules/FirebaseConfig";
import { useDispatch } from "react-redux";
import { removeAccessToken } from "../../modules/storage";
function ModalMenu(){
    const dispatch = useDispatch();
    const {navigation, modalMenuVisible, setModalMenuVisible} = useContext(MainContext);
    const onClick = (name) =>{
        setModalMenuVisible(false);
        navigation.navigate(name);
    }
    const logOut = async () =>{
        console.log("log out")
        FIREBASE_AUTH.signOut()
        await removeAccessToken()
        await dispatch({type:"SET_USER",payload:null})

    }
    return(
        <Modal
                transparent={true}
                visible={modalMenuVisible}
                animationType='slide'
                >
                <TouchableWithoutFeedback onPress={() => setModalMenuVisible(false)}>
                        <View style={[styles.pModal, {backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'flex-start'}]} >
                            <View style={[styles.sModalMenu]}>
                                <View style={[styles.menuContent, {flex: 1}]}>
                                    <TouchableWithoutFeedback onPress={() => setModalMenuVisible(false)}>
                                        <View style={{flexDirection: 'row'}}>
                                            {getImage(process.env.API_MENU_URL, 30, 30, '#FFFFFF')}
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => onClick('Profile')}>
                                        <View style={{flexDirection: 'row'}}>
                                            {getImage(process.env.API_PROFILE_URL, 20, 20, '#FFFFFF')}
                                            <Text style={[general.generalText, {marginLeft: '5%'}]}>Profile</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => onClick('Target')}>
                                        <View style={{flexDirection: 'row'}}>
                                            {getImage(process.env.API_PURPOSE_URL, 20, 20, '#FFFFFF')}
                                            <Text style={[general.generalText, {marginLeft: '5%'}]}>Target</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback>
                                        <View style={{flexDirection: 'row'}}>
                                            {getImage(process.env.API_SAVING_URL, 20, 20, '#FFFFFF')}
                                            <Text style={[general.generalText, {marginLeft: '5%'}]}>Saving</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => onClick('ScheduledPayments')}>
                                        <View style={{flexDirection: 'row'}}>
                                            {getImage(process.env.API_SCHEDULED_URL, 20, 20, '#FFFFFF')}
                                            <Text style={[general.generalText, {marginLeft: '5%'}]}>Scheduled payments</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={[styles.menuContent, {flex: 2}]}>
                                    <View style={{position: 'absolute', bottom: 55}}>
                                        <TouchableWithoutFeedback onPress={logOut}>
                                            <View style={{flexDirection: 'row'}}>
                                                {getImage(process.env.API_EXIT_URL, 20, 20, '#FFFFFF')}
                                                <Text style={[general.generalText, {marginLeft: '10%'}]}>Go out</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalMenu;