import React , { useState }from "react";
import { TouchableWithoutFeedback, View , Dimensions} from "react-native";
import general from "../../styles/general";
import getImage from "../../resources/imageComponent";
import { useSelector } from "react-redux";
import ModalAvatar from "../General/ModalAvatar";



export default function Avatar(props) {
    const { width, height } = Dimensions.get('screen');
    const user = useSelector(state => state.user.user)
    const avatars = useSelector(state => state.avatar.avatars)
    console.log("avatars in Avatar.js\n",avatars,"\n\nuser in avatar.js\n",user.avatar_id)
    const [modalVisible, setModalVisible] = useState(false);

    const openImagePicker = async (user) => {
        setModalVisible(true)
    };
    const handleAvatar = async()=>{
        console.log("action")
        setModalVisible(false)
    }
    return (
        <View style={{marginTop: '5%'}}>

<ModalAvatar modalVisible={modalVisible} close={() => setModalVisible(false)} action={handleAvatar}/>
                <TouchableWithoutFeedback onPress={() => openImagePicker(user)}>
                <View style={general.avatar}>
                        {user.avatar_id==0
                        ?getImage(process.env.API_PLUS_URL, 90, 90, '#000000')
                        :getImage(avatars.findLast(x=>x.id==user.avatar_id)?.image_link, width*0.5, width*0.5)}
                    </View>
                </TouchableWithoutFeedback>
        </View>
    );
}