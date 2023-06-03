import React, { useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import general from "../../styles/general";
import CommonHeader from "../General/CommonHeader";
import Avatar from "../ProfilePageComponents/Avatar";
import UserInfo from "../ProfilePageComponents/UserInfo";
import Currency from "../ProfilePageComponents/Currency";

export default function Profile({navigation}){
    const [showModal, setShowModal] = useState(false);
    return (
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={general.app}>
                <CommonHeader title={'Profile'} navigation={navigation} image_link={process.env.API_PROFILE_URL}/>
                <View style={general.content} >
                        <Avatar/>
                        <UserInfo/>
                        <Currency showModal={showModal} setShowModal={setShowModal}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}