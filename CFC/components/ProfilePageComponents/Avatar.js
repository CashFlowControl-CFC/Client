import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import getImage from "../../resources/imageComponent";
import { useSelector } from "react-redux";

async function convertImageToBlob(imageUri) {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    return blob;
}
const openImagePicker = async (user) => {
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
        console.log("request denied")
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    try {
        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            const imageData = await convertImageToBlob(imageUri);
            const image = {
                avatar: imageData
            }
            console.log(image)
            const response = await fetch(`${process.env.API_URL}/user/${user.uid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(image)
            });
            console.log('Зображення успішно відправлено на сервер!');
            console.log('Отримана відповідь від сервера:', response.data);
        }
    } catch (error) {

    }
};
export default function Avatar(props) {
    const user = useSelector(state => state.user.user)
    return (
        <View style={{marginTop: '5%'}}>
                <TouchableWithoutFeedback onPress={() => openImagePicker(user)}>
                    <View style={general.avatar}>
                        {getImage(process.env.API_PLUS_URL, 90, 90, '#000000')}
                    </View>
                </TouchableWithoutFeedback>
        </View>
    );
}