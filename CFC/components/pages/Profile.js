import React, { useEffect, useState } from "react";
import { Text, TouchableWithoutFeedback, View ,PermissionsAndroid, Platform} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import general from "../../styles/general";
import CommonHeader from "../General/CommonHeader";
import Avatar from "../ProfilePageComponents/Avatar";
import UserInfo from "../ProfilePageComponents/UserInfo";
import Currency from "../ProfilePageComponents/Currency";
import ExitBtn from "../ProfilePageComponents/ExitBtn";
import { useSelector } from "react-redux";
const cameraPermission = async (platformType) => {
  if (platformType === 'ios') {
    // Дозвіл на використання камери на iOS
    try {
      const { status } = await Permissions.request('camera');
      if (status === 'granted') {
        console.log('Дозвіл на використання камери на iOS');
      } else {
        console.log('Дозвіл на використання камери на iOS відхилено');
      }
    } catch (error) {
      console.log('Помилка при запиті дозволу на використання камери на iOS:', error);
    }
  } else if (platformType === 'android') {
    // Дозвіл на використання камери на Android
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Дозвіл на використання камери',
          message: 'Дозвольте додатку використовувати камеру',
          buttonNeutral: 'Пізніше',
          buttonNegative: 'Відмінити',
          buttonPositive: 'Дозволити',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Дозвіл на використання камери на Android');
      } else {
        console.log('Дозвіл на використання камери на Android відхилено');
      }
    } catch (error) {
      console.log('Помилка при запиті дозволу на використання камери на Android:', error);
    }
  } else {
    console.log('Невідома платформа');
  }
};
export default function Profile({navigation}){
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
      // Дозвіл на доступ до камери та бібліотеки зображень
      cameraPermission(Platform.OS)
    }, []);
    return (
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={general.app}>
                <CommonHeader title={'Profile'} navigation={navigation} image_link={process.env.API_PROFILE_URL}/>
                <View style={general.content} >
                        <Avatar/>
                        <UserInfo/>
                        <Currency showModal={showModal} setShowModal={setShowModal}/>
                        <ExitBtn/>  
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}